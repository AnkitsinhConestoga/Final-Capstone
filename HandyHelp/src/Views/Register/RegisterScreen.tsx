import { TextInput, Text, View, Appearance } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../utils/Colors';
import StyleView from '../../utils/StylesView';
import StringKey from '../../utils/StringsFile';
import BackView from '../BackButtonView';
import CustomButton from '../CustomButton';
import SocialMediaButton from '../SocialMediaButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import { Image } from 'react-native';
import CustomImageCheckbox from '../CustomImageCheckbox';
import Picker from 'react-native-picker-select';
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from '../../utils/types';
import { SafeAreaView } from 'react-native-safe-area-context';



type MyComponentProps = {
    navigation: any;

};

const RegisterScreen: React.FC<MyComponentProps> = ({ navigation }) => {


    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('CA')
    const [callingCode, setCallingCode] = useState('1');
    const [visible, setVisible] = useState(false);

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

    return (
        <SafeAreaView style={StyleView.container}>
            <ScrollView>
                <View style={StyleView.container}>

                    <BackView text={StringKey.Back} btnClick={() => navigation.goBack()} />
                    <View >
                        <Text style={[StyleView.t1, { alignSelf: "flex-start", marginStart: 10, marginTop: '5%', alignItems: 'center' }]}>{StringKey.SignUp_Heading}</Text>
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
                            style={{inputAndroid:{color:Colors.textColor41}}}
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


                        <View style={[StyleView.centerElement, ]}>
                            <CustomImageCheckbox

                                navigation={navigation}
                                checkedImage={require('../../assets/images/checked_circle.png')} // Provide the path to your checked image
                                uncheckedImage={require('../../assets/images/check_circle.png')} // Provide the path to your unchecked image
                                onChange={handleCheckboxChange}
                            />
                        </View>



                        <CustomButton text={StringKey.Sign_up} textTheme={StyleView.b1} btnTheme={[StyleView.B1, { marginTop: '5%' }]} btnClick={() => { navigation.navigate('PhoneVerification');}} ></CustomButton>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: '5%' }}><View style={StyleView.lineStyle} /><Text style={StyleView.b8}>{StringKey.or}</Text><View style={StyleView.lineStyle} />
                        </View>

                        <View style={{ flexDirection: "column" }} >
                            <SocialMediaButton socialMediaName={StringKey.singup_google} icon={require('../../assets/images/gmail.png')} onClick={() => {

                            }} />
                            <SocialMediaButton socialMediaName={StringKey.singup_facebook} icon={require('../../assets/images/facebook.png')} onClick={() => {

                            }} />
                            <SocialMediaButton socialMediaName={StringKey.singup_facebook} icon={require('../../assets/images/apple.png')} onClick={() => {

                            }} />

                        </View>

                        <Text style={[StyleView.t2, { marginTop: "8%" }]}>
                            <Text style={{ color: Colors.grey5a }}>{StringKey.have_Account}</Text>

                            <Text onPress={() => { navigation.navigate('Login'); }} style={{ color: Colors.colorfb, paddingStart: 5 }}>{StringKey.Sign_in}</Text>
                        </Text>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>)

};




export default RegisterScreen;