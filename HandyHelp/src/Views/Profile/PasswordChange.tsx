import { SafeAreaView, View } from "react-native";
import StyleView from "../../utils/StylesView";
import StringKey from "../../utils/StringsFile";
import React, { useState } from "react";
import BackView from "../BackButtonView";
import PasswordInput from "../PasswordInput";
import CustomButton from "../CustomButton";

type PwdChangePrps = {
    navigation: any
};

const PwdChange: React.FC<PwdChangePrps> = ({ navigation }) => {

    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [cnfNewpassword, setCnfNewPassword] = useState('');

    return (
        <SafeAreaView style={StyleView.container}>
            <View style={StyleView.container}>
                <BackView
                    text={StringKey.Back}
                    title={StringKey.change_pwd}
                    btnClick={() => navigation.goBack()}
                />

                <View style={[{ marginTop: '5%' }]}>
                    <PasswordInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder={StringKey.old_pwd}
                    />
                </View>
                <View style={[{ marginTop: '8%' }]}>
                    <PasswordInput
                        value={newpassword}
                        onChangeText={(text) => setNewPassword(text)}
                        placeholder={StringKey.new_pwed}
                    />
                </View>
                <View style={[{ marginTop: '8%' }]}>
                    <PasswordInput
                        value={cnfNewpassword}
                        onChangeText={(text) => setCnfNewPassword(text)}
                        placeholder={StringKey.conf_pwd}
                    />
                </View>
                <CustomButton text={StringKey.save} textTheme={StyleView.b1} btnTheme={[StyleView.B1, { marginTop: 20 }]} btnClick={() => { }} ></CustomButton>

            </View>

        </SafeAreaView>
    );
};

export default PwdChange;