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


type ComplainProp = {
    navigation: any
}

const ComplainScreen: React.FC<ComplainProp> = ({ navigation }) => {

    const [topic, setTopic] = React.useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const openDialog = () => {
        console.log("Dialog open");
        setIsDialogVisible(true);
    };

    const closeDialog = () => {
        setIsDialogVisible(false);
    };

    return (
        <SafeAreaView style={StyleView.container}>
            <View style={StyleView.container}>
                <BackView
                    text={StringKey.Back}
                    title={StringKey.complain}
                    btnClick={() => navigation.goBack()}
                />
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <Picker
                        style={{ inputAndroid: { color: Colors.textColor41 } }}
                        onValueChange={setTopic}
                        items={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                            { label: 'Other', value: 'other' }
                        ]}


                        placeholder={{ label: StringKey.comp_placeholder, value: null }
                        }
                    />
                </View>

                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput style={[StyleView.placeHolderStyle, { textAlignVertical: 'top' }]} multiline={true} numberOfLines={5} placeholderTextColor={Colors.greyd0} placeholder={StringKey.comp_sub} ></TextInput>
                </View>
                <CustomButton text={StringKey.submit} textTheme={[StyleView.b1,]} btnTheme={[StyleView.B1, { marginTop: 20, }]} btnClick={openDialog } ></CustomButton>
                <Dialog
                    visible={isDialogVisible}
                    title={StringKey.send_successful}
                    content={StringKey.send_successful_content}
                    onClose={closeDialog}
                />
            </View>

        </SafeAreaView>
    );
}

export default ComplainScreen;