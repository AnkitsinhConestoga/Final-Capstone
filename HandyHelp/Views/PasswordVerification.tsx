import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import StyleView from "../utils/StylesView";
import StringKey from "../utils/StringsFile";
import BackView from "./BackButtonView";
import Colors from "../utils/Colors";
import CustomButton from "./CustomButton";
import OTPView from "../utils/OTPView";
import PasswordInput from "./PasswordInput";


type PasswordVerificationProp = {
    navigation: any;
}

const PasswordVerification: React.FC<PasswordVerificationProp> = ({ navigation }) => {

    const [password, setPassword] = useState('');
    const [repassword, resetPassword] = useState('');

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
                <CustomButton text={StringKey.register} textTheme={StyleView.b1} btnTheme={[StyleView.B1, {marginBottom:"20%" }]} btnClick={() => {navigation.navigate('ProfileReg'); }} ></CustomButton>
            
            </View>
    
        </SafeAreaView>
    );

};

export default PasswordVerification;