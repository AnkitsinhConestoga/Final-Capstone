import { Button, Pressable, TextInput, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../utils/Colors';
import StyleView from '../../utils/StylesView';
import StringKey from '../../utils/StringsFile';
import BackView from '../BackButtonView';
import CustomButton from '../CustomButton';
import PasswordInput from '../PasswordInput';
import SocialMediaButton from '../SocialMediaButton';
import { TouchableOpacity } from 'react-native-gesture-handler';


type MyComponentProps = {
    navigation: any;

};

const LoginScreen: React.FC<MyComponentProps> = ({ navigation }) => {

    const [password, setPassword] = useState('');

    return (
        <View style={StyleView.container}>

            <BackView text={StringKey.Back} btnClick={() => navigation.goBack()} />
            <View >
                <Text style={[StyleView.t1, { alignSelf: "flex-start", marginStart: 10, marginTop: '10%', alignItems: 'center' }]}>{StringKey.SignIn_Heading}</Text>
                <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} placeholderTextColor={Colors.greyd0} placeholder={StringKey.email_phone} ></TextInput>
                </View>
                <View style={[{ marginTop: '5%' }]}>
                    <PasswordInput 
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder={StringKey.enter_pwd}
                    />
                </View>
                <Text style={[StyleView.t3_sub, { textAlign: 'right', padding: '5%', }]} >{StringKey.forgotpwd}</Text>
                <CustomButton text={StringKey.Log_in} textTheme={StyleView.b1} btnTheme={[StyleView.B1, { marginTop: '10%' }]} btnClick={() => {navigation.navigate('PhoneVerification'); }} ></CustomButton>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: '5%' }}><View style={StyleView.lineStyle} /><Text style={StyleView.b8}>{StringKey.or}</Text><View style={StyleView.lineStyle} />
                </View>

                <View style={{ flexDirection: "column" }} >
                    <SocialMediaButton socialMediaName={StringKey.login_google} icon={require('../../assets/images/gmail.png')} onClick={() => {

                    }} />
                    <SocialMediaButton socialMediaName={StringKey.login_facebook} icon={require('../../assets/images/facebook.png')} onClick={() => {

                    }} />
                    <SocialMediaButton socialMediaName={StringKey.login_apple} icon={require('../../assets/images/apple.png')} onClick={() => {

                    }} />

                </View>

                <Text style={[StyleView.t2, { marginTop: "8%" }]}>
                    <Text style={{ color: Colors.grey5a }}>{StringKey.dont_account}</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Register');}}>
                        <Text style={{ color: Colors.colorfb, paddingStart: 5 }}>{StringKey.Sign_up}</Text>
                    </TouchableOpacity>
                </Text>

            </View>

        </View>)

};




export default LoginScreen;