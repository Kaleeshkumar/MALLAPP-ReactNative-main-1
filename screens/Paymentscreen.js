import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';



export default function Paymentscreen() {
  //modal open
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'skyblue', padding: 10  };

  
  //razor user qr code
 
  return (
    <PaperProvider>
      <Portal style={styles.container}>
        <Modal visible={visible} onDismiss={hideModal} style={styles.container}contentContainerStyle={containerStyle}>
          <SafeAreaView style={styles.QR}>
          
              <QRCode
                value="upi://pay?pa=recipient@example.com&pn=Recipient"
                size={250}
              />
            <Text style={styles.QR}>pay through this Qr.</Text>
            
          </SafeAreaView>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show the Qr code
      </Button>

    </PaperProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    

  },
  QR: {
    padding: 10,
    
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',


  }
})