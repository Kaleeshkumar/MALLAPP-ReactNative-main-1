import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentFailureScreen = ({ route }) => {
  // Extract the reason for payment failure from the route parameters
  const { reason } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.animationContainer}>
      <LottieView source={require('../assets/animations/animation1.json')} autoPlay loop />
                <View>
                <Text style={styles.lottietxt}>No data available contact backend team</Text>
                </View>
      </View>
      <Text style={styles.reasonText}>Reason: {reason}</Text>
      <Text style={styles.messageText}>Payment Failed. Please try again.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: 200,
    height: 200,
  },
  reasonText: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default PaymentFailureScreen;
