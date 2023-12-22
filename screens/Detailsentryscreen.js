import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons'; 
import { useState } from 'react';
import { useUser } from "../components/UserContext";

const Detailsentryscreen = () => {
    const navigation = useNavigation();
    const handleOnlinePress = () => {
        console.log('Online Button Pressed');
        navigation.navigate('Online', { entryType: 'online' });
      };
  const handleCashPress = () => {
    console.log('Cash Button Pressed');
    navigation.navigate('Cashcollection', { entryType: 'online' });
    // Handle cash button press
    // Navigate to cash details screen or perform other actions
  };
  const { userData, setUserData } = useUser();
  // Get current date and time
  const currentDate = new Date().toDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Details Entry Screen</Text>
        <Text style={styles.screenName}>{userData.name}</Text>
        <Text style={styles.dateTimeText}>{currentDate}</Text>
        <Text style={styles.dateTimeText}>{currentTime}</Text>
      </View>

      {/* Instruction Section */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>Choose the entry method:</Text>
      </View>

      {/* Button Section */}
   
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.onlineButton} onPress={handleOnlinePress}>
      <Ionicons name="wifi" size={22} color="black" />
  <Text style={styles.buttonText}>Online Details Entry</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.cashButton} onPress={handleCashPress}>
        <Ionicons name="cash" size={24} color="black" />
          <Text style={styles.buttonText}>Cash collection Entry</Text>
        </TouchableOpacity>
      </View>
     
      {/* Additional Instructions */}
      <View style={styles.additionalInstructions}>
      <Text style={styles.instructionText}>
          1. On the details screen, click the "Online" button to retrieve donor details. If not, click the "Cash" button.
        </Text>
        <Text style={styles.instructionText}>
          2. If you clicked the "Online" button, after getting donor details, proceed to payment.
        </Text>
        <Text style={styles.instructionText}>
          3. After payment, navigate to the preview screen, review the information, and save the details. Share the details through WhatsApp.
        </Text>
        <Text style={styles.instructionText}>
          4. If you chose the "Cash" button, enter donor details, then upload an image. Proceed to preview, save the details, and share via WhatsApp.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'lightyellow', // Updated color
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  screenName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  dateTimeText: {
    fontSize: 16,
    color: 'gray',
  },
  instructionContainer: {
    marginBottom: 15,
    
    
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft:10,
    padding:15,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  onlineButton: {
    backgroundColor: '#4CAF50', // Green color
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    flexDirection: 'row', // Align icon and text horizontally
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Cen
  },
  cashButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row', // Align icon and text horizontally
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  additionalInstructions: {
    marginTop: 20,
    backgroundColor: 'lightgrey',
  },
  onlineButton: {
    backgroundColor: '#4CAF50', // Green color
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    flexDirection: 'row', // Align icon and text horizontally
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10, // Add margin between icon and text
  },
});

export default Detailsentryscreen;
