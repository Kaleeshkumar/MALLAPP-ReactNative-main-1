import React, { useEffect } from 'react';
import homescreen from '../screens/Homescreen';
import Overall from '../screens/Overall';
import DetailsScreen from '../screens/OnlineDetailsscreen';
import PaymentScreen from '../screens/Paymentscreen';
import CustomDrawer from '../components/CustomDrawer';
import PreviewScreen from '../screens/Previewscreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PaymentFailureScreen from '../screens/PaymentFailureScreen';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contact from '../screens/contact';
import Donorlist from '../screens/Donorlist';
import BottomTabNav from './BottomTabNavigator';
import Homescreen from '../screens/Homescreen';
import { COLORS } from '../constants';
import SettingsScreen from '../screens/settingsscreen';


const Drawer = createDrawerNavigator();


export default function DrawerNavigator( ) {
  return (
    
    <Drawer.Navigator
      drawerContent={ (props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
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
        component={Homescreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="DetailsEntry"
        component={DetailsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Donorlist"
        component={Donorlist}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="list" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="paymentfailure"
        component={PaymentFailureScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="timer" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="OverallReport"
        component={Overall}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="document" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="contact"
        component={Contact}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="call" size={22} color={color} />
          ),
        }}
      />
       
       <Drawer.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
    
    
  );
};


