import { SafeAreaView, TextInput } from "react-native"
import StyleView from "../utils/StylesView"
import StringKey from "../utils/StringsFile"
import React, { useState } from "react"
import { View } from "react-native"
import BackView from "./BackButtonView"
import Picker from 'react-native-picker-select';
import Colors from "../utils/Colors"
import CustomButton from "./CustomButton"
import Dialog from "../utils/Dialog"
import ComplainModel from "../Model/ComplainModel"
import FirebaseDatabaseManager from "../utils/FirebaseDatabaseManager"
import { USER } from "../Model/UserModel"


type ComplainProp = {
    navigation: any
}

const ComplainScreen: React.FC<ComplainProp> = ({ navigation }) => {

    const [topic, setTopic] = React.useState('');
    const [topicdesc, setTopicdesc] = React.useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [errorMessage, seterrorMessage] = React.useState('');

    const openDialog = () => {
        console.log("Dialog open");
        setIsDialogVisible(true);
    };

    const closeDialog = () => {
        setIsDialogVisible(false);
    };


    const submitComplain = async () =>{
        if (!topic) {
            seterrorMessage(StringKey.error_Topic);
             openDialog();
             return;
         }
         if (!topicdesc) {
             seterrorMessage(StringKey.error_topic_desc);
             openDialog();
             return;
         }

         const compReq: ComplainModel = {
             name: USER.name,
             email: USER.email,
             userid: USER.userId,
             topic: topic,
             topicDesc: topicdesc
         };
        await FirebaseDatabaseManager.saveComplainData( compReq).then(() => {
            ;
            // console.log("data updated");
            
            seterrorMessage(StringKey.complain_created);
            resetValue();
            openDialog();

        })

    }

    const resetValue = () => {
        setTopic('');
        setTopicdesc('');
        
     }

    return (
        <SafeAreaView style={StyleView.container}>
            <View style={StyleView.container}>
                <BackView
                    text={StringKey.Back}
                    title={StringKey.complain}
                    btnClick={() => navigation.goBack()}
                />
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} onChangeText={setTopic} value={topic} placeholderTextColor={Colors.greyd0} placeholder={StringKey.subject} ></TextInput>

                </View>

                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput style={[StyleView.placeHolderStyle, { textAlignVertical: 'top' }]} onChangeText={setTopicdesc} value={topicdesc} multiline={true} numberOfLines={5} placeholderTextColor={Colors.greyd0} placeholder={StringKey.comp_sub} ></TextInput>
                </View>
                <CustomButton text={StringKey.submit} textTheme={[StyleView.b1,]} btnTheme={[StyleView.B1, { marginTop: 20, }]} btnClick={submitComplain} ></CustomButton>
                <Dialog
                    visible={isDialogVisible}
                    title={StringKey.send_successful}
                    content={errorMessage}
                    onClose={closeDialog}
                />
            </View>

        </SafeAreaView>
    );
}

export default ComplainScreen;