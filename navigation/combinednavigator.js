import React from 'react';
import { View } from 'react-native';
import DrawerNavigator from './DrawerNavigator'; // Assuming this is the file with DrawerNavigator
import BottomTabNav from './BottomTabNavigator'; // Assuming this is the file with BottomTabNav

const CombinedNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerNavigator />
      <BottomTabNav />
    </View>
  );
};

export default CombinedNavigator;
