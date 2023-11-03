import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/Colors';
import { View, Pressable, Text } from 'react-native';





const BackView: React.FC<{ text: string, title?: string, rightTitle?: string, btnClick: () => void }> = ({ text, title, rightTitle, btnClick }) => {
  return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 5, paddingStart: 8, paddingEnd: 8 }}>
  <View style={{ flex:1,flexDirection: 'row', alignItems: 'center' }}>
    <Pressable onPress={btnClick}>
      <Icon style={{ padding: 5 }} name="left" size={24} color={Colors.blackIcon} />
    </Pressable>
    <Text style={{  fontFamily: 'Poppins' }}>{text}</Text>
  </View>
  <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
    {title && <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 'bold', color: Colors.textColor41, textAlign: 'center' }}>{title.trim() == "" ? "" : title}</Text>}
  </View>
  <View style={{flex:1,alignItems:'flex-end'}}>
  {rightTitle && <Text style={{ fontFamily: 'Poppins', padding: 5 }}>{rightTitle}</Text>}
  </View>
</View>
;
};

export default BackView;