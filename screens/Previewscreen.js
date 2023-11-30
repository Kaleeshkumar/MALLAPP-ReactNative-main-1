import React from 'react';
import { View, Text, StyleSheet ,Dimensions} from 'react-native';
import  { useState } from 'react';
import { Button, Modal, TouchableOpacity } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center } from 'native-base';
import SaveComponent from '../components/SaveComponent';
import * as Sharing from 'expo-sharing';


const { width, height } = Dimensions.get('window');
export default function PreviewScreen({ route }) {
    // Check if route.params is defined
   if (!route.params) {
  return (
    <SafeAreaView>
    <View style={styles.lottie}>
      <LottieView source={require('../assets/animations/animation_no data.json')} autoPlay loop />
    </View>
    <Text style={styles.lottie}>No data available</Text>
    
    </SafeAreaView>
    
  );
}

  const { name, nameOnParcel, mobileNumber, category, count, amount, nameOfrm, Date_of_Donation } = route.params;
  const [isActionsheetVisible, setActionsheetVisible] = useState(false);

  const openActionsheet = () => setActionsheetVisible(true);
  const closeActionsheet = () => setActionsheetVisible(false);
 
  //share data through whatsapp

  const shareData = () => {
    const message = `Name: ${name}\nName On Parcel: ${nameOnParcel}\nMobile Number: ${mobileNumber}\nCategory: ${category}\nCount: ${count}\nAmount: ${amount}\nName Of Rm: ${nameOfrm}\nDate of Donation: ${Date_of_Donation}`;
  
    Share.open({
      title: 'Share via',
      message: message,
      url: '', // You can include a URL if needed
      subject: 'Preview Data',
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.invoiceContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Donor Deatails Preview</Text>
          <Text style={styles.detailLabel}>Amounted donated:</Text>
          <Text style={styles.detailValue}>{amount}</Text>
        </View>
        <View style={styles.invoiceDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          
          <Text style={styles.detailValue}>{name}</Text>
          
          </View>
          <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name On Parcel:</Text>
          <Text style={styles.detailValue}>{nameOnParcel}</Text>
          </View>
          <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Mobile Number:</Text>
          <Text style={styles.detailValue}>{mobileNumber}</Text>
          </View>
          <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{category}</Text>
          </View>
          <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Count:</Text>
          <Text style={styles.detailValue}>{count}</Text>
          </View>
          <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.detailValue}>{amount}</Text>
          </View>
          <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name Of Rm:</Text>
          <Text style={styles.detailValue}>{nameOfrm}</Text>
          </View>
          <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date of Donation:</Text>
          <Text style={styles.detailValue}>{Date_of_Donation}</Text>
          </View>
          <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name On Parcel:</Text>
          <Text style={styles.detailValue}>{nameOnParcel}</Text>
          </View>
          
          
        </View>
       
        <Button onPress={shareData}>Share Data</Button>

        <Button onPress={openActionsheet}>Open Actionsheet</Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isActionsheetVisible}
        onRequestClose={closeActionsheet}
      >
        <View style={styles.actionsheetContainer}>
          <View style={styles.actionsheet}>
            <TouchableOpacity onPress={closeActionsheet}>
              <Text style={styles.actionsheetItem}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionsheetItem}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionsheetItem}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionsheetItem}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionsheetItem}>Favourite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
      </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background color for the entire screen
    padding: 20,
    justifyContent: 'center',
  },
  lottie: {
    width: width*0.9,
    height: width,
    alignItems:'center',
    marginLeft:20,
    textAlign:'center',
    fontStyle:'italic',
    fontWeight:'bold',
    fontSize:20
    
  },
  invoiceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  invoiceDetails: {
    
    borderRadius: 10,
    elevation: 3,
    padding: 15,
    backgroundColor: '#f0f0f0',
    
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    
    flexDirection:'row',
   
   
  },
  detailValue: {
    fontSize: 16,
   
    textAlign: 'right',
  
    // Aligns the text to the right
  },
  actionsheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  actionsheet: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  actionsheetItem: {
    fontSize: 18,
    padding: 10,
  },
  detailRow: {
    flexDirection: 'row',
    padding:10,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
