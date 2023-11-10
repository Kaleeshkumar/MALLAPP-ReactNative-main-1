import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { UserProvider } from "../MALLAPP-main/components/UserContext";

import Profile from '../MALLAPP-main/screens/Profile';


import AuthNavigator from './navigation/AuthNavigator';
import BottomTabNav from './navigation/BottomTabNavigator';


export default function App() {
  // isAuthenticated = is...
  return (
   
    
    
       <NavigationContainer>
      {/* {isAuthenticated ? AuthNavigator : DrawerNavigator } */}
      
    <AuthNavigator/>
      

     
    </NavigationContainer>
  
     
       
  
   
    
  );
}