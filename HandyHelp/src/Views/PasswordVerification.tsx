import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import StyleView from "../utils/StylesView";
import StringKey from "../utils/StringsFile";
import BackView from "./BackButtonView";
import Colors from "../utils/Colors";
import CustomButton from "./CustomButton";
import OTPView from "../utils/OTPView";
import PasswordInput from "./PasswordInput";
import Dialog from "../utils/Dialog";
import FirebaseAuthManager from "../utils/FirebaseAuthManager";
import { USER } from "../Model/UserModel";


type PasswordVerificationProp = {
    navigation: any;
}

const PasswordVerification: React.FC<PasswordVerificationProp> = ({ navigation }) => {

    const [password, setPassword] = useState('');
    const [repassword, resetPassword] = useState('');
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


    const PwdVerify = () =>{

        if (password !== repassword) {
            seterrorMessage(StringKey.error_pwd);
            openDialog();
            return false;
          }
        
          // Check if the password contains at least one number
          if (!/\d/.test(password)) {
            seterrorMessage(StringKey.error_pwd);
            openDialog();
            return false;
          }
        
          // Check if the password contains at least one special character
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            seterrorMessage(StringKey.error_pwd);
            openDialog();
            return false;
          }

          FirebaseAuthManager.signIn(USER.email,password).then(reason =>{
            navigation.navigate('ProfileReg');
          }).catch(error =>{
            console.log(error.message);
            seterrorMessage(error.message);
            openDialog();
          });

        
    }

    return (
        <SafeAreaView style={StyleView.container}>
            <View style={StyleView.container}>

                <BackView text={StringKey.Back} btnClick={() => navigation.goBack()} />


                <Text style={[StyleView.t1, { alignSelf: "center", padding: 10, marginTop: "10%" }]}>{StringKey.set_pwd}</Text>
                <Text style={StyleView.t2}>{StringKey.set_ur_pwd}</Text>
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
                <Text style={[StyleView.t2, { marginTop: "3%" }]}>
                    {StringKey.pwd_sub}
                </Text>
                <View style={{flex:1}}/>
                <CustomButton text={StringKey.register} textTheme={StyleView.b1} btnTheme={[StyleView.B1, {marginBottom:"20%" }]} btnClick={PwdVerify} ></CustomButton>
            
            </View>
            <Dialog
                    visible={isDialogVisible}
                    title={StringKey.error}
                    content={errorMessage}
                    onClose={closeDialog}
                />
    
        </SafeAreaView>
    );

};

export default PasswordVerification;