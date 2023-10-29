import React from 'react';
import AppNavigation from "./navigation/appnavigation";
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




import AuthStack from './navigation/AppStack';
import AppStack from './navigation/AppStack';


function App() {
  return (

    <NavigationContainer>
        {/* <AppStack /> */}
     <AuthStack />
     
    
     </NavigationContainer>
  

  );
}

export default  App;
