import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StyleView from './StylesView';
import StringKey from './StringsFile';
import BackView from '../Views/BackButtonView';

type RootStackParamList = {
  MyScreen: undefined;
  TextViewerScreen: { label: string; textContent: string; navigation: any };
};

type TextViewerScreenScreenRouteProp = RouteProp<RootStackParamList, 'TextViewerScreen'>;

type TextViewerScreenScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TextViewerScreen'>;

type Props = {
  route: TextViewerScreenScreenRouteProp;
  navigation: TextViewerScreenScreenNavigationProp;
};

const TextViewerScreen: React.FC<Props> = () => {
  const route = useRoute<TextViewerScreenScreenRouteProp>();

  const { label, textContent,navigation } = route.params;

  return (
    <View style={StyleView.container}>
      <BackView text={StringKey.Back} title={StringKey.pri_policy} btnClick={() => navigation.goBack()} />
      <Text style={StyleView.t4}>{textContent}</Text>
      {/* Render your HTML content here */}
    </View>
  );
};




export default TextViewerScreen;
