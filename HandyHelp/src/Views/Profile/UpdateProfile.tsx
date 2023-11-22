import React, { useCallback, useState } from "react";
import { View, StatusBar, Image, Text, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import StyleView from "../../utils/StylesView";
import CustomButton from "../CustomButton";
import StringKey from '../../utils/StringsFile';
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../utils/Colors";
import BackView from "../BackButtonView";
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from '../../utils/types';
import Picker from "react-native-picker-select";

import FirebaseAuthManager from "../../utils/FirebaseAuthManager";
import FirebaseDatabaseManager from "../../utils/FirebaseDatabaseManager";
import BottomDialog from "../../utils/BottomDialog";
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";
import Dialog from "../../utils/Dialog";
import { emailPattern, postalPattern } from "../../utils/Utils";
import FirebaseStorageManager from "../../utils/FirebaseStorageManager";
import { USER } from "../../Model/UserModel";



type UpdateProfileProps = {
    navigation: any;
};

const UpdateProfile: React.FC<UpdateProfileProps> = ({ navigation }) => {

    const [profileImage, setProfileImage] = useState(USER.profileUrl || null || '');
    const [email, setEmail] = React.useState(USER.email || '');
    const [name, setName] = React.useState(USER.name || '');
    const [isChecked, setIsChecked] = useState(false);
    const [phone, setPhone] = React.useState(USER.phone || '');
    const [gender, setGender] = React.useState(USER.gender || '');
    const [countryCode, setCountryCode] = useState<CountryCode>('CA')
    const [callingCode, setCallingCode] = useState('1');
    const [visible, setVisible] = useState(false);
    const [Street, setStreet] = React.useState(USER.streetName || '');
    const [City, setCity] = React.useState(USER.cityName || '');
    const [Postal, setPostal] = React.useState(USER.postalCode || '');
    const [bottomDialogVisible, setBottomDialogVisible] = useState(false);
    const [isImageChanged, setImageChanged] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [errorMessage, seterrorMessage] = React.useState('');
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);
    const [dialogTitle,setDialogTitle] = useState(StringKey.error);

    const openDialog = () => {
        console.log("Dialog open");
        setIsDialogVisible(true);
    };
    const closeDialog = () => {
        // Handle checkbox state change
        console.log(`Error shown: `);
        setIsDialogVisible(false);
    };


    const onSelect = (country: any) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setVisible(false);
    };

    //To choose image
    const showBottomDialog = () => {
        setBottomDialogVisible(true);
    };

    const closeBottomDialog = () => {
        setBottomDialogVisible(false);
    };

    const OpenCamera = async () => {

        // Handle Option 1 Press
        closeBottomDialog();
        const options: ImageLibraryOptions = {
            selectionLimit: 1,
            mediaType: 'photo',
            quality: 0.6,
            includeBase64: false
        };

        await launchCamera(options, res => {
            if (res.didCancel) {
                console.log('User cancelled')
            } else if (res.errorCode) {
                console.log('ImagePickerError: ', res.errorMessage)
            } else {
                console.log("image", res);
                let imageUri = res.assets?.[0]?.uri;
                if (imageUri) {
                    setProfileImage(imageUri);
                    setImageChanged(true);

                }
            }
        });
    };

    const OpenImageLibrary = useCallback(async () => {
        closeBottomDialog();
        const options: ImageLibraryOptions = {
            selectionLimit: 1,
            mediaType: 'photo',
            quality: 0.6,
            includeBase64: false
        };

        await launchImageLibrary(options, res => {
            if (res.didCancel) {
                console.log('User cancelled')
            } else if (res.errorCode) {
                console.log('ImagePickerError: ', res.errorMessage)
            } else {
                console.log("image", res);
                let imageUri = res.assets?.[0]?.uri;
                if (imageUri) {
                    setProfileImage(imageUri);
                    setImageChanged(true);

                }

            }
        });
    }, []);

    return (
        <SafeAreaView style={StyleView.container}>
            <BackView
                text={StringKey.Back}
                title={StringKey.update_profile}
                btnClick={() => navigation.goBack()}
            />
            <ScrollView>
                {
                    (isLoadingVisible) ?

                        <View style={StyleView.preloader}>
                            <ActivityIndicator size="large" color={Colors.colorfb} />
                        </View>

                        : null
                }

                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                    <TouchableOpacity onPress={showBottomDialog}>
                        <Image
                            source={
                                profileImage ? { uri: profileImage } :
                                    require('../../assets/images/default-profile-image.png')
                            } // Provide a default profile image
                            style={StyleView.profileImage}
                        />
                        <View style={StyleView.cameraIcon}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../../assets/images/camera-icon.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} onChangeText={setName} placeholder={StringKey.name} placeholderTextColor={Colors.greyd0} >{USER.name}</TextInput>
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} onChangeText={setEmail} editable={false} placeholderTextColor={Colors.greyd0} placeholder={StringKey.email} >{USER.email}</TextInput>
                </View>
                <View style={[StyleView.greyBorder, StyleView.rowContainer, { marginTop: '5%' }]} aria-disabled={true}>
                    <CountryPicker
                        countryCode={countryCode}
                        withFilter={true}
                        withAlphaFilter={true}
                        withCallingCode={true}
                        visible={false}

                    />
                    <View style={[StyleView.verticalLine,]} />
                    <Text style={StyleView.b8}>+{callingCode}</Text>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        onChangeText={setPhone}
                        editable={false}
                        value={phone} placeholderTextColor={Colors.greyd0}
                        placeholder={StringKey.your_number}
                        keyboardType="phone-pad"


                    ></TextInput>

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
                        value={USER.gender}
                        placeholder={{ label: StringKey.gender, value: null }
                        }
                    />
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        onChangeText={setStreet}
                        value={Street}
                        placeholder={StringKey.street}
                        placeholderTextColor={Colors.greyd0}
                    />
                </View>

                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <Picker
                        value={City}
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
                        value={Postal}
                        placeholder={StringKey.Postal_code}
                        placeholderTextColor={Colors.greyd0}
                    />
                </View>
                <CustomButton text={StringKey.update} textTheme={StyleView.b2} btnTheme={[StyleView.B2, { marginTop: '5%', marginBottom: 10 }]} btnClick={async () => {
                    const loggedUser = FirebaseAuthManager.getCurrentUser();
                    if (loggedUser) {   
                        console.log("current user data ", USER);
    
                        if (!name) {
                            seterrorMessage(StringKey.error_name);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }
                        const nameParts = name.split(' ');

                        if (nameParts.length < 2) {
                            seterrorMessage(StringKey.error_in_name);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }


                        if (!email) {
                            seterrorMessage(StringKey.error_email);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }

                        if (!emailPattern.test(email)) {
                            seterrorMessage(StringKey.error_email);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }



                        if (!phone || phone.length < 9 || phone.length > 12) {
                            seterrorMessage(StringKey.error_Phone);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }

                        if (!gender) {
                            seterrorMessage(StringKey.error_Gender);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }

                        if (!Street) {
                            seterrorMessage(StringKey.error_street);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }
                        if (!City) {
                            seterrorMessage(StringKey.error_city);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }

                        if (!Postal) {
                            seterrorMessage(StringKey.empty_postal);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }

                        if (!postalPattern.test(Postal.replaceAll(" ", "").toLocaleLowerCase())) {
                            seterrorMessage(StringKey.error_posta);
                            setDialogTitle(StringKey.error);
                            openDialog();
                            return;
                        }
                        

                        USER.updateName(name.toString());
                        USER.updateFirstName(name.toString().split(" ")[0]);
                        USER.updateLastName(name.toString().split(" ")[1]);
                        // USER.email = email;
                        // USER.countryCode = countryCode;
                        // USER.callingCode = callingCode;
                        // USER.phone = phone;
                        USER.updateGender(gender);
                        USER.updateStreetName(Street);
                        USER.updateCityName(City);
                        USER.updatePostalCode(Postal);


                        if (isImageChanged) {
                            setIsLoadingVisible(true);
                            await FirebaseStorageManager.saveUserData(profileImage, USER.userId);
                       

                            await FirebaseDatabaseManager.saveUserData(USER);
                            setIsLoadingVisible(false);
                            seterrorMessage(StringKey.success);
                            setDialogTitle(StringKey.update_success);
                            openDialog();
                        } else {
                            await FirebaseDatabaseManager.saveUserData(USER);
                            seterrorMessage(StringKey.success);
                            setDialogTitle(StringKey.update_success);
                            openDialog();
                        }

                    }

                }} ></CustomButton>
                <Dialog
                    visible={isDialogVisible}
                    title={dialogTitle}
                    content={errorMessage}
                    onClose={closeDialog}
                />
                <BottomDialog
                    visible={bottomDialogVisible}
                    onClose={closeBottomDialog}
                    onOption1Press={OpenCamera}
                    onOption2Press={OpenImageLibrary}
                />

            </ScrollView>
        </SafeAreaView>
    );
};

export default UpdateProfile;
