import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Modal, Portal, Button, Dialog, Provider as PaperProvider } from 'react-native-paper';




export default function DetailsScreen({ navigation }){
  const [name, setName] = useState('');
  const [nameOnParcel, setNameOnParcel] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [category, setCategory] = useState('');
  const [count, setCount] = useState('');
  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSave = () => {
    // Add logic to handle saving the details
    showDialog();
  }

  const handlePreview = () => {
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
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Details Entry Screen</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter your name"
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
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={text => setCategory(text)}
              placeholder="Enter category"
            />
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
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 20,
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
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontWeight: 'bold',
  },
});

