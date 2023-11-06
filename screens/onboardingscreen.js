import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from './utils/asysncStorage';


const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone =()=>{
    navigation.navigate ('login');
    setItem ('onboarded','1');
    }
    const doneButton =({...props})=>{
      return(
       <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
        </TouchableOpacity>
      )
    }
  return (
    <View style={styles.container}>
      <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      bottomBarHighlight={false}
      DoneButtonComponent={doneButton}
      
        pages={[
          {
            backgroundColor: 'skyblue',
            image: (
              <View style={styles.lottie}>
                
                <LottieView source={require('../assets/animations/animation_lmevzmlv.json')} autoPlay loop />
              </View>
            ),
            title: 'welcome to Thaagam',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: 'white',
            image: (
              <View style={styles.lottie}>
                
                <LottieView source={require('../assets/animations/su1.json')} autoPlay loop />
              </View>
            ),
            title: 'welcome to Thaagam',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: 'white',
            image: (
              <View style={styles.lottie}>
                
                <LottieView source={require('../assets/animations/animation_lmexkeg0.json')} autoPlay loop />
              </View>
            ),
            title: 'welcome to Thaagam',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          // Add your other pages here
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width*0.9,
    height: width,
  },
  doneButton:{
    padding:20,
    backgroundColor:'yellow',
   


  }
  // Add your other styles here
});
