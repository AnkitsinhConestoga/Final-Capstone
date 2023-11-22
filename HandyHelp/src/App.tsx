/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import WelcomeScreen from './Views/WelcomeScreen';
import LoginScreen from './Views/Login/LoginScreen';
import StyleView from './utils/StylesView';
import RegisterScreen from './Views/Register/RegisterScreen';
import TextViewerScreen from './utils/TextViewerScreen';
import PhoneVerification from './Views/PhoneVerification';
import PasswordVerification from './Views/PasswordVerification';
import ProfileReg from './Views/RegisterProfile';
import HomeScreen from './Views/Home/HomeScreen';
import PostDetailScreen from './Views/PostDetails/PostDetailScreen';
import FullScreenImageViewer from './utils/FullScreenImageViewer';
import PostOfferItemView from './Views/PostDetails/PostOfferList';
import UpdateProfile from './Views/Profile/UpdateProfile';
import PwdChange from './Views/Profile/PasswordChange';
import LogoutScreen from './Views/Profile/LogoutScreen';
import ComplainScreen from './Views/ComplainScreen';
import ContactUsScreen from './Views/ContactusScreen';
import FirebaseAuthManager from './utils/FirebaseAuthManager';
import { USER } from './Model/UserModel';
import FirebaseDatabaseManager from './utils/FirebaseDatabaseManager';
import Colors from './utils/Colors';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';



const Stack = createStackNavigator();


const App = () => {

  const [user, setUser] = useState(null); // State to hold the user object
  const [isLoading, setLoading] = useState(true);
  GoogleSignin.configure({
    scopes:['https://www.googleapis.com/auth/user.gender.read']
  });



  useEffect(() => {
    
    // Listen for changes in user authentication state
    const unsubscribe = FirebaseAuthManager.onAuthStateChanged(async (user) => {

      if (user) {
        await FirebaseDatabaseManager.getUserData(user.uid);


        setUser(user);
      } // Update the user state
      setLoading(false);
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // Render a loading indicator or splash screen while the app is initializing
    return (
      <View style={StyleView.preloader}>
        <ActivityIndicator size="large" color={Colors.colorfb} />
      </View>
    );
  }

  let intialScreenName = (user) ? ((USER.profileUrl) ? "HomeScreen" : "ProfileReg") : 'WelcomeScreen';
  console.log("screen name ", intialScreenName);
  return (
    <NavigationContainer><View style={styles.container}>
      <Stack.Navigator initialRouteName={intialScreenName} screenOptions={{
        headerShown: false

      }}>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}


        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="TextViewerScreen" component={TextViewerScreen} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
        <Stack.Screen name="PasswordVerification" component={PasswordVerification} />
        <Stack.Screen name="ProfileReg" component={ProfileReg} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
        <Stack.Screen name="FullScreenImage" component={FullScreenImageViewer} />
        <Stack.Screen name="PostOfferScreen" component={PostOfferItemView} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="UpdatePassword" component={PwdChange} />
        <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
        <Stack.Screen name="ComplainScreen" component={ComplainScreen} />
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />

      </Stack.Navigator>
    </View></NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  }
});
export default App;
