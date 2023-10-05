import { View, Text, StyleSheet, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card } from 'react-native-paper';

import Carousel from 'react-native-snap-carousel';
import DetailsScreen from './Detailsscreen';
import 'react-native-gesture-handler';
 // for develop time, first add:>>    yarn add react-native-snap-carousel

 


 
   
 const Homescreen = () => {
  const carouselItems = [
    {
      image: 'https://picsum.photos/700',
      id: 1
    },
    {
      image: 'https://picsum.photos/701',
      id: 2
    },
    // Add more items as needed
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Card.Cover source={{ uri: item.image }} style={styles.carouselImage} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.body}>
      <Carousel
        layout={'default'}
        data={carouselItems}
        sliderWidth={400}
        itemWidth={300}
        renderItem={_renderItem}
      />
      <SafeAreaView style={styles.body}>
     
      
     
    </SafeAreaView>
        {/* Line */}
        <View style={styles.lineStyle}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
     
      <Card style={styles.Card1}>
        <Card.Content>
          <Text style={styles.txtmain} variant="titleLarge">Today Collection:</Text>
          
        </Card.Content>
      </Card>
       
      <Card style={styles.Card2}>
        <Card.Content>
          <Text style={styles.txtmain} variant="titleLarge">This month Collection:</Text>
          
        </Card.Content>
      </Card>
      
    </SafeAreaView>
  )
}
export default Homescreen;
const styles = StyleSheet.create({
  container: {
    marginTop:0,
   padding:2,
    backgroundColor: '#fff',
  },
  txtmain:{
   fontSize:15,
   fontWeight:"bold",

  },
  lineStyle: {
    flexDirection: 'row',
    marginTop: 10,
    
    alignItems: 'center'
},
  Card1: {
    alignItems: 'left',
    padding: 10,
    fontsize:10,
    marginLeft: 15,
    marginRight: 15,
    marginTop:5,
    backgroundColor:"gold"
  },
  Card2: {
    alignItems: 'left',
    padding: 10,
    fontsize:10,
    marginLeft: 15,
    marginRight: 15,
    marginTop:5,
    backgroundColor:"orange"
  }
})