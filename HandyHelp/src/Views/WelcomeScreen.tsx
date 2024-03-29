import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import StringKey from '../utils/StringsFile';
import StyleView from '../utils/StylesView';
import CustomButton from './CustomButton';
import { useFocusEffect } from '@react-navigation/native';
import FirebaseAuthManager from '../utils/FirebaseAuthManager';

type MyComponentProps = {
  navigation: any;
};

const WelcomeScreen: React.FC<MyComponentProps> = ({navigation}) => {


  useFocusEffect(()=>{
    if(FirebaseAuthManager.getCurrentUser()){
      navigation.navigate("HomeScreen");
    }
  }
  );

  return (
    <View style={StyleView.container}>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      <Image
        source={require('../assets/images/app_logo.png')}
        style={[StyleView.logo, {marginTop: 50}]}
      />
      <Text style={[StyleView.t1, {marginTop: 25, textAlign: 'center'}]}>
        {StringKey.welcome}
      </Text>
      <Text style={[StyleView.t2, {marginTop: 12, textAlign: 'center'}]}>
        {StringKey.welcomeScreenSubText1}
      </Text>
      <CustomButton
        text={StringKey.createAccount}
        textTheme={StyleView.b1}
        btnTheme={[StyleView.B1, {marginTop: '42%'}]}
        btnClick={() => {
          navigation.navigate('Register');
        }}
      />

      <CustomButton
        text={StringKey.Login}
        textTheme={StyleView.b2}
        btnTheme={[StyleView.B2, {marginTop: '5%'}]}
        btnClick={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default WelcomeScreen;
