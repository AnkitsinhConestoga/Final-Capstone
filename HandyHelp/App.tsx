/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
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


const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer><View style={styles.container}>
    <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{
            headerShown: false
          }}>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          
          
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="TextViewerScreen" component={TextViewerScreen} />
        
      </Stack.Navigator>
  </View></NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#000',
  }
});
export default App;
