import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/onboardingscreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboardingscreen';
import homescreen from '../screens/Homescreen';
import login from '../screens/login';
import Signup from '../screens/Signup';
import Overall from '../screens/Overall';
import DetailsScreen from '../screens/Detailsscreen';
import PaymentScreen from '../screens/Paymentscreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PreviewScreen from '../screens/Previewscreen';
import 'react-native-gesture-handler';
import { getItem } from '../screens/utils/asysncStorage';
import { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};







const [showOnboarding, setShowOnboarding] = useState(null);

useEffect(() => {
  checkIfAlreadyonboarded();
}, [])

const checkIfAlreadyonboarded = async () => {
  let onboarded = await getItem('onboarded');
  if (onboarded == 1) {
    //hideonboarding
    setShowOnboarding(false);
  }
  else {
    //show onboarding
    setShowOnboarding(true);
  }
}

if(showOnboarding){
  
  return (
    <NavigationContainer>
      
    <Stack.Navigator initialRouteName='Onboarding'>
      <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={login} />
      <Stack.Screen name='Payment' component={PaymentScreen} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
      <Stack.Screen name='Overall' component={Overall} />
      <Stack.Screen name='Details' options={{ headerShown: false }} component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );

}else{
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='home'> 
   
    <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
      <Stack.Screen name='Payment' component={PaymentScreen} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='Details' options={{ headerShown: false }} component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );

}
export default AuthStack;