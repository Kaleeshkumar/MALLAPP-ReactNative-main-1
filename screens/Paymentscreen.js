import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import AppHeader from '../components/Appheader';





export default function Paymentscreen({ navigation }) {
  //modal open
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'skyblue', padding: 10 };

  const axios = require('axios');

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
        username: 'YOUR_RAZORPAY_KEY_ID',
        password: 'YOUR_RAZORPAY_KEY_SECRET'
      }
    });

    return response.data.id;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
  }
};

const generatePaymentLink = async () => {
  const orderId = await createRazorpayOrder();
  if (orderId) {
    const paymentLink = `https://checkout.razorpay.com/v1/payment-links/${orderId}`;
    console.log('Payment Link:', paymentLink);
  }
};

generatePaymentLink();



  const qrCodeData = `upi://pay?pa=user@example.com&pn=Recipient&am=1&mc=123&tid=456&tr=789`;
  //razor user qr code
  const options = {
    description: 'Sample Payment',
    image: 'https://example.com/your-image.png',
    currency: 'INR',
    key: 'rzp_test_2h8n68Dp5BnsgZ',
    amount: '', // Amount in paise (5000 paise = INR 50)
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
          headerBg={"pink"}
          iconColor={"black"}
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

        <Modal visible={visible} onDismiss={hideModal} style={styles.container} contentContainerStyle={containerStyle}>
          <SafeAreaView style={styles.QR}>


            <QRCode
              value={qrCodeData}
              size={250}
            />
            <Text style={styles.QR}>Scan&pay using UPI app</Text>

          </SafeAreaView>
        </Modal>
      </Portal>
      <Button
        style={styles.button}
        mode="contained"
        onPress={showModal}
        labelStyle={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
      >
        SHOW THE QR CODE
      </Button>
    </PaperProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 40
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
    margin: 20,
    padding: 10,
    backgroundColor: 'skyblue',
    borderRadius: 40,
   
    
  },
})