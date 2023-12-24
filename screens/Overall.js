import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/Appheader';
import LottieView from 'lottie-react-native';

export default function Overall({ navigation }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data for each report when the component mounts
    fetchData('https://d659-115-96-6-60.ngrok-free.app/today_collection_report/');
    fetchData('thisMonthCollection');
    fetchData('totalCollection');
    fetchData('collectionByCategory');
  }, []);

  const fetchData = async (reportType) => {
    try {
      setLoading(true);
      // Replace the following URL with your actual API endpoint for each report
      const response = await fetch(`https://example.com/api/${reportType}`);
      const data = await response.json();
      
      // Update the state with the fetched data
      setReports((prevReports) => [...prevReports, { type: reportType, data }]);
    } catch (error) {
      console.error(`Error fetching ${reportType} data:`, error);
    } finally {
      setLoading(false);
    }
  };
   // Generate PDF report for all collection categories
   const generatePDFReport = async () => {
    try {
      setLoading(true);

      // Prepare HTML content for the PDF
      const htmlContent = `
        <html>
          <head>
            <style>
              /* Add any styling you want for the PDF */
              body { font-family: Arial, sans-serif; }
              .report-container { margin: 20px; padding: 10px; background-color: lightgray; border-radius: 10px; }
              .report-title { font-size: 20px; font-weight: bold; color: black; margin-bottom: 10px; }
              .report-text { font-size: 16px; color: black; }
            </style>
          </head>
          <body>
            ${reports.map(({ type, data }) => `
              <div class="report-container">
                <div class="report-title">${type}</div>
                <div class="report-text">${JSON.stringify(data, null, 2)}</div>
              </div>
            `).join('')}
          </body>
        </html>
      `;

      // Generate PDF file
      const options = {
        html: htmlContent,
        fileName: 'collection_report',
        directory: 'Documents',
      };

      const pdfFile = await RNHTMLtoPDF.convert(options);

      // Display a success message
      Alert.alert(
        'PDF Report Generated',
        `The PDF report has been generated and saved at: ${pdfFile.filePath}`,
      );
    } catch (error) {
      console.error('Error generating PDF report:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.body}>
      <AppHeader
        title={"OverAllReport"}
        headerBg={"lightgreen"}
        iconColor={"black"}
        menu // or back
        optionalBadge={7}
        navigation={navigation}
        right="more-vertical"
        rightFunction={() => console.log('right')}
        optionalIcon="bell"
        optionalFunc={() => console.log('optional')}
      />



      {/* Render live data for each report */}
      {loading ? (
        <ActivityIndicator size="large" color="skyblue" />
      ) : (
        reports.map(({ type, data }) => (
          <View key={type} style={styles.reportContainer}>
            <Text style={styles.reportTitle}>{type}</Text>
            <Text style={styles.reportText}>{JSON.stringify(data, null, 2)}</Text>
          </View>
        ))
      )}
      

      {/* Render report selection buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => fetchData('todayCollection')}
      >
        <Text style={styles.buttonText}>Today Collection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => fetchData('thisMonthCollection')}
      >
        <Text style={styles.buttonText}>This Month Collection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => fetchData('totalCollection')}
      >
        <Text style={styles.buttonText}>Total Collection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => fetchData('collectionByCategory')}
      >
        <Text style={styles.buttonText}>Collection by Category</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={generatePDFReport}
      >
        <Text style={styles.buttonText}>Generate PDF Report</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 40,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  reportContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  reportText: {
    fontSize: 16,
    color: 'black',
  },
});
