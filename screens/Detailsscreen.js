import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Portal, Button, Dialog, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import AppHeader from '../components/Appheader'; 
import { SafeAreaView } from 'react-native-safe-area-context';


export default function DetailsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [nameOnParcel, setNameOnParcel] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [count, setCount] = useState('');
  //AMOUNT
  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false);

  //SELECT TYPE CATEGORY
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['HOMELESS-25', 'EGG&MILK', 'CHICKEN BIRIYANI', 'VEG BIRIYANI', 'ORPHANAGE', 'BLANKETS', 'DOGFOOD', 'TREE PLANTING'];
  //navigate to preveiw screen
  

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSave = () => {
    const data = {
      name,
      nameOnParcel,
      mobileNumber,
      selectedCategory,
      count,
      amount,
    };


    //api to post 
    fetch('https://game-seriously-feline.ngrok-free.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        console.log('Response from API:', responseData);
        showDialog();
      })
      .catch(error => {
        console.error('Error:', error);
      });

    showDialog();
  }
//previw function
const handlePreview = () => {
  console.log('selectedCategory:', selectedCategory);
  navigation.navigate('Preview', {
    name,
    nameOnParcel,
    mobileNumber,
    selectedCategory,
    count,
    amount,
  });
}

  return (   
      <PaperProvider>
      <SafeAreaView>
      <AppHeader
    title={"Details"}
    headerBg={"skyblue"}
    iconColor={"black"}
    menu //or back
    optionalBadge={7}
    navigation={navigation} 
    right="more-vertical"
    rightFunction={() => console.log('right')}
    optionalIcon="bell"
    optionalFunc={() => console.log('optional')}
/>
      </SafeAreaView>
      <ScrollView>
      <View style={styles.detailscontainer}>
        <SafeAreaView style={styles.container}>

          <Text style={styles.heading}>Details Entry Screen</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text>Name:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Enter Donar name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Name On Parcel:</Text>
              <TextInput
                style={styles.input}
                value={nameOnParcel}
                onChangeText={text => setNameOnParcel(text)}
                placeholder="Enter name on parcel"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Mobile Number:</Text>
              <TextInput
                style={styles.input}
                value={mobileNumber}
                onChangeText={text => setMobileNumber(text)}
                keyboardType="phone-pad"
                placeholder="Enter mobile number"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Category:</Text>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                <Picker.Item label="Select a category" value="" />
                {categories.map((category, index) => (
                  <Picker.Item key={index} label={category} value={category} />
                ))}
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Text>Count:</Text>
              <TextInput
                style={styles.input}
                value={count}
                onChangeText={text => setCount(text)}
                keyboardType="numeric"
                placeholder="Enter count"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text>Amount:</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={text => setAmount(text)}
                keyboardType="numeric"
                placeholder="Enter amount"
              />
            </View>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
              
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handlePreview} style={styles.previewButton}>
            <Text style={styles.previewButtonText}>Preview</Text>
          </TouchableOpacity>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Actions>
                <Text style={styles.alert}>Details Saved</Text>
                <Button onPress={hideDialog}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          
        </SafeAreaView>
        </View>
        </ScrollView>
      </PaperProvider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f0f0f0',
  },
  detailscontainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 10,
    fontSize:20,
    fontWeight:'bold'
   
  },
  input: {
    padding: 4,
    borderWidth: 1,
    fontSize:15,
    borderColor: '#888',
    borderRadius: 5,
    color: 'blue',
    elevation: 5,
  },
  saveButton: {
    borderWidth: 2,
   borderRadius:20,
    padding: 10,
    width:100,
    alignItems: 'center',
    borderColor: 'green', // Change border color to green
    backgroundColor: 'lightgreen',
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  alert:{
    fontWeight:'bold',
    fontSize:20,
    textAlign:'justify',
    justifyContent:'flex-start',
    padding:15,
    flex:1
  },
  previewButton: {
    borderWidth: 2,
   borderRadius:20,
    padding: 10,
    width:100,
    alignItems: 'center',
    justifyContent:'flex-end',
    borderColor: 'green', // Change border color to green
    backgroundColor: 'lightgreen',
    flex:1
  },
  previewButtonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  
});

