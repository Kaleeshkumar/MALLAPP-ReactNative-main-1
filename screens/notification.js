import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.notificationBox}>
        <Text style={styles.notificationText}>You have NO new notification!</Text>
      </View>
      <TouchableOpacity style={styles.goBackButton} onPress={() => console.log('Navigate back')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  notificationBox: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 18,
    color: '#333',
  },
  goBackButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NotificationScreen;
