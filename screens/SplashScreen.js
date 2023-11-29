import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Your splash screen content, e.g., logo or image */}
      <LottieView source={require('../assets/animations/su1.json')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
