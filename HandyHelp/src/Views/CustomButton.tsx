import React from 'react';
import { View, Text, Pressable } from 'react-native'


const PressableButton : React.FC<{ text: string, textTheme?: any, btnTheme?: any, btnClick: () => void }> = ({text,textTheme,btnTheme,btnClick}) =>{

    return  <Pressable style={btnTheme} onPress={(btnClick)}>
          <Text onPress={btnClick} style={textTheme}>{text}</Text>
        </Pressable>
   
};

export default PressableButton;

