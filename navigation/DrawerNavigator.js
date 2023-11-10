import React, { useEffect } from 'react';
import homescreen from '../screens/Homescreen';
import Overall from '../screens/Overall';
import DetailsScreen from '../screens/Detailsscreen';
import PaymentScreen from '../screens/Paymentscreen';
import CustomDrawer from '../components/CustomDrawer';
import PreviewScreen from '../screens/Previewscreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PaymentFailureScreen from '../screens/PaymentFailureScreen';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contact from '../screens/contact';
import Profile from '../screens/Profile';
import { useNavigation } from '@react-navigation/native';
import BottomTabNav from './BottomTabNavigator';


const Drawer = createDrawerNavigator();


const DrawerNavigator= ( {navigation}) => {
  return (
    
    <Drawer.Navigator
      drawerContent={ (props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={homescreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Details Entry"
        component={DetailsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Preview"
        component={PreviewScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="paymentfailure"
        component={PaymentFailureScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="OverallReport"
        component={Overall}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="contact"
        component={Contact}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
       
       <Drawer.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
    
    
  );
};


export default DrawerNavigator;