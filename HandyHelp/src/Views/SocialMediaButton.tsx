import React from 'react';
import { Image,View, TouchableOpacity, Text } from 'react-native';
import StyleView from '../utils/StylesView';


interface SocialMediaButtonProps {
  socialMediaName: string;
  icon: any; // Icon name from your chosen icon library
  onClick: () => void;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({ socialMediaName, icon, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={[StyleView.greyBorder,{marginTop:"5%",flexDirection:"row",alignItems:"center",justifyContent:"center",padding:8}]}>
        <Image source={icon}   style={StyleView.iconStyle} />
        <Text style={StyleView.t4}>{socialMediaName}</Text>
      </View>
    </TouchableOpacity>
  );
};



export default SocialMediaButton;
