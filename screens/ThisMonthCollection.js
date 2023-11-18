import { StyleSheet, Text, View,Dimensions} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
const ThisMonthCollection = () => {
  return (
    <SafeAreaView>
      <View style={styles.lottie}>
                <LottieView source={require('../assets/animations/DONATION.json')} autoPlay loop />
              </View>
    </SafeAreaView>
  )
}

export default ThisMonthCollection

const styles = StyleSheet.create({
  lottie: {
    width: width * 0.9,
    alignItems: 'center',
    marginLeft: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20
  },
})