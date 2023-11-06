import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboardingscreen';
import  { useEffect } from 'react';
import login from '../screens/login';
import Signup from '../screens/Signup';
import Overall from '../screens/Overall';
import DetailsScreen from '../screens/Detailsscreen';
import PaymentScreen from '../screens/Paymentscreen';
import 'react-native-gesture-handler';
import { getItem } from '../screens/utils/asysncStorage';
import { useState } from 'react';
import Homescreen from '../screens/Homescreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerNavigator from './DrawerNavigator';



const Stack = createNativeStackNavigator();

function AuthNavigator() {
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
    <Stack.Navigator initialRouteName='Onboarding'>
  <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
  <Stack.Screen name="login" options={{ headerShown: false }} component={login} />
  
</Stack.Navigator>
    // Assuming you're using React Navigation
  );

}else{
  return (
      <Stack.Navigator initialRouteName='Onboarding'>
   
   <Stack.Screen name="drawernavigator" options={{headerShown:false}} component={DrawerNavigator}/>
      <Stack.Screen name="Home" options={{ headerShown: false }} component={Homescreen} />

      <Stack.Screen name='Payment' component={PaymentScreen} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='Details' options={{ headerShown: false }} component={DetailsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  
  );

}}
export default AuthNavigator;
