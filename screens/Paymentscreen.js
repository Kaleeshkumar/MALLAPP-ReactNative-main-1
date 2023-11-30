import { Text, View, StyleSheet, TouchableOpacity, COLORS ,ScrollView, Image} from 'react-native'
import React from 'react'
import { Modal, Portal, Button, PaperProvider, Card,TextInput } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import AppHeader from '../components/Appheader';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function Paymentscreen({ navigation }) {
  // State variables for user ID and transaction details
  const [userId, setUserId] = useState('123456'); // Replace with actual user ID
  const [transactionDetails, setTransactionDetails] = useState({
    orderId: 'ORDER_ID',
    amount: '2000', // Amount in paise (5000 paise = INR 50)
    status: 'Pending', // You can update this based on the payment status
  });

  //modal open
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [transactions, setTransactions] = useState([]);
  const containerStyle = { backgroundColor: 'skyblue', padding: 15 };

  /*
  const createRazorpayOrder = async () => {
    try {
      const response = await axios.post('https://api.razorpay.com/v1/orders', {
        amount: 100, // Amount in paise
        currency: 'INR',
        receipt: 'order_rcptid_11',
        payment_capture: '1',
        notes: {
          pa: 'user@example.com',
          pn: 'Recipient',
          mc: '123',
          tid: '456',
          tr: '789'
        }
      }, {
        auth: {
          username: 'rzp_test_2h8n68Dp5BnsgZ',
          password: 'RadEymMn08SuR4yGSXsvp4qJ'
        }
      });
  
      return response.data.id;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };
  */
  // Function to create Razorpay order
  const createRazorpayOrder = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8081/create_razorpay_order/');
      console.log(response.data);
       // Assuming the response contains the order ID and other necessary details
      const orderDetails = response.data;
      return orderDetails; // Assuming the response contains the order ID
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      return null;
    }
  };

   // Function to generate payment link
 

  const [enteredAmount, setEnteredAmount] = useState('');
  const handleAmountChange = (text) => {
    setEnteredAmount(text);
  };

  
  // Function to handle the "Create Order" button press
  const handleCreateOrder = async () => {
    try {
      const orderDetails = await createRazorpayOrder();
  
      if (orderDetails) {
        const { orderId, /* other details */ } = orderDetails;
  
        const upiId = 'kaleeshkumar1125180@okaxis';
        const recipientName = 'Thaagamfoundation';
        const merchantCode = 'MZpU0jiQXg4m4x';
        const referenceId = 'your_reference_id';
        const transactionNote = 'Transaction Note';
  
        const qrCodeData = `upi://pay?pa=${upiId}&pn=${recipientName}&mc=${merchantCode}&tid=${orderId}&tr=${referenceId}&tn=${transactionNote}&am=${enteredAmount}`;
  
        showModal();
        const newTransaction = {
          orderId: orderId,
          amount: enteredAmount,
          status: 'Pending',
        };
  
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
        console.log('Payment Link:', qrCodeData);
      }
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };
  


  // Function to handle the "Show QR Code" button press
  const handleShowQRCode = () => {
    showModal();
    handlePayment(); // Call handlePayment when the button is clicked
  };


  // Define your payment data
  const handlePayment = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8081/paymenthandler/', {
        razorpay_payment_id: 'PAYMENT_ID',
        razorpay_order_id: 'ORDER_ID',
        razorpay_signature: 'SIGNATURE',
      });

      console.log('Entered Amount:', enteredAmount);

      // Check the response to determine if payment was successful
      if (response.data === 'success') {
        // Payment was successful, navigate to success screen
        // You can use React Navigation or any navigation library you prefer
        console.log('Payment successful');
        navigation.navigate('PaymentSuccessScreen');
      } else {
        // Payment failed, navigate to failure screen
        console.log('Payment failed');
        navigation.navigate('paymentfailure');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
   // Function to handle the "View Details" button press
   const handleViewDetails = (id) => {
    // Implement navigation to a details screen or modal
    console.log('View details for order:', id);
  };
  // Assuming you have the payment data ready
  const paymentData = {
    razorpay_payment_id: 'PAYMENT_ID',
    razorpay_order_id: 'ORDER_ID',
    razorpay_signature: 'SIGNATURE',
  };

  const orderId = "id"; // Replace with your actual order ID
  const upiId = "kaleeshkumar1125180@okaxis"; // Replace with your actual UPI ID
  const recipientName = "Thaagamfoundation"; // Replace with the recipient's name
  const merchantCode = "MZpU0jiQXg4m4x"; // Replace with your actual merchant code
  const referenceId = "your_reference_id"; // Replace with your actual reference ID
  const transactionNote = "Transaction Note";

  // Call the function with the payment data
    const qrCodeData =`upi://pay?pa=${upiId}&pn=${recipientName}&mc=${merchantCode}&tid=${orderId}&tr=${referenceId}&tn=${transactionNote}&am=${enteredAmount}`;
  //razor user qr code
  const options = {
    description: 'Sample Payment',
    image: 'https://example.com/your-image.png',
    currency: 'INR',
    key: 'rzp_test_2h8n68Dp5BnsgZ',
    amount: '2000', // Amount in paise (5000 paise = INR 50)
    name: 'Thaagam Foundation',
    prefill: {
      email: 'kaleeshkumar.r@gmail.com',
      contact: '6383333101',
    },
    theme: { color: '#F37254' },
  };
  RazorpayCheckout.open(options).then((data) => {
    // Handle success
    console.log(`Payment success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    // Handle failure
    console.log(`Error: ${error}`);
  });

  return (
    <PaperProvider>
      <SafeAreaView>
        <AppHeader
          title={"Payment"}
          headerBg={"#000000"}
          iconColor={"white"}
          menu //or back
          optionalBadge={5}
          navigation={navigation}
          right="more-vertical"
          rightFunction={() => console.log('right')}
          optionalIcon="bell"
          optionalFunc={() => console.log('optional')}
        />
      </SafeAreaView>
    
      <Portal style={styles.container}>
        <Modal visible={visible} onDismiss={hideModal} style={styles.modalContainer} contentContainerStyle={containerStyle}>
          <SafeAreaView style={styles.modalContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
              <MaterialIcons name="close" size={30} color="white" />
            </TouchableOpacity>
            <Image
              source={require('../assets/images/thaagam.png')} // Replace with your actual logo path
              style={styles.logo}
              resizeMode="contain"
            />
          </SafeAreaView>
          <SafeAreaView style={styles.QR}>
            {/* Display User ID */}
            {/* QR Code */}
            <QRCode value={qrCodeData} size={250} />
            <Text style={styles.QRText}>Scan & pay using UPI app</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.buttonText}>Download QR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.buttonText}>Share QR</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.upiIdText}>Razorpay UPI ID: {upiId}</Text>
          </SafeAreaView>
        </Modal>
      </Portal>
      <TextInput
        style={styles.amountInput}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={enteredAmount}
        onChangeText={handleAmountChange}
      />
   
   
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleCreateOrder}
        labelStyle={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
      >
         CREATE PAY ORDER
      </Button>

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleShowQRCode}
        labelStyle={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
      >
        SHOW THE QR CODE
      </Button>

      <Text style={styles.QRText}>User ID: {userId}</Text>
      <TouchableOpacity style={styles.btnGradContainer}>
      <LinearGradient
        colors={['#24C6DC', '#514A9D', '#24C6DC']}
        style={styles.btnGrad}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={styles.btnText}>Transaction Details</Text>
      </LinearGradient>
    </TouchableOpacity>
      
      {/* Improved Transaction History Section */}
      <View style={styles.transactionHistoryContainer}>
        
        <ScrollView>
          {transactions.map((transaction, index) => (
            <Card key={index} style={styles.transactionCard}>
              <Card.Content>
                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                  <Text style={styles.transactionStatus}>{transaction.status}</Text>
                </View>
                <Text style={styles.cardText}>Order ID: {transaction.orderId}</Text>
                <Text style={styles.cardText}>Amount: ₹{transaction.amount}</Text>
                {/* Add more details or buttons as needed */}
                <TouchableOpacity
                  style={styles.viewDetailsButton}
                  onPress={() => handleViewDetails(transaction.orderId)}
                >
                  <Text style={styles.viewDetailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
    </PaperProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 40,
  },
  QR: {
    padding: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  QRText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    margin: 5,
    marginLeft:80,
    marginRight:80,
    padding: 10,
    backgroundColor: '#5e69ee',
    borderRadius: 40,
  },
  transactionCard: {
    margin: 10,
    padding: 2,
    backgroundColor: '#E0E0E0', // Change the color to your desired color
    borderRadius: 15, // Optional: Add border radius for rounded corners
  },
  headerContainer: {
    marginBottom: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'},
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    position: "relative",
    left: 0,
    marginTop: 5,
    marginLeft: 10,
  },
  modalContent: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'black',
    padding: 45,
    borderRadius:10
  },
  amountInput: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 20,
    padding: 10,
  },
  btnGradContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
 
  btnGrad: {
    padding: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    boxShadow: '0 0 20px #eee', // boxShadow doesn't work in React Native, you can use elevation for shadow
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
  transactionHistoryContainer: {
    marginTop: 20,
    padding: 10,
  },
  transactionHistoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionCard: {
    marginBottom: 10,
    borderRadius: 15,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  transactionDate: {
    color: '#777',
  },
  transactionStatus: {
    color: 'green', // Use appropriate colors for different statuses
    fontWeight: 'bold',
  },
  viewDetailsButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#5e69ee',
    borderRadius: 5,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  downloadButton: {
    backgroundColor: '#5e69ee',
    padding: 12,
    borderRadius: 10,
  },
  shareButton: {
    backgroundColor: '#5e69ee',
    padding: 10,
    borderRadius: 10,
  },
 
  upiIdText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    padding: 5,
    backgroundColor: 'black',
    borderRadius: 25,
  },
  downloadButton: {
    backgroundColor: '#5e69ee',
    padding: 18,
    borderRadius: 15,
    marginVertical: 15,
    marginRight:8
  },
  shareButton: {
    backgroundColor: '#5e69ee',
    padding: 18,
    
    borderRadius: 15,
    marginVertical: 15,
    marginRight:5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  upiIdText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  logo: {
    height: 40, // Adjust the height as needed
    width: '100%', // Make it take the full width
    marginBottom: 50, // Adjust margin as needed
  },
});
  
  
