import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import StyleView from "../utils/StylesView";
import StringKey from "../utils/StringsFile"
import BackView from "./BackButtonView";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from '../utils/types';
import CustomButton from "./CustomButton";
import Dialog from "../utils/Dialog";
import FirebaseDatabaseManager from "../utils/FirebaseDatabaseManager";
import ContactModel from "../Model/ContactModel";

type ContactUsProp = {
    navigation : any
};

const ContactUsScreen:React.FC<ContactUsProp> = ({navigation}) =>{

    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [errorMessage, seterrorMessage] = React.useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('CA')
    const [callingCode, setCallingCode] = useState('1');
    const [visible, setVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    

    const onSelect = (country: any) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setVisible(false);
    };

    const closeDialog = () => {
        // Handle checkbox state change
        console.log(`Error shown: `);
        setIsDialogVisible(false);
    };
    const openDialog = () => {
        console.log("Dialog open");
       
        setIsDialogVisible(true);
    };

    const submitContactRequest = async () =>{
        if (!name) {
           seterrorMessage(StringKey.error_name);
            openDialog();
            return;
        }
        if (!email) {
            seterrorMessage(StringKey.error_email);
            openDialog();
            return;
        }
        if (!phone) {
            seterrorMessage(StringKey.error_Phone);
            openDialog();
            return;
        }

        if (!desc) {
            seterrorMessage(StringKey.error_po_desc);
            openDialog();
            return;
        }

        // const contactID = FirebaseDatabaseManager.generateCId();
        const conctReq: ContactModel = {
            name: name,
            email: email,
            phone: phone,
            contactDesc: desc
        };
        await FirebaseDatabaseManager.saveContactData( conctReq).then(() => {
            ;
            console.log("data updated");
            
            seterrorMessage(StringKey.contact_us_upload);
            resetValue();
            openDialog();

        })
    }
   
    const resetValue = () => {
       setName('');
       setEmail('');
       setPhone('');
       setDesc('');


    }
    

    return(
        <SafeAreaView style={StyleView.container}>
        <View style={StyleView.container}>
            <BackView
                text={StringKey.Back}
                title={StringKey.contact_us}
                btnClick={() => navigation.goBack()}
            />
              <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 'bold', color: Colors.textColor41, textAlign: 'center' }}>{StringKey.contact_handy}</Text>
              <Text style={{ fontFamily: 'Poppins',marginTop:15, fontSize: 18, fontWeight: 'bold', color: Colors.textColor41, textAlign: 'center' }}>{StringKey.address}</Text>
              <Text style={[StyleView.addressText,{marginTop:10}]}>{StringKey.handy_address}</Text>
              <Text style={{ fontFamily: 'Poppins',marginTop:15, fontSize: 18, fontWeight: 'bold', color: Colors.textColor41, textAlign: 'center' }}>{StringKey.send_message}</Text>
              <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} onChangeText={setName} value={name} placeholder={StringKey.name} placeholderTextColor={Colors.greyd0} ></TextInput>
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} onChangeText={setEmail} value={email} placeholderTextColor={Colors.greyd0} placeholder={StringKey.email} ></TextInput>
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
                    <TextInput style={[StyleView.placeHolderStyle,{textAlignVertical: 'top'}]} onChangeText={setDesc} value={desc} multiline={true} numberOfLines={5}  placeholderTextColor={Colors.greyd0} placeholder={StringKey.contact_sub} ></TextInput>
                </View>
                <CustomButton text={StringKey.send_message} textTheme={StyleView.b2} btnTheme={[StyleView.B2, { marginTop: '5%' ,marginBottom:10}]} btnClick={() => { 

                    submitContactRequest();
                    
                }} ></CustomButton>
  
            </View>
            <Dialog
                    visible={isDialogVisible}
                    title={StringKey.success}
                    content={errorMessage}
                    onClose={closeDialog}
                />
            </SafeAreaView>
    );

    
};

export default ContactUsScreen;