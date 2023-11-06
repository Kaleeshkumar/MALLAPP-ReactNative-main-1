
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
import  { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/onboardingscreen';
import homescreen from '../screens/Homescreen';
import DetailsScreen from '../screens/Detailsscreen';
import PaymentScreen from '../screens/Paymentscreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { getItem } from '../screens/utils/asysncStorage';
import { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';




const Tab = createBottomTabNavigator();

function BottomTabNavigator (){
    
return (
    <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarInactiveTintColor: COLORS.dark,
      tabBarStyle: styles.tabBarStyle,
      tabBarActiveTintColor: COLORS.primary,
      tabBarIcon: ({color, size, focused}) => {
        let iconName;

        if (route.name === ROUTES.HOME) {
          iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
        } else if (route.name === ROUTES.Details) {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (route.name === ROUTES.Payment) {
          iconName = focused ? 'wallet' : 'wallet-outline';
        }
        return <Icon name={iconName} size={22} color={color} />;
    },
  })}>
      <Tab.Screen
        name={ROUTES.HOME}
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
        name={ROUTES.Payment}
        component={PaymentScreen}
        options={{
          headerShown: false ,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.Details}
        component={DetailsScreen}
        options={{
          tabBarLabel: 'Details',
          headerShown: false ,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
     
      
    </Tab.Navigator>
    
  );
    }
  
export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
      position: 'absolute',
      backgroundColor: COLORS.transparent,
      borderTopWidth: 0,
      bottom: 15,
      right: 10,
      left: 10,
      height: 92,
    },
  });