import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import StyleView from "../utils/StylesView";
import StringKey from "../utils/StringsFile"
import BackView from "./BackButtonView";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from '../utils/types';
import CustomButton from "./CustomButton";

type ContactUsProp = {
    navigation : any
};

const ContactUsScreen:React.FC<ContactUsProp> = ({navigation}) =>{

    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('CA')
    const [callingCode, setCallingCode] = useState('1');
    const [visible, setVisible] = useState(false);

    const onSelect = (country: any) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setVisible(false);
    };

   
    

    return(
        <SafeAreaView style={StyleView.container}>
        <View style={StyleView.container}>
            <BackView
                text={StringKey.Back}
                title={StringKey.complain}
                btnClick={() => navigation.goBack()}
            />
              <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 'bold', color: Colors.textColor41, textAlign: 'center' }}>{StringKey.contact_handy}</Text>
              <Text style={{ fontFamily: 'Poppins',marginTop:15, fontSize: 18, fontWeight: 'bold', color: Colors.textColor41, textAlign: 'center' }}>{StringKey.address}</Text>
              <Text style={[StyleView.addressText,{marginTop:10}]}>{StringKey.handy_address}</Text>
              <Text style={{ fontFamily: 'Poppins',marginTop:15, fontSize: 18, fontWeight: 'bold', color: Colors.textColor41, textAlign: 'center' }}>{StringKey.send_message}</Text>
              <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} onChangeText={setName} placeholder={StringKey.name} placeholderTextColor={Colors.greyd0} ></TextInput>
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} onChangeText={setEmail} placeholderTextColor={Colors.greyd0} placeholder={StringKey.email} ></TextInput>
                </View>
                <View style={[StyleView.greyBorder, StyleView.rowContainer, { marginTop: '5%' }]}>
                    <CountryPicker
                        countryCode={countryCode}
                        withFilter={true}
                        withAlphaFilter={true}
                        withCallingCode={true}
                        onSelect={onSelect}
                        visible={visible}
                        onClose={() => setVisible(false)}
                    />
                    <View style={[StyleView.verticalLine,]} />
                    <Text style={StyleView.b8}>+{callingCode}</Text>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        onChangeText={setPhone}
                        value={phone} placeholderTextColor={Colors.greyd0}
                        placeholder={StringKey.your_number}
                        keyboardType="phone-pad"


                    />

                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput style={[StyleView.placeHolderStyle,{textAlignVertical: 'top'}]} multiline={true} numberOfLines={5}  placeholderTextColor={Colors.greyd0} placeholder={StringKey.contact_sub} ></TextInput>
                </View>
                <CustomButton text={StringKey.send_message} textTheme={StyleView.b2} btnTheme={[StyleView.B2, { marginTop: '5%' ,marginBottom:10}]} btnClick={() => { 
                    
                    
                }} ></CustomButton>
  
            </View>
            </SafeAreaView>
    );

    
};

export default ContactUsScreen;