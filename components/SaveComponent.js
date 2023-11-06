import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import ViewShot from 'react-native-view-shot';

const SaveComponent = () => {
  let viewShotRef = React.createRef();

  const captureView = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      saveToGallery(uri);
    } catch (error) {
      console.error('Error capturing view:', error);
    }
  };

  const saveToGallery = async (uri) => {
    try {
      // You can save the image to the gallery using the CameraRoll API or a library like react-native-fs
      // For simplicity, we'll just show a toast message here
      ToastAndroid.show('Image saved to gallery', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error saving image to gallery:', error);
    }
  };

  return (
    <View>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
        <Text>Your Text Here</Text>
      </ViewShot>
      <TouchableOpacity onPress={captureView}>
        <Text>Save Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SaveComponent;
