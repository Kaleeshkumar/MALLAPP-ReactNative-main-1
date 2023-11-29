import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Receipt = ({ data }) => {
  return (
    <View style={styles.receiptContainer}>
      <Image
        source={require('../assets/images/asphalt-9.jpeg')} // Add the path to your company logo
        style={styles.logo}
      />
      <Text style={styles.companyName}>Your Company Name</Text>
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
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  receiptHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  receiptText: {
    fontSize: 14,
    marginBottom: 10,
  },
  founderSignature: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});

export default Receipt;
