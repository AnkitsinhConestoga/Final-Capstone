import { TextInput, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../utils/Colors';
import StyleView from '../../utils/StylesView';
import StringKey from '../../utils/StringsFile';
import BackView from '../BackButtonView';
import CustomButton from '../CustomButton';
import SocialMediaButton from '../SocialMediaButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import { Image } from 'react-native';
import CustomImageCheckbox from '../CustomImageCheckbox';


type MyComponentProps = {
    navigation: any;

};

const RegisterScreen: React.FC<MyComponentProps> = ({ navigation }) => {

    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handleCheckboxChange = (checked: boolean) => {
        // Handle checkbox state change
        console.log(`Checkbox checked: ${checked}`);
    };

    return (
        <View style={StyleView.container}>

            <BackView text={StringKey.Back} btnClick={() => navigation.goBack()} />
            <View >
                <Text style={[StyleView.t1, { alignSelf: "flex-start", marginStart: 10, marginTop: '10%', alignItems: 'center' }]}>{StringKey.SignUp_Heading}</Text>
                <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} placeholder={StringKey.name} ></TextInput>
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} placeholder={StringKey.email} ></TextInput>
                </View>

                <View style={StyleView.centerElement}>
                    <CustomImageCheckbox

                        navigation={navigation}
                        checkedImage={require('../../images/checked_circle.png')} // Provide the path to your checked image
                        uncheckedImage={require('../../images/check_circle.png')} // Provide the path to your unchecked image
                        onChange={handleCheckboxChange}
                    />
                </View>


                <CustomButton text={StringKey.Sign_up} textTheme={StyleView.b1} btnTheme={[StyleView.B1, { marginTop: '10%' }]} btnClick={() => { }} ></CustomButton>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: '5%' }}><View style={StyleView.lineStyle} /><Text style={StyleView.b8}>{StringKey.or}</Text><View style={StyleView.lineStyle} />
                </View>

                <View style={{ flexDirection: "column" }} >
                    <SocialMediaButton socialMediaName={StringKey.login_google} icon={require('../../images/gmail.png')} onClick={() => {

                    }} />
                    <SocialMediaButton socialMediaName={StringKey.login_google} icon={require('../../images/facebook.png')} onClick={() => {

                    }} />
                    <SocialMediaButton socialMediaName={StringKey.login_google} icon={require('../../images/apple.png')} onClick={() => {

                    }} />

                </View>

                <Text style={[StyleView.t2, { marginTop: "8%" }]}>
                    <Text style={{ color: Colors.grey5a }}>{StringKey.have_Account}</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Login'); }}>
                        <Text style={{ color: Colors.colorfb, paddingStart: 5 }}>{StringKey.Sign_in}</Text>
                    </TouchableOpacity>

                </Text>

            </View>

        </View>)

};




export default RegisterScreen;