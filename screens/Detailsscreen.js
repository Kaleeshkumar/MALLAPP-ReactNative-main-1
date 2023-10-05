import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Portal, Button, Dialog, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';


export default function DetailsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [nameOnParcel, setNameOnParcel] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [count, setCount] = useState('');
  //AMOUNT
  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false);

  //SELECT TYPE CATEGORY
  const [category, setCategory] = useState('');
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
      category,
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
  console.log('category:', category);
  navigation.navigate('Preview', {
    name,
    nameOnParcel,
    mobileNumber,
    category,
    count,
    amount,
  });
}

 

  return (
    <ScrollView>
      <PaperProvider>
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
          <TouchableOpacity onPress={handlePreview} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Preview</Text>
          </TouchableOpacity>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Actions>
                <Text style={styles.alert}>saved</Text>
                <Button onPress={hideDialog}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

        </SafeAreaView>
        </View>
      </PaperProvider>

    </ScrollView>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginBottom: 10,
    
   
  },
  input: {
    padding: 10,
    borderWidth: 1,
    
    borderColor: '#888',
    borderRadius: 5,
    color: 'blue',
    elevation: 5,
  },
  saveButton: {
    borderWidth: 1,
   borderRadius:20,
    padding: 10,
    width:100,
    alignItems: 'center',
    borderColor: 'green', // Change border color to green
    backgroundColor: 'lightgreen',
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  
});

