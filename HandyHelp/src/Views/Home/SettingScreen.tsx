import React, { useState } from "react";
import { View, StatusBar, Image, Text, SafeAreaView, TouchableOpacity } from "react-native";
import StyleView from "../../utils/StylesView";
import CustomButton from "../CustomButton";
import StringKey from '../../utils/StringsFile';
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../utils/Colors";



type SettingScreenProps = {
    navigation: any;
};

const SettingScreen: React.FC<SettingScreenProps> = ({ navigation }) => {

    const [profileImage, setProfileImage] = useState(null);
    const selectImage = () => {
        const options = {
            title: 'Select Profile Picture',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    };
    return (
        <SafeAreaView style={StyleView.container}>
            <ScrollView>


                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                    <TouchableOpacity onPress={selectImage}>
                        <Image
                            source={
                                profileImage ||
                                require('../../assets/images/default-profile-image.png')
                            } // Provide a default profile image
                            style={StyleView.profileImage}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[StyleView.t1, { textAlign: 'center', marginTop: 10 }]}>Jaydeep Raval</Text>
                <Text style={[StyleView.t1, { textAlign: 'center', fontSize: 14, marginTop: 5 }]}>jp@gmail.com</Text>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('UpdateProfile');
                }}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10,marginTop:15}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/user_profile.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.update_profile}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/directory.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.prof_directory}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('UpdatePassword');
                }}> 
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/reset_password.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.change_pwd}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('ComplainScreen');
                }}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/complain_icon.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.complain}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('ContactUsScreen');
                }}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/contact_us.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.contact_us}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                     navigation.navigate("TextViewerScreen",{label:StringKey.has,textContent:StringKey.has_content});
                }}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/help_icon.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.has}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("TextViewerScreen",{label:StringKey.about_us,textContent:StringKey.about_us_content});
                }}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/info_icon.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.about_us}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("TextViewerScreen",{label:StringKey.pri_policy,textContent:StringKey.pri_policy_content});
                }}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/priv_icon.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.pri_policy}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("TextViewerScreen",{label:StringKey.delete_account,textContent:StringKey.delete_account_content,deleteButton:true,deleteBtnClick:() =>{}});
                }}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/delete_acc.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.delete_account}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('LogoutScreen');
                }}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle,{padding:8,marginStart:'5%',marginEnd:'5%',marginBottom:10}]}>
                    <Image style={{width:16,height:16,resizeMode:'contain'}} source={require('../../assets/images/logout_icon.png')}/>
                    <Text style={[StyleView.t4,{marginStart:10,color:Colors.textColor41}]}>{StringKey.logout}</Text>
                </View>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingScreen;