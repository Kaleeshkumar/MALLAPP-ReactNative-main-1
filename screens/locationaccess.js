import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const LocationAccess = ({ navigation }) => {
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    // Check the initial status of location permission
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    setLocationPermission(status);
  };

  const handleGrantPermission = () => {
    navigation.navigate('Home'); // Navigate to your home screen or the next screen after granting permission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Access</Text>
      <Text style={styles.description}>This app requires access to your location.</Text>

      {locationPermission === 'granted' ? (
        <TouchableOpacity style={styles.button} onPress={handleGrantPermission}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={checkLocationPermission}>
          <Text style={styles.buttonText}>Grant Location Access</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LocationAccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#5e69ee',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
