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
  const confirmStatus = "C"
  const pendingStatus = "P"

  let categoriesData = [
      {
          id: 1,
          name: "Education",
          icon: icons.education,
          color: COLORS.yellow,
          expenses: [
              {
                  id: 1,
                  title: "Tuition Fee",
                  description: "Tuition fee",
                  location: "ByProgrammers' tuition center",
                  total: 100.00,
                  status: pendingStatus
              },
              {
                  id: 2,
                  title: "Arduino",
                  description: "Hardward",
                  location: "ByProgrammers' tuition center",
                  total: 30.00,
                  status: pendingStatus
              },
              {
                  id: 3,
                  title: "Javascript Books",
                  description: "Javascript books",
                  location: "ByProgrammers' Book Store",
                  total: 20.00,
                  status: confirmStatus
              },
              {
                  id: 4,
                  title: "PHP Books",
                  description: "PHP books",
                  location: "ByProgrammers' Book Store",
                  total: 20.00,
                  status: confirmStatus
              }
          ],
      },
      {
          id: 2,
          name: "Nutrition",
          icon: icons.food,
          color: COLORS.lightBlue,
          expenses: [
              {
                  id: 5,
                  title: "Vitamins",
                  description: "Vitamin",
                  location: "ByProgrammers' Pharmacy",
                  total: 25.00,
                  status: pendingStatus,
              },

              {
                  id: 6,
                  title: "Protein powder",
                  description: "Protein",
                  location: "ByProgrammers' Pharmacy",
                  total: 50.00,
                  status: confirmStatus,
              },

          ],
      },
      {
          id: 3,
          name: "Child",
          icon: icons.baby_car,
          color: COLORS.darkgreen,
          expenses: [
              {
                  id: 7,
                  title: "Toys",
                  description: "toys",
                  location: "ByProgrammers' Toy Store",
                  total: 25.00,
                  status: confirmStatus,
              },
              {
                  id: 8,
                  title: "Baby Car Seat",
                  description: "Baby Car Seat",
                  location: "ByProgrammers' Baby Care Store",
                  total: 100.00,
                  status: pendingStatus,
              },
              {
                  id: 9,
                  title: "Pampers",
                  description: "Pampers",
                  location: "ByProgrammers' Supermarket",
                  total: 100.00,
                  status: pendingStatus,
              },
              {
                  id: 10,
                  title: "Baby T-Shirt",
                  description: "T-Shirt",
                  location: "ByProgrammers' Fashion Store",
                  total: 20.00,
                  status: pendingStatus,
              },
          ],
      },
      {
          id: 4,
          name: "Beauty & Care",
          icon: icons.healthcare,
          color: COLORS.peach,
          expenses: [
              {
                  id: 11,
                  title: "Skin Care product",
                  description: "skin care",
                  location: "ByProgrammers' Pharmacy",
                  total: 10.00,
                  status: pendingStatus,
              },
              {
                  id: 12,
                  title: "Lotion",
                  description: "Lotion",
                  location: "ByProgrammers' Pharmacy",
                  total: 50.00,
                  status: confirmStatus,
              },
              {
                  id: 13,
                  title: "Face Mask",
                  description: "Face Mask",
                  location: "ByProgrammers' Pharmacy",
                  total: 50.00,
                  status: pendingStatus,
              },
              {
                  id: 14,
                  title: "Sunscreen cream",
                  description: "Sunscreen cream",
                  location: "ByProgrammers' Pharmacy",
                  total: 50.00,
                  status: pendingStatus,
              },
          ],
      },
      {
          id: 5,
          name: "Sports",
          icon: icons.sports_icon,
          color: COLORS.purple,
          expenses: [
              {
                  id: 15,
                  title: "Gym Membership",
                  description: "Monthly Fee",
                  location: "ByProgrammers' Gym",
                  total: 45.00,
                  status: pendingStatus,
              },
              {
                  id: 16,
                  title: "Gloves",
                  description: "Gym Equipment",
                  location: "ByProgrammers' Gym",
                  total: 15.00,
                  status: confirmStatus,
              },
          ],
      },
      {
          id: 6,
          name: "Clothing",
          icon: icons.cloth_icon,
          color: COLORS.red,
          expenses: [
              {
                  id: 17,
                  title: "T-Shirt",
                  description: "Plain Color T-Shirt",
                  location: "ByProgrammers' Mall",
                  total: 20.00,
                  status: pendingStatus,
              },
              {
                  id: 18,
                  title: "Jeans",
                  description: "Blue Jeans",
                  location: "ByProgrammers' Mall",
                  total: 50.00,
                  status: confirmStatus,
              },
          ],
      }
  ]

  const categoryListHeightAnimationValue = useRef(new Animated.Value(115)).current;

  const [categories, setCategories] = React.useState(categoriesData)
  const [viewMode, setViewMode] = React.useState("chart")
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [showMoreToggle, setShowMoreToggle] = React.useState(false)


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
      {/* Render Category Cards */}
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryCard}>
          {renderCategory({ item: category })}
        </View>
      ))}
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
    fontSize: 15,
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