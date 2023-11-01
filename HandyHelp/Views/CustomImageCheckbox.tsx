import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import StyleView from '../utils/StylesView';
import StringKey from '../utils/StringsFile';
import Colors from '../utils/Colors';


interface CustomImageCheckboxProps {

    checkedImage: any;
    uncheckedImage: any;
    navigation: any,
    onChange: (checked: boolean) => void;
}

const CustomImageCheckbox: React.FC<CustomImageCheckboxProps> = ({ checkedImage, uncheckedImage, navigation, onChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onChange(newCheckedState);
    };

    return (

        <View style={StyleView.rowContainer}>
            <TouchableOpacity onPress={toggleCheckbox}>
                <Image source={isChecked ? checkedImage : uncheckedImage} style={StyleView.iconStyle} />
            </TouchableOpacity>
            <Text style={StyleView.b8}>
                <Text style={StyleView.b8}>{StringKey.term_start_Text}</Text>
                <TouchableOpacity onPress={()=>{}}><Text style={{color:Colors.colorfb}}>{StringKey.tos+' '} </Text></TouchableOpacity>
                
                <Text style={StyleView.b8}>{StringKey.and}</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate("TextViewerScreen",{label:StringKey.pri_policy,textContent:StringKey.pri_policy_content});}}><Text style={{color:Colors.colorfb}}>{" "+StringKey.pri_policy+"."}</Text></TouchableOpacity>
                
            </Text>
        </View>

    );
};



export default CustomImageCheckbox;
