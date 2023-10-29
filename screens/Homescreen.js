import { View, Text, StyleSheet,ScrollView,Animated, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Avatar, IconButton } from 'react-native-paper';
import { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import DetailsScreen from './Detailsscreen';
import 'react-native-gesture-handler';
import AppHeader from '../components/Appheader';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


import {Svg} from 'react-native-svg';
import  { useRef } from "react";
import { COLORS, FONTS, SIZES, icons, images } from '../constants';




const Homescreen = () => {
  const [todayCollection, setTodayCollection] = useState(null);
  const [thisMonthCollection, setThisMonthCollection] = useState(null);
  const navigation = useNavigation();


  //api section
  useEffect(() => {
    // Fetch Today Collection
    fetch('http://your-backend-api/today_collection/')
      .then((response) => response.json())
      .then((data) => setTodayCollection(data))
      .catch((error) => console.error('Error:', error));

    // Fetch This Month Collection
    fetch('http://your-backend-api/this_month_collection/')
      .then((response) => response.json())
      .then((data) => setThisMonthCollection(data))
      .catch((error) => console.error('Error:', error));
  }, []);
  //fetch categories section
  useEffect(() => {
    // Fetch category data 
    fetch('http://your-backend-api/categories/')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error:', error));
  }, []);


  
  const carouselItems = [

    {
      image: 'https://www.thaagam.org/donate/assets/images/cause/d_b_cake.jpg',
      id: 1
    },
    {
      image: 'https://www.thaagam.org/donate/assets/images/cause/d_egg_milk.jpg',
      id: 2
    },
    {
      image: 'https://www.thaagam.org/donate/assets/images/cause/d_christ.jpg',
      id: 3
    },
    {
      image: 'https://www.thaagam.org/donate/assets/images/cause/d_orp.jpg',
      id: 4
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
  
  const renderCategory = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
        <Card.Content>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardPrice}>Price: {item.price}</Text>
        </Card.Content>
      </Card>
    );
  };


  return (
    <SafeAreaView style={styles.body}>
      <AppHeader
        title={"Home"}
        headerBg={"skyblue"}
        iconColor={"black"}
        menu //or back
        optionalBadge={5}
        navigation={navigation}
        right="more-vertical"
        rightFunction={() => console.log('right')}
        optionalIcon="bell"
        optionalFunc={() => console.log('optional')}
      />

      <Carousel
        layout={'default'}
        data={carouselItems}
        sliderWidth={400}
        itemWidth={300}
        renderItem={_renderItem}
      />



      <SafeAreaView style={styles.body}>
      </SafeAreaView>
<ScrollView>
      <Card style={styles.Card1}>
        <Card.Content>
          <Card.Title style={styles.cardTitle}
            title="Today Collection"

            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
          />
          <Text style={styles.txtmain} variant="titleLarge">Today Collection: {todayCollection}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.Card2}>
        <Card.Content >
          <Card.Title style={styles.cardTitle}
            title="This Month Collection"

            left={(props) => <Avatar.Icon {...props} icon="calendar" />}
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
          />
          <Text style={styles.txtmain} variant="titleLarge">This Month Collection: {thisMonthCollection}</Text>
        </Card.Content>
      </Card>


    
      
      </ScrollView>
     
    </SafeAreaView>
    
  )
  
}


export default Homescreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: 2,
    backgroundColor: '#fff',
  },
  txtmain: {
    fontSize: 12,
    fontWeight: "bold",
    justifyContent: 'center',
    padding: 1,
    marginLeft: 40

  },
  lineStyle: {
    flexDirection: 'row',
    marginTop: 1,

    alignItems: 'center'
  },
  Card1: {
    alignItems: 'left',
    padding: 2,
    fontsize: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "gold"
  },
  Card2: {
    alignItems: 'left',
    padding: 2,
    fontsize: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    backgroundColor: "pink"

  },
  carouselItem: {
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 5,
  },
  card: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  cardImage: {
    height: 200,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1,
    color: 'black',
    
  },
  cardPrice: {
    fontSize: 16,
    color: 'black',
  },
  categoryCard: {
    marginVertical: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 2,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
}
})