import React, { useState } from "react";
import { View, StatusBar, Image, Text, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import StyleView from "../../utils/StylesView";
import CustomButton from "../CustomButton";
import StringKey from '../../utils/StringsFile';
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../utils/Colors";
import BackView from "../BackButtonView";
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from '../../utils/types';
import Picker from "react-native-picker-select";



type UpdateProfileProps = {
    navigation: any;
};

const UpdateProfile: React.FC<UpdateProfileProps> = ({ navigation }) => {

    const [profileImage, setProfileImage] = useState(null);
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [phone, setPhone] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('CA')
    const [callingCode, setCallingCode] = useState('1');
    const [visible, setVisible] = useState(false);
    const [Street, setStreet] = React.useState('');
    const [City, setCity] = React.useState('');
    const [Postal, setPostal] = React.useState('');

    const onSelect = (country: any) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setVisible(false);
    };

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handleCheckboxChange = (checked: boolean) => {
        // Handle checkbox state change
        console.log(`Checkbox checked: ${checked}`);
    };

    const selectImage = () => {
        const options = {
            title: 'Select Profile Picture',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    };
    return (
        <SafeAreaView style={StyleView.container}>
             <BackView
                    text={StringKey.Back}
                    title={StringKey.update_profile}
                    btnClick={() => navigation.goBack()}
                />
            <ScrollView>
               

                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                    <TouchableOpacity onPress={selectImage}>
                        <Image
                            source={
                                profileImage ||
                                require('../../assets/images/default-profile-image.png')
                            } // Provide a default profile image
                            style={StyleView.profileImage}
                        />
                         <View style={StyleView.cameraIcon}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/images/camera-icon.png')}
              />
            </View>
                    </TouchableOpacity>
                </View>
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
                    <Picker
                        style={{ inputAndroid: { color: Colors.textColor41 } }}
                        onValueChange={setGender}
                        items={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                            { label: 'Other', value: 'other' }
                        ]}


                        placeholder={{ label: StringKey.gender, value: null }
                        }
                    />
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        onChangeText={setStreet}
                        placeholder={StringKey.street}
                        placeholderTextColor={Colors.greyd0}
                    />
                </View>

                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <Picker
                        style={{
                            chevron: { backgroundColor: Colors.black },
                            inputAndroid: { color: Colors.textColor41 },
                        }}
                        onValueChange={setCity}
                        items={[
                            { label: 'Toronto', value: 'Toronto' },
                            { label: 'Ottawa', value: 'Ottawa' },
                            { label: 'Mississauga', value: 'Mississauga' },
                            { label: 'Hamilton', value: 'Hamilton' },
                            { label: 'Brampton', value: 'Brampton' },
                            { label: 'London', value: 'London' },
                            { label: 'Markham', value: 'Markham' },
                            { label: 'Vaughan', value: 'Vaughan' },
                            { label: 'Windsor', value: 'Windsor' },
                            { label: 'Kitchener', value: 'Kitchener' },
                            { label: 'Barrie', value: 'Barrie' },
                            { label: 'Kingston', value: 'Kingston' },
                            { label: 'Guelph', value: 'Guelph' },
                            { label: 'Cambridge', value: 'Cambridge' },
                            { label: 'Waterloo', value: 'Waterloo' },
                            { label: 'St. Catharines', value: 'St. Catharines' },
                            { label: 'Niagara Falls', value: 'Niagara Falls' },
                            { label: 'Burlington', value: 'Burlington' },
                            { label: 'Oakville', value: 'Oakville' },
                            { label: 'Richmond Hill', value: 'Richmond Hill' },
                        ]}
                        placeholder={{ label: StringKey.City, value: null }}
                    />
                </View>

                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        onChangeText={setPostal}
                        placeholder={StringKey.Postal_code}
                        placeholderTextColor={Colors.greyd0}
                    />
                </View>
                <CustomButton text={StringKey.update} textTheme={StyleView.b2} btnTheme={[StyleView.B2, { marginTop: '5%' ,marginBottom:10}]} btnClick={() => { 
                    
                    
                }} ></CustomButton>
                       

            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdateProfile;
