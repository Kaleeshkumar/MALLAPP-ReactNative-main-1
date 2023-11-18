import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

const DonorListScreen = ({ donarDetails }) => {

  const [donorDetails, setDonorDetails] = useState([]);
  useEffect(() => {
    // Fetch donor list data from the backend when the component mounts
    fetchDonorList();
  }, []);

  const fetchDonorList = () => {
    // Make a request to your backend to get the donor list data
    axios.get('http://127.0.0.1:8081/get_donor_list')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Donor List Data:', data);
        // Update the state with the fetched donor list data
        setDonorDetails(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Donor Details</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              // Implement logic to generate and download Excel
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Download Excel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Implement logic to generate and download PDF
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Download PDF</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Name</Text>
          <Text style={styles.columnHeader}>Name On Parcel</Text>
          <Text style={styles.columnHeader}>Mobile Number</Text>
          <Text style={styles.columnHeader}>Selected Category</Text>
          <Text style={styles.columnHeader}>Count</Text>
          <Text style={styles.columnHeader}>Amount</Text>
        </View>

        {donarDetails.map((donarDetail, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.column}>{donarDetail.name}</Text>
            <Text style={styles.column}>{donarDetail.nameOnParcel}</Text>
            <Text style={styles.column}>{donarDetail.mobileNumber}</Text>
            <Text style={styles.column}>{donarDetail.selectedCategory}</Text>
            <Text style={styles.column}>{donarDetail.count}</Text>
            <Text style={styles.column}>{donarDetail.amount}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  tableContainer: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  columnHeader: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  column: {
    flex: 1,
    color: '#333',
  },
});

export default DonorListScreen;
