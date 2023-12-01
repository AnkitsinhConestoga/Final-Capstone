import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Image, TextInput, FlatList, Text } from "react-native";
import StyleView from "../utils/StylesView";
import BackView from "./BackButtonView";
import StringKey from "../utils/StringsFile";
import CustomButton from "./CustomButton";
import FirebaseDatabaseManager from "../utils/FirebaseDatabaseManager";
import { USER } from "../Model/UserModel";
import Colors from "../utils/Colors";


type ProfessionalProps = {
    navigation: any
};
const ProfessionalDirectory: React.FC<ProfessionalProps> = ({ navigation }) => {
    const [data, setData] = useState<any>([]);

    const isMounted = React.useRef(true);
    useEffect(() => {


        FirebaseDatabaseManager.getVerifiedPost().then(modelList => {
            if (isMounted.current) {
                setData(modelList);
            }

        });
        return () => {
            isMounted.current = false;
        };
    }, []);


    return (
        <SafeAreaView style={StyleView.container}>
            <BackView
                text={StringKey.Back}
                title={StringKey.logout}
                btnClick={() => navigation.goBack()}
            />
            <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                <TextInput style={StyleView.placeHolderStyle} editable={false} placeholderTextColor={Colors.greyd0} placeholder={StringKey.search_prof} />
            </View>
            <FlatList data={data} renderItem={({ item }) => <View style={[StyleView.circularborderStyle, { margin: 15, padding: 10 }]}>
                <Text style={[StyleView.t4, { alignSelf: 'flex-start', }]}>{item.name}</Text>
                <View style={[StyleView.rowContainer]}>
                    <Text style={[StyleView.t2, { alignSelf: 'flex-start', }]}>{item.user.email}</Text>
                    <Text style={[StyleView.t2, { alignSelf: 'flex-start', }]}>{"        +" + item.user.callingCode + " " + item.user.phone}</Text>
                </View>
            </View>}>
            </FlatList>
        </SafeAreaView>
    );
};

export default ProfessionalDirectory;