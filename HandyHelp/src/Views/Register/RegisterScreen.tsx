import { TextInput, Text, View, Appearance, ActivityIndicator } from 'react-native';
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
import Dialog from '../../utils/Dialog';
import { USER } from '../../Model/UserModel';
import auth from '@react-native-firebase/auth';
import FirebaseAuthManager from '../../utils/FirebaseAuthManager';
import PasswordInput from '../PasswordInput';
import { useFocusEffect } from '@react-navigation/native';
import FirebaseDatabaseManager from '../../utils/FirebaseDatabaseManager';
import { emailPattern } from '../../utils/Utils';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';



type MyComponentProps = {
    navigation: any;

};

const RegisterScreen: React.FC<MyComponentProps> = ({ navigation }) => {


    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const openDialog = () => {
        console.log("Dialog open");
        setIsDialogVisible(true);
    };

    useFocusEffect(() => {
        setIsLoadingVisible(false);
    });



    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = React.useState('');
    const [password, setPassword] = useState('');
    const [repassword, resetPassword] = useState('');
    const [errorMessage, seterrorMessage] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>('CA')
    const [callingCode, setCallingCode] = useState('1');
    const [visible, setVisible] = useState(false);
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);


    const onSelect = (country: any) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setVisible(false);
    };

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        await auth().signInWithCredential(googleCredential).then((user)=>{
            console.log("google sign in ",user);

        }).catch(error =>{
            console.log("Google signin error ",error.message);
        });
      }

    const submitSignUpForm = () => {
        console.log("button clicker");
        if (!name) {
            seterrorMessage(StringKey.error_name);
            openDialog();
            return;
        }
        const nameParts = name.split(' ');

        if (nameParts.length < 2) {
            seterrorMessage(StringKey.error_in_name);
            openDialog();
            return;
        }


        if (!email) {
            seterrorMessage(StringKey.error_email);
            openDialog();
            return;
        }
        
        if (!emailPattern.test(email)) {
            seterrorMessage(StringKey.error_email);
            openDialog();
            return;
        }
        if (!password) {
            seterrorMessage(StringKey.error_password);
            openDialog();
            return;
        }
        if (!repassword) {
            seterrorMessage(StringKey.error_re_password);
            openDialog();
            return;
        }

        if (password !== repassword) {
            seterrorMessage(StringKey.error_pwd);
            openDialog();
            return false;
        }

        // Check if the password contains at least one number
        if (!/\d/.test(password)) {
            seterrorMessage(StringKey.pwd_sub);
            openDialog();
            return false;
        }

        // Check if the password contains at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            seterrorMessage(StringKey.pwd_sub);
            openDialog();
            return false;
        }
        if (!phone || phone.length < 9 || phone.length > 12) {
            seterrorMessage(StringKey.error_Phone);
            openDialog();
            return;
        }

        if (!gender) {
            seterrorMessage(StringKey.error_Gender);
            openDialog();
            return;
        }

        if (!isChecked) {
            seterrorMessage(StringKey.error_tac);
            openDialog();
            return;
        }

        USER.updateName(name);
        USER.updateFirstName(name.split(" ")[0]);
        USER.updateLastName(name.split(" ")[1]);
        USER.updateEmail(email);
        USER.updateCountryCode(countryCode);
        USER.updateCallingCode(callingCode);
        USER.updatePhone(phone);
        USER.updateGender(gender);
        

        console.log(`number is +${USER.callingCode + USER.phone}`);
        FirebaseAuthManager.signUp(email, password).then(async (user) => {
            const loggedUser = FirebaseAuthManager.getCurrentUser();
           
            if(user){
                USER.updateUserId(user.uid);
                USER.updateLoginProvider(user.providerId);
                //    console.log(user.uid);
                const update = {
                    displayName: USER.name,

                };
                console.log("Logging user");
                await FirebaseAuthManager.getCurrentUser()?.updateProfile(update).then(() => {
                    FirebaseDatabaseManager.saveUserData(USER).then(()=>{
                        navigation.navigate('ProfileReg');
                    })
                });
                
            }


        })
            .catch(error => {
                if (error.code == 'auth/email-already-in-use') {
                    console.log(error.message);
                    seterrorMessage(StringKey.already_register);
                    openDialog();
                } else {
                    console.log(error.message);
                    seterrorMessage(error.message);
                    openDialog();
                }

            });
    }

    const closeDialog = () => {
        // Handle checkbox state change
        console.log(`Error shown: `);
        setIsDialogVisible(false);
    };

    const handleCheckboxChange = (checked: boolean) => {
        // Handle checkbox state change
        setIsChecked(checked);
    };



    return (
        <SafeAreaView style={StyleView.container}>
            <ScrollView>
                <View style={StyleView.container}>

                    <BackView text={StringKey.Back} btnClick={() => navigation.goBack()} />
                    {
                        (isLoadingVisible) ?

                            <View style={StyleView.preloader}>
                                <ActivityIndicator size="large" color={Colors.colorfb} />
                            </View>

                            : null
                    }
                    <View >
                        <Text style={[StyleView.t1, { alignSelf: "flex-start", marginStart: 10, marginTop: '5%', alignItems: 'center' }]}>{StringKey.SignUp_Heading}</Text>
                        <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
                            <TextInput style={StyleView.placeHolderStyle} onChangeText={setName} placeholder={StringKey.full_name} placeholderTextColor={Colors.greyd0} ></TextInput>
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
                        <View style={[{ marginTop: '5%' }]}>
                            <PasswordInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                placeholder={StringKey.enter_pwd}
                            />
                        </View>
                        <View style={[{ marginTop: '8%' }]}>
                            <PasswordInput
                                value={repassword}
                                onChangeText={(text) => resetPassword(text)}
                                placeholder={StringKey.conf_pwd}
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


                        <View style={[StyleView.centerElement,]}>
                            <CustomImageCheckbox

                                navigation={navigation}
                                checkedImage={require('../../assets/images/checked_circle.png')} // Provide the path to your checked image
                                uncheckedImage={require('../../assets/images/check_circle.png')} // Provide the path to your unchecked image
                                onChange={handleCheckboxChange}
                            />
                        </View>



                        <CustomButton text={StringKey.Sign_up} textTheme={StyleView.b1} btnTheme={[StyleView.B1, { marginTop: '5%' }]} btnClick={submitSignUpForm} ></CustomButton>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: '5%' }}><View style={StyleView.lineStyle} /><Text style={StyleView.b8}>{StringKey.or}</Text><View style={StyleView.lineStyle} />
                        </View>

                        <View style={{ flexDirection: "column" }} >
                            <SocialMediaButton socialMediaName={StringKey.singup_google} icon={require('../../assets/images/gmail.png')} onClick={onGoogleButtonPress} />
                            <SocialMediaButton socialMediaName={StringKey.singup_facebook} icon={require('../../assets/images/facebook.png')} onClick={() => {

                            }} />
                            <SocialMediaButton socialMediaName={StringKey.singup_apple} icon={require('../../assets/images/apple.png')} onClick={() => {

                            }} />

                        </View>

                        <Text style={[StyleView.t2, { marginTop: "8%" }]}>
                            <Text style={{ color: Colors.grey5a }}>{StringKey.have_Account}</Text>

                            <Text onPress={() => { navigation.navigate('Login'); }} style={{ color: Colors.colorfb, paddingStart: 5 }}>{StringKey.Sign_in}</Text>
                        </Text>

                    </View>

                </View>
                <Dialog
                    visible={isDialogVisible}
                    title={StringKey.error}
                    content={errorMessage}
                    onClose={closeDialog}
                />
            </ScrollView>
        </SafeAreaView>)

};




export default RegisterScreen;