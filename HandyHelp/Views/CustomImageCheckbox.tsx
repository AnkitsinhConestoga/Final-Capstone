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
     

            <Text style={[StyleView.b8,{width:'90%'}]}>
                <Text >{StringKey.term_start_Text}</Text>
                <Text onPress={()=>{navigation.navigate("TextViewerScreen",{label:StringKey.tos,textContent:StringKey.tos_content});}} style={[{color:Colors.colorfb, }]}>{StringKey.tos+' '} </Text>
                
                <Text >{StringKey.and}</Text>
                <Text onPress={()=>{navigation.navigate("TextViewerScreen",{label:StringKey.pri_policy,textContent:StringKey.pri_policy_content});}} style={[{color:Colors.colorfb, alignSelf: 'center' }]}>{" "+StringKey.pri_policy+"."}</Text>
                
            </Text>
        </View>

    );
};



export default CustomImageCheckbox;
