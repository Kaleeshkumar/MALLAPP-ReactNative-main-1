import React from 'react';
import  { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import * as Sharing from 'expo-sharing';

const { width, height } = Dimensions.get('window');

const Receipt = ({ data }) => {
  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Data not provided.</Text>
      </View>
    );
  }
  const [recipientNumber, setRecipientNumber] = useState('');

  const handleShareReceipt = async () => {
    // Create a text message with the receipt details
    const message = `Donation Receipt\n\nDonor Name: ${data.name}\nName on Parcel: ${data.nameOnParcel}\nMobile Number: ${data.mobileNumber}\nCategory: ${data.selectedCategory}\nDate of Service: ${data.selectedDate.toLocaleDateString()}\nCount: ${data.count}\nAmount: ${data.amount}`;

    try {
      // Share the receipt image via WhatsApp
      const shareResult = await Sharing.shareAsync(data.imageUri, {
        mimeType: 'image/png',
        dialogTitle: 'Share Receipt',
        UTI: 'com.whatsapp.image',
        intentType: 'Send',
        subject: 'Donation Receipt',
        recipients: [recipientNumber], // Pass the recipient's number here
        text: message,
      });

      if (shareResult.action === Sharing.sharedAction) {
        console.log('Receipt shared successfully!');
      } else {
        console.log('Receipt sharing canceled.');
      }
    } catch (error) {
      console.error('Error sharing receipt:', error.message);
    }
  };
  return (
    
    <View style={styles.receiptContainer}>
      <Image
        source={require('../assets/images/thaagam.png')} // Add the path to your company logo
        style={styles.logo}
      />
      <Text style={styles.companyName}>Thaagam Foundation</Text>
      <Text style={styles.receiptHeading}>Donation Receipt</Text>
      <Text style={styles.receiptText}>Donor Name: {data.name}</Text>
      <Text style={styles.receiptText}>Name on Parcel: {data.nameOnParcel}</Text>
      <Text style={styles.receiptText}>Mobile Number: {data.mobileNumber}</Text>
      <Text style={styles.receiptText}>Category: {data.selectedCategory}</Text>
      <Text style={styles.receiptText}>Date of Service: {data.selectedDate.toLocaleDateString()}</Text>
      <Text style={styles.receiptText}>Count: {data.count}</Text>
      <Text style={styles.receiptText}>Amount: {data.amount}</Text>
      <Text style={styles.founderSignature}>Founder's Signature</Text>
      
    </View>

    
  );
};

const styles = StyleSheet.create({
  receiptContainer: {
    padding: 28,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  logo: {
    resizeMode:'stretch',
    width: width * 0.7,
    height: height * 0.1,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#3498db',
  },
  receiptHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    alignItems:'center',
    justifyContent:'center'
  },
  receiptText: {
    fontSize: 15,
    marginBottom: 15,
    color: '#34495e',
  },
  founderSignature: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 20,
    color: '#3498db',
  },
});
export default Receipt;
