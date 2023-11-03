import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StyleView from './StylesView';
import StringKey from './StringsFile';
import BackView from '../Views/BackButtonView';
import { WebView } from 'react-native-webview';

type RootStackParamList = {
  MyScreen: undefined;
  TextViewerScreen: {
    label: string;
    textContent: string;
  };
};

type TextViewerScreenRouteProp = RouteProp<RootStackParamList, 'TextViewerScreen'>;

type TextViewerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TextViewerScreen'>;

type TextViewerScreenProps = {
  route: TextViewerScreenRouteProp;
  navigation: TextViewerScreenNavigationProp;
};




const TextViewerScreen: React.FC<TextViewerScreenProps> = ({ route, navigation }) => {
  const { label, textContent } = route.params;
  const isURL = /^(https?|ftp):\/\//.test(textContent);


  if ( isURL ) {
    return (
      <View style={StyleView.container}>
        <BackView text={StringKey.Back} title={label} btnClick={() => navigation.goBack()} />
        <WebView
          source={{ uri: textContent }}
          style={[StyleView.container, { alignSelf: 'center', width: "95%" }]}
        />
      </View>
    );

  } else {
    let finalHtml ='<html><head><meta charset="utf-8"><meta name="viewport" content="initial-scale=1, width=device-width"><link rel="stylesheet" href="./index.css" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap" /></head><body>' +  textContent  + '</body></html>';
    
    return (
      <View style={StyleView.container}>
        <BackView text={StringKey.Back} title={label} btnClick={() => navigation.goBack()} />
        <WebView
        
          source={{ html: finalHtml}}
          style={[StyleView.container, { alignSelf: 'center', width: "95%" }]}
        />
      </View>
    );
  }
};





export default TextViewerScreen;
