import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import StyleView from "../utils/StylesView";
import StringKey from "../utils/StringsFile";
import BackView from "./BackButtonView";
import Colors from "../utils/Colors";
import CustomButton from "./CustomButton";
import OTPView from "../utils/OTPView";
import FirebaseAuthManager from "../utils/FirebaseAuthManager";
import Dialog from "../utils/Dialog";
import { USER } from "../Model/UserModel";


type PhoneVerificationProp = {
    route: any;
    navigation: any;
}

const PhoneVerification: React.FC<PhoneVerificationProp> = ({ route, navigation }) => {

    const [verificationCode, setVerificationCode] = useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [errorMessage, seterrorMessage] = React.useState('');

    const openDialog = () => {
        console.log("Dialog open");
        setIsDialogVisible(true);
    };

    const closeDialog = () => {
        // Handle checkbox state change
        console.log(`Error shown: `);
        setIsDialogVisible(false);
    };


    const [otpValue, setOTPValue] = useState('');

    const handleOTPChange = (otp: string) => {
        setOTPValue(otp);
    };

    const resendOtp = () => {
        Alert.alert(StringKey.message, StringKey.code_Sent, [

            { text: StringKey.ok, onPress: () => console.log('OK Pressed') },
        ]);
    }

    const verifyOtp = () => {

        if (!otpValue) {
            seterrorMessage(StringKey.error_otp);
            openDialog();
            return;
        }

        const { confirmation } = route.params;
        FirebaseAuthManager.confirmVerificationCode(confirmation, otpValue).then(authenticatedUser => {
            console.log(authenticatedUser);
            if(authenticatedUser){
                USER.updateUserId(authenticatedUser?.uid);
            navigation.navigate('PasswordVerification'); 
            }else{
                // console.log(error.message);
                seterrorMessage(StringKey.error_otp);
                openDialog();
            }
            
        })
            .catch(error => {
                console.log(error.message);
                seterrorMessage(error.message);
                openDialog();
            });
    }



    return (
        <SafeAreaView style={StyleView.container}>
            <View style={StyleView.container}>

                <BackView text={StringKey.Back} btnClick={() => navigation.goBack()} />


                <Text style={[StyleView.t1, { alignSelf: "center", padding: 10, marginTop: "10%" }]}>{StringKey.phone_verification}</Text>
                <Text style={StyleView.t2}>{StringKey.verification_sub}</Text>
                <OTPView onOTPChange={handleOTPChange} />
                <Text style={[StyleView.t2, { marginTop: "8%" }]}>
                    <Text style={{ color: Colors.grey5a }}>{StringKey.dont_get_otp}</Text>

                    <Text onPress={resendOtp} style={{ color: Colors.colorfb, paddingStart: 5 }}>{StringKey.resend}</Text>
                </Text>

            </View>
            <CustomButton text={StringKey.verify} textTheme={StyleView.b1} btnTheme={[StyleView.B1, { marginBottom: "20%" }]} btnClick={verifyOtp} ></CustomButton>
            <Dialog
                    visible={isDialogVisible}
                    title={StringKey.error}
                    content={errorMessage}
                    onClose={closeDialog}
                />
        </SafeAreaView>
    );

};

export default PhoneVerification;