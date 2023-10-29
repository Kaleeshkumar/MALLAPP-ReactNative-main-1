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
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeTabs = () => (
  <Tab.Navigator
    initialRouteName="home"
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
    }}
  >
    <Tab.Screen
      name="home"
      component={homescreen}
      options={{
        tabBarLabel: 'Home',
         headerShown: false ,
        tabBarIcon: ({ color, size ,focused}) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Payment"
      component={PaymentScreen}
      options={{
        headerShown: false ,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="wallet" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Deatail"
      component={DetailsScreen}
      options={{
        tabBarLabel: 'Details',
        headerShown: false ,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Preview"
      component={PreviewScreen}
      options={{
        tabBarLabel: 'Preview',
        headerShown: false ,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
     <Tab.Screen
      name="OVERALL"
      component={Overall}
      options={{
        tabBarLabel: 'TESTING',
        headerShown: false ,
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
  
);

const Drawernav = () => (
  <NavigationContainer>
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Homescreen} />
    {/* Add more screens as needed */}
  </Drawer.Navigator>
  </NavigationContainer>
  
);


export default function AppNavigation() {
  

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
}
