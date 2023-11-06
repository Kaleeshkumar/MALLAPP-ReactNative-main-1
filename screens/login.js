import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, NumberInput} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


const handleLogin = ({navigation, mobileNumber, password}) => {
    // Send a POST request to your Django backend
    fetch('http://127.0.0.1:8081/handle_login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile_number: mobileNumber, password: password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Authentication successful, navigate to home screen
          navigation.navigate('Home');
        } else {
          // Authentication failed, show an alert
          Alert.alert('Error', 'Invalid credentials');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

function Login() {

    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
const navigation= useNavigation();
    
    return (
        <View style={styles.container}>
            <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Login</Text>
            </View>
            <View style={styles.text2}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")} ><Text style={styles.signupText}> Sign up</Text></TouchableOpacity>
            </View>

            {/* Username or Email Input Field */}
            <View style={styles.buttonStyle}>

                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="user-secret" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color: "black",
                                }}
                                _dark={{
                                    color: "gray.300",                                                                                  
                                }}
                            />
                        }
                        variant="outline"
                        value={mobileNumber}
                        onChangeText={text => setMobileNumber(text)}
                        placeholder="Mobile number"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}

                    />
                </View>
            </View>

            {/* Password Input Field */}
            <View style={styles.buttonStyleX}>

                <View style={styles.emailInput}>
                    <Input
                        InputLeftElement={
                            <Icon
                                as={<FontAwesome5 name="key" />}
                                size="sm"
                                m={2}
                                _light={{
                                    color: "black",
                                }}
                                _dark={{
                                    color: "gray.300",
                                }}
                            />
                        }
                        variant="outline"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder="Password/Emp id"
                        _light={{
                            placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                            placeholderTextColor: "blueGray.50",
                        }}
                    />
                </View>
            </View>

            {/* Button */}
            <View style={styles.buttonStyle}>
                <Button style={styles.buttonDesign} onPress={handleLogin}>
                    LOGIN
                </Button>
            </View>
            </View>
            {/* Line */}
            <View style={styles.lineStyle}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            
{/*
          
            <View style={styles.boxStyle}>
                <Box
                    onPress={() => navigation.navigate("#")}  // for navigation 
                    style={{ height: 80, width: 80 }}
                    shadow={3}
                    _light={{
                        backgroundColor: "gray.50",
                    }}
                    _dark={{
                        backgroundColor: "gray.700",
                    }}
                >
                    <AspectRatio ratio={1 / 1}>
                        <Image
                            roundedTop="lg"
                            source={{
                                uri: "https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png",
                            }}
                            alt="image"
                        />
                    </AspectRatio>
                </Box>
                <Box
                    onPress={() => navigation.navigate("#")}  // for navigation
                    style={styles.imageStyle}
                    shadow={3}
                    _light={{
                        backgroundColor: "gray.50",
                    }}
                    _dark={{
                        backgroundColor: "gray.700",
                    }}
                >
                    <AspectRatio ratio={1 / 1}>
                        <Image

                            roundedTop="lg"
                            source={{
                                uri: "https://www.transparentpng.com/thumb/facebook-logo-png/photo-facebook-logo-png-hd-25.png",
                            }}
                            alt="image"
                        />
                    </AspectRatio>
                </Box>
                <Box
                    onPress={() => navigation.navigate("#")}  // for navigation
                    style={styles.imageStyle}
                    shadow={3}
                    _light={{
                        backgroundColor: "gray.50",
                    }}
                    _dark={{
                        backgroundColor: "gray.700",
                    }}
                >
                    <AspectRatio ratio={1 / 1}>
                        <Image

                            roundedTop="lg"
                            source={{
                                uri: "https://www.transparentpng.com/thumb/twitter/bird-twitter-socialmedia-icons-png-5.png",
                            }}
                            alt="image"
                        />
                    </AspectRatio>
                </Box>
                <Box
                    onPress={() => navigation.navigate("#")}  // for navigation
                    style={styles.imageStyle}
                    shadow={3}
                    _light={{
                        backgroundColor: "gray.50",
                    }}
                    _dark={{
                        backgroundColor: "gray.700",
                    }}
                >
                    <AspectRatio ratio={1 / 1}>
                        <Image

                            roundedTop="lg"
                            source={{
                                uri: "https://www.transparentpng.com/thumb/apple-logo/RRgURB-apple-logo-clipart-hd.png",
                            }}
                            alt="image"
                        />
                    </AspectRatio>
                </Box>
                        </View>*/}
            
          
        </View>
    );
}

export default () => {
    return (
        <NativeBaseProvider>

            <Login />

        </NativeBaseProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
       
    },
    LoginText: {
        marginTop: 100,
        fontSize: 30,
        fontWeight: 'bold',
    },
    Middle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text2: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5
    },
    signupText: {
        fontWeight: 'bold'
    },
    emailField: {
        marginTop: 30,
        marginLeft: 15
    },
    emailInput: {
        marginTop: 10,
        marginRight: 5
    },
    buttonStyle: {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15
    },
    buttonStyleX: {
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15
    },
    buttonDesign: {
        backgroundColor: '#026efd'
    },
    lineStyle: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center'
    },
    imageStyle: {
        width: 80,
        height: 80,
        marginLeft: 20,
    },
    boxStyle: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'space-around'
    },
});