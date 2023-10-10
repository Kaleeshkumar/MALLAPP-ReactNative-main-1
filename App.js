
import AppNavigation from "./navigation/appnavigation";
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homescreen from "./screens/Homescreen";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Homescreen} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
    </NavigationContainer>
  );
}


function App() {
  return (

    <PaperProvider >
    
      <AppNavigation />
    
    </PaperProvider>
  

  );
}

export default  App;
