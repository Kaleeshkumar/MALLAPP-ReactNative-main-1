import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppHeader from '../components/Appheader';
import { Center } from 'native-base';


export default function Overall({navigation}) {
  return (
    
        
        <SafeAreaView style={styles.body}>
      <AppHeader
        title={"OverAllReport"}
        headerBg={"lightgreen"}
        iconColor={"black"}
        menu or back
        optionalBadge={7}
        navigation={navigation}
        right="more-vertical"
        rightFunction={() => console.log('right')}
        optionalIcon="bell"
        optionalFunc={() => console.log('optional')}
      />
      <Text style={styles.Text}>overallreport</Text>
      </SafeAreaView>
      
   
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 40
  },
  button: {
    margin: 20,
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 40,
  },
  Text:{
    fontSize:25,
    alignItems:'center',
    justifyContent: 'center',
    textAlign:'center',
  }

})