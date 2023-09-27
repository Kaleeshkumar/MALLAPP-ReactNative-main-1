import AppNavigation from "./navigation/appnavigation";
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (

    <PaperProvider >
      <AppNavigation />
     
    </PaperProvider>

  );
}


