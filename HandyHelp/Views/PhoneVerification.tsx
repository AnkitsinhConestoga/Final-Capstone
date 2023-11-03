import React from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import StyleView from "../utils/StylesView";
import StringKey from "../utils/StringsFile";
import BackView from "./BackButtonView";
import Colors from "../utils/Colors";
import CustomButton from "./CustomButton";
import OTPView from "../utils/OTPView";


type PhoneVerificationProp = {
    navigation: any;
}

const PhoneVerification: React.FC<PhoneVerificationProp> = ({ navigation }) => {

    const resendOtp = () =>{
        Alert.alert(StringKey.message,StringKey.code_Sent, [
            
            {text: StringKey.ok, onPress: () => console.log('OK Pressed')},
          ]);
    }

    return (
        <SafeAreaView style={StyleView.container}>
            <View style={StyleView.container}>

                <BackView text={StringKey.Back} btnClick={() => navigation.goBack()} />


                <Text style={[StyleView.t1, { alignSelf: "center", padding: 10, marginTop: "10%" }]}>{StringKey.phone_verification}</Text>
                <Text style={StyleView.t2}>{StringKey.verification_sub}</Text>
                <OTPView/>
                <Text style={[StyleView.t2, { marginTop: "8%" }]}>
                    <Text style={{ color: Colors.grey5a }}>{StringKey.dont_get_otp}</Text>

                    <Text onPress={resendOtp } style={{ color: Colors.colorfb, paddingStart: 5 }}>{StringKey.resend}</Text>
                </Text>
                
            </View>
            <CustomButton text={StringKey.verify} textTheme={StyleView.b1} btnTheme={[StyleView.B1, {marginBottom:"20%" }]} btnClick={() => {navigation.navigate('PasswordVerification'); }} ></CustomButton>
                
        </SafeAreaView>
    );

};

export default PhoneVerification;