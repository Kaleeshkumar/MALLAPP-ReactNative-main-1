import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';


import AuthNavigator from './navigation/AuthNavigator';
import { BottomNavigation } from 'react-native-paper';


export default function App() {
  // isAuthenticated = is...
  return (
    
    <NavigationContainer>
      {/* {isAuthenticated ? AuthNavigator : DrawerNavigator } */}
      
      <AuthNavigator/>

     

    </NavigationContainer>
  );
}