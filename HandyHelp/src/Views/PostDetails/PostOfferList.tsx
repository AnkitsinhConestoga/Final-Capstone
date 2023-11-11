import { FlatList, SafeAreaView, Text, View } from "react-native";
import StyleView from "../../utils/StylesView";
import StringKey from "../../utils/StringsFile";
import React from "react";
import CustomButton from "../CustomButton";
import BackView from "../BackButtonView";
import Colors from "../../utils/Colors";

type PostOfferItemProp = {
    postId: string,
    navigation: any

};

const PostOfferItemView: React.FC<PostOfferItemProp> = ({ postId, navigation }) => {

    return (
        <SafeAreaView style={StyleView.container}>
            <BackView
                text={StringKey.Back}
                title={StringKey.offers}
                btnClick={() => navigation.goBack()}
            />
            <FlatList data={[
                { key: 'Devin' },
                { key: 'Dan' },
                { key: 'Dominic' },
                { key: 'Jackson' },
                { key: 'James' },
                { key: 'Joel' },
                { key: 'John' },
                { key: 'Jillian' },
                { key: 'Jimmy' },
                { key: 'Julie' },
            ]} renderItem={({ item }) => <View style={[StyleView.rowContainer,StyleView.circularborderStyle, { flex: 1,marginBottom:20, padding: 5,width:'90%',alignSelf:'center' }]}>
                <View style={[StyleView.container,{alignSelf:'center',flex:1}]}>
                    <Text style={[StyleView.t4, { alignSelf: 'flex-start',color:Colors.colorf5 }]}>$15</Text>
                    <Text style={[StyleView.sub_12_text, { marginTop: 5, }]}>Lawn Cut</Text>
                </View>
                <View style={[StyleView.rowContainer,{flex:2,}]}>
                    <CustomButton
                        text={StringKey.negotiate}
                        textTheme={StyleView.b1}
                        btnTheme={[StyleView.B1, { flex: 1, height:40 }]}
                        btnClick={() => {

                        }}
                    />

                    <CustomButton
                        text={StringKey.accept}
                        textTheme={StyleView.b1}
                        btnTheme={[StyleView.B1, { flex: 1,height:40, marginStart:8,marginEnd:8 }]}
                        btnClick={() => {

                        }}
                    />
                </View>
            </View>}>

            </FlatList>

        </SafeAreaView>
    );
};

export default PostOfferItemView;