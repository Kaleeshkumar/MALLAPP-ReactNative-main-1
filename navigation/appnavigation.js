import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home"
      component={homescreen}
      options={{
        drawerLabel: 'Home',
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Drawer.Screen name="Home" component={DrawerScreens} />
    <Drawer.Screen name="Overall" component={Overall} />
    {/* Add more screens as needed */}
  </Drawer.Navigator>
);

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
        tabBarIcon: ({ color, size ,focused}) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Payment"
      component={PaymentScreen}
      options={{

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
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
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
      <Stack.Navigator initialRouteName='Home'>   
      <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name='Payment' component={PaymentScreen} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Details' options={{ headerShown: false }} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    );

  }
}
