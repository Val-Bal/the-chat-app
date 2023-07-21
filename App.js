//import start and chat screen
import Start from "./components/Start";
import Chat from "./components/Chat";

//import react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//create the navigator
const Stack = createNativeStackNavigator();

//import firestore via firebase
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA2rDOCKbvLvTCJlKllg6UgCbW4_klrYxQ",
    authDomain: "thechatapp-6cb8c.firebaseapp.com",
    projectId: "thechatapp-6cb8c",
    storageBucket: "thechatapp-6cb8c.appspot.com",
    messagingSenderId: "704104468306",
    appId: "1:704104468306:web:5f6e77f73962af2b4ff48b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // define new state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  // useEffect() that will display alert pop-up if connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen 
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
           {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;