// DonationScreen.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Receipt from './Receipt';

const DonationScreen = ({ navigation }) => {
  const handleTaboolaChat = () => {
    console.log('Open Taboola Chat');
    // Implement Taboola Chat SDK integration here
    // You can open a WebView or use any other method to integrate Taboola Chat
    // For simplicity, using WebView here
    navigation.navigate('TawkToChat'); // Navigate to the screen containing WebView
  };

  const handleWhatsAppBot = () => {
    // Add logic to open WhatsApp bot
    console.log('Open WhatsApp bot');
    // Implement WhatsApp bot integration here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.text}>Donation</Text>

        <TouchableOpacity style={styles.button} onPress={handleWhatsAppBot}>
          <Text style={styles.buttonText}>Generate Receipt</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleTaboolaChat}>
          <Text style={styles.buttonText}>Open Taboola Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleWhatsAppBot}>
          <Text style={styles.buttonText}>Open WhatsApp Bot</Text>
        </TouchableOpacity>

        

        {/* Add more components or styling here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#5e69ee',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DonationScreen;
