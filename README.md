# Chat App

## Project description
The Chat App is an app for mobile devices (Android and iOS) using React Native, Expo and Google Firestore. The app provides users with a chat interface and options to share images and their location.

## Key Features
- Users can enter a chat room.
- Users can send and reiceive text messages.
- Users can send and reiceive images.
- Users can send and reiceive geolocations.
- Messages can be read offline, allowing users to revisit conversations at any time.
- The chat app is compatible with screen readers, ensuring accessibility for users with visual impairments.

## Step-by-step guide to create a chat app using React Native
### Step 1: Set up the development environment
1. Install Node.js and npm Version 16.19.0. **nvm install 16.19.0**
2. Install Expo CLI globally. **npm install -g expo-cli**
3. Install the Expo Go App on your mobile phone
4. Create a Expo account and login in your terminal using **expo login**
5. Create a new Expo project. **npx create-expo-app <project name> --template**
6. Set up new repository in Github for your project and connect it to your local folder 
7. Download the Android Studio Emulator and set up a device 

### Step 2: Install required dependencies
8. Install Firebase and other required dependencies.

### Step 3: Set up Firebase
9.  Create a Firebase account and create a project.
10. Add a new web app to the Firebase project.
11. Copy the Firebase configuration and paste it in the `firebaseConfig` object in your project

### Step 4: Build the chat app
12. Create the necessary screens and components for the chat app.
13. Set up Firebase authentication for user login/sign-up.
14. Implement chat functionality using Firebase Realtime Database.

### Step 5: Test and run the app
15. Start the Expo development server. **npx expo start**
16. Use the Expo Go app on your Android or iOS device to test the app or run it in the Andorid Studio emulator.

## Technologies used
- JavaScript
- React Native
- Expo
- Google Firestore Database
- Google Firebase authentication
- Gifted Chat library
- Firebase Cloud Storage

## Project dependencies
- "@react-navigation/native": "^6.1.7",
- "@react-navigation/native-stack": "^6.9.13",
- "expo": "~48.0.18",
- "expo-status-bar": "~1.4.4",
- "firebase": "^9.13.0",
- "react": "18.2.0",
- "react-native": "0.71.8",
- "react-native-elements": "^3.4.3",
- "react-native-gifted-chat": "^2.4.0",
- "react-native-safe-area-context": "4.5.0",
- "react-native-screens": "~3.20.0",
- "expo-image-picker": "~14.1.1",
- "expo-location": "~15.1.1",
- "react-native-maps": "1.3.2"
- "react-native-safe-area-context": "4.5.0"
- "@react-native-async-storage/async-storage": "1.17.11",
- "@react-native-community/netinfo": "9.3.7"


  
   