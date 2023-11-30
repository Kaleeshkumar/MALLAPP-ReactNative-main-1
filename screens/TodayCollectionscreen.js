import React from 'react';
import { View, Text, StyleSheet ,Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const { width } = Dimensions.get('window');
const TodayCollectionscreen = () => {
  // Mock data for hourly collection with time labels
  const hourlyCollectionData = [
    { time: '12: AM', value: 10 },
    { time: '1:00 AM', value: 20 },
    { time: '2:00 AM', value: 15 },
    { time: '3:00 AM', value: 25 },
    { time: '4:00 AM', value: 30 },
    { time: '5:00 AM', value: 18 },
    { time: '6:00 AM', value: 22 },
    { time: '7:00 AM', value: 28 },
    { time: '8:00 AM', value: 35 },
    { time: '9:00 AM', value: 40 },
    { time: '10:00 AM', value: 45 },
    { time: '11:00 AM', value: 50 },
  ];

  // Calculate total collection for today
  const totalCollection = hourlyCollectionData.reduce((acc, { value }) => acc + value, 0);

  
  // Extract labels and data for LineChart
  const chartData = {
    labels: hourlyCollectionData.map(({ time }) => time),
    datasets: [
      {
        data: hourlyCollectionData.map(({ value }) => value),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Hourly Collection Line Chart */}
      
      <View style={styles.chartContainer}>
    
        <Text style={styles.chartTitle}>Hourly Collection</Text>
      
        <LineChart
          data={chartData}
          width={400} // Increase the width
          height={300} // Increase the height
          yAxisLabel="₹"
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              paddingHorizontal: 10,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
        />
      </View>
 
      {/* Today's Total Collection Data Card */}
      <View style={styles.dataCard}>
        <Text style={styles.cardTitle}>Today's Collection </Text>
        <Text style={styles.totalCollection}>₹ {totalCollection}</Text>
      </View>
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalCollection: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  lottie: {
    width: width * 0.9,
    alignItems: 'center',
    marginLeft: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20
  },

});

export default TodayCollectionscreen;