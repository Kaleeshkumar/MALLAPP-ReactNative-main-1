import { Text, View, StyleSheet, TouchableOpacity, COLORS ,ScrollView} from 'react-native'
import React from 'react'
import { Modal, Portal, Button, PaperProvider, Card,TextInput,enteredAmount } from 'react-native-paper';
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
      return response.data.id; // Assuming the response contains the order ID
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      return null;
    }
  };

   // Function to generate payment link
   const generatePaymentLink = async () => {
    const orderId = await createRazorpayOrder();
    if (orderId) {
      const paymentLink = `https://checkout.razorpay.com/v1/payment-links/${orderId}`;
      console.log('Payment Link:', paymentLink);
      return paymentLink;
    }
    return null;
  };

  const [enteredAmount, setEnteredAmount] = useState('');

  const handleAmountChange = (text) => {
    setEnteredAmount(text);
  };

  
  // Function to handle the "Create Order" button press
  const handleCreateOrder = async () => {
    try {
      const orderId = await createRazorpayOrder();
      if (orderId) {
        const qrCodeData = `upi://pay?pa=your_live_id@upi&pn=Recipient&mc=your_merchant_code&tid=${orderId}&tr=your_reference_id&tn=Transaction%20Note&mc=your_merchant_code`;
  
        showModal(); // Show the modal
        const newTransaction={
          orderId: orderId,
          amount: enteredAmount,
          status: 'Pending',
        };

        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
        // Do something with the payment link if needed
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
  // Assuming you have the payment data ready
  const paymentData = {
    razorpay_payment_id: 'PAYMENT_ID',
    razorpay_order_id: 'ORDER_ID',
    razorpay_signature: 'SIGNATURE',
  };
  // Call the function with the payment data
  const qrCodeData = `upi://pay?pa=your_live_id@upi&pn=Recipient&mc=your_merchant_code&tid=your_transaction_id&tr=your_reference_id&tn=Transaction%20Note&mc=your_merchant_code`;
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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={30}
                color='white'
              />
            </TouchableOpacity>
          </SafeAreaView>
          <SafeAreaView style={styles.QR}>
            {/* Display User ID */}

            {/* QR Code */}
            <QRCode value={qrCodeData} size={250} />
            <Text style={styles.QRText}>Scan & pay using UPI app</Text>
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
      <ScrollView>
        <SafeAreaView>
          
        {transactions.map((transaction, index) => (
          <Card key={index} style={styles.transactionCard}>
            
            <Card.Content>
              <Text style={styles.cardText}>Order ID: {transaction.orderId}</Text>
              <Text style={styles.cardText}>Amount: ₹{transaction.amount}</Text>
              <Text style={styles.cardText}>Status: {transaction.status}</Text>
            </Card.Content>
          </Card>
        ))}
        </SafeAreaView>
      </ScrollView>
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
    padding: 40,
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

  
  
})