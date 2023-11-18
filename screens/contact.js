import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, images } from '../constants';
import { Linking } from 'react-native';
import { useUser } from '../components/UserContext';

const Contact = () => {
  const { userData } = useUser();

  const handleCall = () => {
    const phoneNumber = '+916383333101';
    Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
      console.error('Error in opening phone dialer:', err)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Company Logo */}
      <View style={styles.logoContainer}>
        <Image source={images.companyLogo} style={styles.logo} resizeMode="contain" />
      </View>

      {/* User Details and Contact */}
      <View style={styles.contactContainer}>
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userRole}>{userData.role}</Text>
        <Text style={styles.companyName}>Company: Thaagam foundation</Text>
        <Text style={styles.contactText}>Contact Us:</Text>
        <TouchableOpacity onPress={handleCall}>
          <Text style={styles.contactNumber}>+916383333101</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  contactContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  userRole: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 5,
  },
  companyName: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 20,
    color: COLORS.white,
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 18,
    color: COLORS.white,
    textDecorationLine: 'underline',
  },
});
