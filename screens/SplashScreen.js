import React from 'react';
import { View, Image, StyleSheet,Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import interopRequireDefault from '@babel/runtime/helpers/interopRequireDefault';


const { width } = Dimensions.get('window');
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Your splash screen content, e.g., logo or image */}
      <LottieView source={require('../assets/animations/splash.json')} style={styles.logo} />
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
    width: width* 0.9,
     height: '70%',
  },
});

export default SplashScreen;
