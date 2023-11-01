import React from 'react';
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/Colors';
import { Pressable } from 'react-native';




const BackView: React.FC<{ text: string, title?: string, rightTitle?: string, btnClick: () => void }> = ({ text, title, rightTitle, btnClick }) => {
  return <View style={{ flexDirection: 'row', alignContent: 'space-between', paddingTop: 5, paddingStart: 8, paddingEnd: 8 }}>

    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
      <Pressable onPress={btnClick}>
        <Icon style={{ padding: 5 }} name="left" size={24} color={Colors.blackIcon} />
      </Pressable>

      <Text style={{ paddingTop: 5,fontFamily: 'Poppins', }}>{text}</Text>
    </View>
    <View style={{ flex: 1 }}>
      {title && <Text style={{fontFamily: 'Poppins', fontSize: 18, fontWeight: 'bold', color: Colors.textColor41, textAlign: 'center' }}>{title.trim() == "" ? "" : title}</Text>}
    </View>
    {rightTitle && <Text style={{ fontFamily: 'Poppins',padding: 5 }}>{rightTitle}</Text>}
  </View>;
};

export default BackView;