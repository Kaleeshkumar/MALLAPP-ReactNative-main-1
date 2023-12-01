import { View, Text, Platform } from "react-native";
import React from "react";
import {
  Fontisto,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../constants";
import Homescreen from "../screens/Homescreen";
import Paymentscreen from "../screens/Paymentscreen";
import Detailsentryscreen from "../screens/Detailsentryscreen";
import Profile from "../screens/Profile";
import DrawerNavigator from "./DrawerNavigator";
import { Ionicons } from '@expo/vector-icons';
import Donation from "../screens/Donation";


const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: true,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "relative",
    bottom: 2,
    right: 0,
    left: 0,
    elevation: 80,
    height: 60,
    unmountOnBlur: true,
    backgroundColor: COLORS.white,
  },
};
const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HOME"
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="home"
                size={28}
                color={focused ? COLORS.primary : COLORS.black}
              /> 
            );
          },
          
        }}
      />

      <Tab.Screen
        name="payment"
        component={Paymentscreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
              name="wallet"
              size={28}
              color={focused ? COLORS.primary : COLORS.black}
            />
            );
          },
          tabBarLabel: 'Payment',
        }}
      />

      <Tab.Screen
        name="DETAILS"
        component={Detailsentryscreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.primary,
                  height: Platform.OS == "ios" ? 50 : 60,
                  width: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                  borderWidth: 3,
                  borderColor: COLORS.white,
                }}
              >
                <Fontisto name="plus-a" size={24} color={COLORS.white} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Donation"
        component={Donation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
              name="logo-ionitron"
              size={30}
              color={focused ? COLORS.primary : COLORS.black}
            />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
              name="person-sharp"
              size={28}
              color={focused ? COLORS.primary : COLORS.black}
            />
            );
          },
        }}
      />
      
    </Tab.Navigator>
  );
};

export default BottomTabNav;