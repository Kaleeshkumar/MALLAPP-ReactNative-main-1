import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PreviewScreen({ route }) {
  const { name, nameOnParcel, mobileNumber, category, count, amount } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.invoiceContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Donor Deatails Preview</Text>
        </View>
        <View style={styles.invoiceDetails}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>{name}</Text>

          <Text style={styles.detailLabel}>Name On Parcel:</Text>
          <Text style={styles.detailValue}>{nameOnParcel}</Text>

          <Text style={styles.detailLabel}>Mobile Number:</Text>
          <Text style={styles.detailValue}>{mobileNumber}</Text>

          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{ category}</Text>

          <Text style={styles.detailLabel}>Count:</Text>
          <Text style={styles.detailValue}>{count}</Text>

          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.detailValue}>{amount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Background color for the entire screen
    padding: 20,
    justifyContent: 'center',
  },
  invoiceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  invoiceDetails: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 3,
    padding: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'right', // Aligns the text to the right
  },
});
