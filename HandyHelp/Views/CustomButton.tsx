import React from 'react';
import { View, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/Colors';

const PressableButton : React.FC<{ text: string, textTheme?: any, btnTheme?: any, btnClick: () => void }> = ({text,textTheme,btnTheme,btnClick}) =>{

    return  <Pressable style={btnTheme} onPress={btnClick}>
          <Text style={textTheme}>{text}</Text>
        </Pressable>
   
};

export default PressableButton;

