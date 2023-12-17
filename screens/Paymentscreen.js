import { Text, View, StyleSheet, TouchableOpacity, COLORS ,ScrollView, Image} from 'react-native'
import React from 'react'
import { Modal, Portal, Button, PaperProvider, Card,TextInput } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import AppHeader from '../components/Appheader';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState ,useEffect} from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Paymentscreen=({ route })=>
 {
  // State variables for user ID and transaction details
  const { orderId, qrCodeData } = route.params || {};
  const navigation = useNavigation();
  const [userId, setUserId] = useState('123456');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
 // Replace with actual user ID
  const [transactionDetails, setTransactionDetails] = useState({
    
    amount: '2000', // Amount in paise (5000 paise = INR 50)
    status: 'Pending', // You can update this based on the payment status
  });
  const [hasEnteredPage, setHasEnteredPage] = useState(false);

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
      const response = await axios.post('https://18b1-115-96-6-60.ngrok-free.app/create_razorpay_order/', { amount: enteredAmount }, { headers: { 'Content-Type': 'application/json' } });
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
  

  const handleShowcontainer = () => {
    showModal();
     // Call handlePayment when the button is clicked
  };
  // Function to handle the "Show QR Code" button press
  const handleShowQRCode = () => {
    showModal();
     // Call handlePayment when the button is clicked
  };
  useEffect(() => {
    if (hasEnteredPage) {
      // If the user has already entered the page, do nothing
      return; 
    }
    // Show QR code automatically after 3 seconds
    setTimeout(() => {
      handleShowQRCode();
      setHasEnteredPage(true); // Set the flag to true after showing the QR code
    }, 3000);
  }, [hasEnteredPage]);

    // Function to handle the "Show QR Code" button press
    useEffect(() => {
      let timeoutId;
      if (visible) {
        // Auto-hide the modal after 3 seconds
        timeoutId = setTimeout(() => {
          hideModal();
          // Call your payment handler function here
         handlePayment();
        }, 20000);
        // Clear the timeout when the component is unmounted
        return () => clearTimeout(timeoutId);
      }
     
    }, [visible]);
    


  // Define your payment data
  const handlePayment = async () => {
    try {
      const response = await axios.post('https://18b1-115-96-6-60.ngrok-free.app/paymenthandler/', {
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
   const handleViewDetails = (id,transaction) => {
    setSelectedTransaction(transaction);
    // Implement navigation to a details screen or modal
    console.log('View details for order:', id);
  };
  // Assuming you have the payment data ready
  const paymentData = {
    razorpay_payment_id: 'PAYMENT_ID',
    razorpay_order_id: 'ORDER_ID',
    razorpay_signature: 'SIGNATURE',
  };

  // Replace with your actual order ID
  const upiId = "kaleeshkumar1125180@okaxis"; // Replace with your actual UPI ID
  const recipientName = "Thaagamfoundation"; // Replace with the recipient's name
  const merchantCode = "MZpU0jiQXg4m4x"; // Replace with your actual merchant code
  const referenceId = "your_reference_id"; // Replace with your actual reference ID
  const transactionNote = "Transaction Note";

  // Call the function with the payment data
 /*   
  //razor user qr code
  const options = {
    description: 'Sample Payment',
    image: 'https://example.com/your-image.png',
    currency: 'INR',
    key: 'rzp_test_2h8n68Dp5BnsgZ',
    amount: '1000', // Amount in paise (5000 paise = INR 50)
    name: 'Thaagam ',
    prefill: {
      email: 'kaleeshkumar.r@gmail.com',
      contact: '6383333101',
    },
    theme: { color: 'blue' },
  };
  RazorpayCheckout.open(options).then((data) => {
    // Handle success
    console.log(`Payment success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    // Handle failure
    console.log(`Error: ${error}`);
  });
  */

  return (
    <PaperProvider>
      <SafeAreaView>
        <AppHeader
          title={"Payment"}
          headerBg={"#000000"}
          iconColor={"white"}
          back
          optionalBadge={5}
          onPress={() => navigation.goBack()}
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
            
      <QRCode value={qrCodeData} size={280} />
      
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

      <Portal style={styles.container}>
        <Modal visible={visible} onDismiss={hideModal} style={styles.modalContainer} contentContainerStyle={containerStyle}>
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
      </Modal>
      </Portal>

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
    <Button
        style={styles.button}
        mode="contained"
        onPress={handleShowcontainer}
        labelStyle={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
      >
        QUICK PAY
      </Button>
    
    <ScrollView> 
      {/* Improved Transaction History Section */}
      <View style={styles.transactionHistoryContainer}>
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


  <Modal
    visible={selectedTransaction !== null}
    onRequestClose={() => setSelectedTransaction(null)}
    onDismiss={hideModal}
    style={styles.modalContainer1}
    contentContainerStyle={containerStyle}
  >
    {/* Display details from selectedTransaction */}
    <Text>Transaction ID: {selectedTransaction?.transactionId}</Text>
    <Text>Order ID: {selectedTransaction?.orderId}</Text>
    <Text>Date: {selectedTransaction?.date}</Text>
    <Text>Time: {selectedTransaction?.time}</Text>
    <Text>Source of Payment: {selectedTransaction?.source}</Text>

    {/* Add a button to close the modal */}
    <TouchableOpacity onPress={() => setSelectedTransaction(null)} style={styles.downloadButton}>
      <Text style={styles.buttonText}>Close</Text>
    </TouchableOpacity>
  </Modal>

        
      </View>
      </ScrollView>
    </PaperProvider>
  )
}

export default Paymentscreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  QR: {
    padding: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    size:10
  },
  QRText: {
    marginTop: 0,
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
    margin: 25,
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
    // boxShadow doesn't work in React Native, you can use elevation for shadow
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
  transactionHistoryContainer: {
    marginTop: 28,
    padding: 15,
  },
  transactionHistoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  transactionCard: {
    marginBottom: 10,
    borderRadius: 25,
    elevation: 20,
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
    marginTop: 12,
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
    
    borderRadius: 18,
    marginVertical: 15,
    marginRight:5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  upiIdText: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  logo: {
    height: 40, // Adjust the height as needed
    width: '100%', // Make it take the full width
    marginBottom: 10, // Adjust margin as needed
  },
  modalContainer1: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    margin:50,
    height:300,
    marginBottom:50,
    alignItems:'center'
  },

});
  
  
