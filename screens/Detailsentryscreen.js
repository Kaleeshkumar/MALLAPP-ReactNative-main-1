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
        navigation.navigate('DetailsEntry', { entryType: 'online' });
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
        <Text style={styles.instructionText}>Additional Instructions:</Text>
        <Text style={styles.instructionText}>
          1. Make sure to provide accurate details.
        </Text>
        <Text style={styles.instructionText}>
          2. Contact support if you face any issues.
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
    backgroundColor: 'lightgrey', // Header background color
    paddingVertical: 10, // Add padding to the header
    borderRadius: 10, // Add border radius for a rounded look
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
