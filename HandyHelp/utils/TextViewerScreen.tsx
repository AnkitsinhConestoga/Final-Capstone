import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StyleView from './StylesView';
import StringKey from './StringsFile';
import BackView from '../Views/BackButtonView';
import HTML from 'react-native-render-html';

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

const TextViewerScreen: React.FC<TextViewerScreenProps> = ({ route,navigation }) => {
  const { label, textContent } = route.params;
  const windowWidth = useWindowDimensions().width;


  return (
    <View style={StyleView.container}>
    <BackView text={StringKey.Back} title={label}  btnClick={() => navigation.goBack()} />
    
    <HTML contentWidth={windowWidth} source={{ html: textContent }} />
  </View>
  );
};





export default TextViewerScreen;
