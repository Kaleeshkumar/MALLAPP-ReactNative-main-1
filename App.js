
import AppNavigation from "./navigation/appnavigation";
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';


function App() {
  return (

    <PaperProvider >
      <AppNavigation />
     
    </PaperProvider>
  

  );
}

export default  App;
