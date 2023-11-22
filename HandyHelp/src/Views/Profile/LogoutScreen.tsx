import { SafeAreaView } from "react-native-safe-area-context";
import StyleView from "../../utils/StylesView";
import StringKey from "../../utils/StringsFile";
import React, { useState } from "react";
import { Image, TextInput, View } from "react-native";
import BackView from "../BackButtonView";
import Colors from "../../utils/Colors";
import CustomButton from "../CustomButton";
import { USER } from "../../Model/UserModel";
import FirebaseAuthManager from "../../utils/FirebaseAuthManager";

type LogoutProps = {
    navigation: any
};

const LogoutScreen: React.FC<LogoutProps> = ({ navigation }) => {
    const [profileImage, setProfileImage] = useState(null);
    return (
        <SafeAreaView style={StyleView.container}>
            <BackView
                text={StringKey.Back}
                title={StringKey.logout}
                btnClick={() => navigation.goBack()}
            />



            <View style={{ alignItems: 'center', marginTop: '10%' }}>

                <Image
                    source={
                        profileImage ||
                        require('../../assets/images/default-profile-image.png')
                    } // Provide a default profile image
                    style={StyleView.profileImage}
                />
            </View>
            <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} editable={false} placeholderTextColor={Colors.greyd0} placeholder={StringKey.email} >{USER.email}</TextInput>
                </View>

                <CustomButton text={StringKey.logout} textTheme={StyleView.b2} btnTheme={[StyleView.B2, { marginTop: 20 ,marginBottom:10}]} btnClick={() => { 
                    FirebaseAuthManager.signOut().then(()=>{
                        USER.resetUser();
                        navigation.replace('WelcomeScreen');

                    }).catch(error=>{
                        console.log("Log out error is ",error);
                    });
                }} ></CustomButton>
                

        </SafeAreaView>
    );
};

export default LogoutScreen;