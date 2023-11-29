// SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const toggleFingerprint = () => {
    setFingerprintEnabled(!fingerprintEnabled);
  };

  const toggleUsePassword = () => {
    setUsePassword(!usePassword);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Apply theme changes in your app
  };

  return (
    <View>
      <Text>Settings Screen</Text>

      <View>
        <Text>Enable Notifications</Text>
        <Switch value={notificationEnabled} onValueChange={toggleNotification} />
      </View>

      <View>
        <Text>Enable Fingerprint</Text>
        <Switch value={fingerprintEnabled} onValueChange={toggleFingerprint} />
      </View>

      {fingerprintEnabled && (
        <View>
          <Text>Use Password</Text>
          <Switch value={usePassword} onValueChange={toggleUsePassword} />
        </View>
      )}

      <View>
        <Text>Theme: {theme}</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Text>Toggle Theme</Text>
        </TouchableOpacity>
      </View>

      {/* Add other settings components and logic */}
    </View>
  );
};

export default SettingsScreen;
