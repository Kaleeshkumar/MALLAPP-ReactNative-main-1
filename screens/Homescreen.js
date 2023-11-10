import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Avatar, IconButton } from 'react-native-paper';
import { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import DetailsScreen from './Detailsscreen';
import 'react-native-gesture-handler';
import Appheader from '../components/Appheader';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import drawernavigation from '../navigation/DrawerNavigator';
import routes from '../constants/routes';

import { Svg } from 'react-native-svg';
import { useRef } from "react";
import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import NetInfo from '@react-native-community/netinfo';




const { width, height } = Dimensions.get('window');



function Homescreen({ navigation }) {
  const [isConnected, setConnected] = useState(true);

  const [todayCollection, setTodayCollection] = useState();
  const [thisMonthCollection, setThisMonthCollection] = useState(null);

  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });


  //api section
  useEffect(() => {
    // Fetch Today Collection

   

    fetch('http://127.0.0.1:8081/today_collection/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if required
      },
      body: JSON.stringify({}),
    }) // Replace with your Django backend URL and endpoint
      .then(response => response.json())
      .then(data => {
        console.log('Today Collection:', data.TodayCollection);
        const todayCollectionData = data.TodayCollection;
        setTodayCollection(todayCollectionData);
      })
      .catch(error => 
        {console.error('Error:', error);
       
      });

     
  }, []);
  
  /*
      // Fetch This Month Collection
      fetch('http://127.0.0.1:8081/ThisMonthCollection/')
        .then((response) => {
          if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
        .then((data) => setThisMonthCollection(data))
        .catch((error) => console.error('Error:', error));
    }, []);
    //fetch categories section
    useEffect(() => {
      // Fetch category data 
      fetch('http://127.0.0.1:8081/categories/')
        .then((response) => {
          if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
        .then((data) => setCategories(data))
        .catch((error) => console.error('Error:', error));
    }, []);
  */
 
  


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

  function renderNotice(){
    return(
      <View>
        <Text>xddx</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.body}>
      <Appheader
        title={"HOME"}
        headerBg={"gold"}
        iconColor={"black"}
        navigation={navigation}
        menu //or back
        optionalBadge={5}
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
        autoplay={true}  // Enable autoplay
      autoplayInterval={4000} 
      loop={true} // Set the autoplay interval in milliseconds (e.g., 3000ms or 3 seconds)

      />

      <SafeAreaView style={styles.body}>
      </SafeAreaView>
      <ScrollView>
        <Card style={styles.Card1} onPress={() => navigation.navigate('TodayCollection')}>
          <Card.Content>
            <Card.Title style={styles.cardTitle}
              title="Today Collection"

              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => { }} />}
            />
            <Text style={styles.txtmain} variant="titleLarge">Today Collection: {todayCollection}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.Card2}onPress={() => navigation.navigate('ThisMonthCollection')}>
          <Card.Content >
            <Card.Title style={styles.cardTitle}
              title="This Month Collection"

              left={(props) => <Avatar.Icon {...props} icon="calendar"  /> }
              right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => navigation.navigate('Profile')} />}
            />
            <Text style={styles.txtmain} variant="titleLarge">This Month Collection: {thisMonthCollection}</Text>
          </Card.Content>
        </Card>

        <View style={styles.lottie}>
          <LottieView source={require('../assets/animations/su1.json')} autoPlay loop />
        </View>
        <Text style={styles.lottie}>No data available contact backend team</Text>
      </ScrollView>

    </SafeAreaView>

  )

}
export default Homescreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 2,
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
    padding: 3,
    fontsize: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    backgroundColor: "gold",

  },
  Card2: {
    alignItems: 'left',
    padding: 2,
    fontsize: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    backgroundColor: "pink"

  },
  carouselItem: {
    borderRadius: 10,
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
  lottie: {
    width: width * 0.9,
    height: width,
    alignItems: 'center',
    marginLeft: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20

  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  }
})