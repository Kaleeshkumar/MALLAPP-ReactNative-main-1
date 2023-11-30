import React, { useEffect, useState } from 'react';
import SplashScreen from '../MALLAPP-main/screens/SplashScreen';
import { UserProvider } from "../MALLAPP-main/components/UserContext";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import DrawerNavigator from './navigation/DrawerNavigator'; // Import your DrawerNavigator
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';


export default function App() {
 

  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., loading data, initializing the app)
    const initializeApp = async () => {
      // Perform any necessary tasks here
      // For example, check authentication status, load data, etc.

      // Simulate a delay (you can replace it with actual tasks)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Set the app ready state
      setAppReady(true);
    };

    initializeApp();
  }, []);

  if (!isAppReady) {
    // Show the splash screen while the app is loading
    return <SplashScreen />;
  }

  // isAuthenticated = is...
  const isAuthenticated = true;

  return (
    <NativeBaseProvider>
      <UserProvider>
        <NavigationContainer>
        <StatusBar style="dark" />
          {isAuthenticated ? <AuthNavigator /> : <DrawerNavigator />}
         
        </NavigationContainer>
      </UserProvider>
    </NativeBaseProvider>
  );
}
