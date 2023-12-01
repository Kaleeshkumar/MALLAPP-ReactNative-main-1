import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,Share 
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useUser } from "../components/UserContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../constants';




const CustomDrawer = props => {
  const { userData, setUserData } = useUser();

  const updateUserData = (newUserData) => {
    // Assuming setUserData is a function to update user data in your context
    setUserData(newUserData);
  };
const handleProfileUpdate = async (newUserData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8081/update-profile/', newUserData);
  
      if (response.data.success) {
        updateUserData(response.data.updatedUserData);
        // Additional logic if needed
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const handleTellAFriend = () => {
    const websiteLink = 'https://thaagam.org/'; // Replace with your actual website link
    Share.share({
      message: `Check out this amazing website: ${websiteLink}`,
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: COLORS.primary}}>
        <ImageBackground
          source={{ uri: userData.profileImage }}
          style={{padding: 20}}>
          <Image
             source={{ uri: userData.profileImage }}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            kaleesh kumar
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')}>
  <View style={{ flexDirection: 'row', alignItems: 'right' }}>
    <Ionicons name="person-circle-outline" size={22} color={'white'}/>
    <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', marginLeft: 5 ,color:'white'}}>
      Edit Profile
    </Text>
  </View>
</TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              1,25,000 Rs
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 15}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={handleTellAFriend} style={{paddingVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
