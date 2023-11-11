import React from "react";
import { View, StatusBar, Image, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import StyleView from "../../utils/StylesView";
import CustomButton from "../CustomButton";
import StringKey from '../../utils/StringsFile';
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../utils/Colors";



type CreatePostListingScreenProps = {
    navigation: any;
};

const CreatePostListingScreen: React.FC<CreatePostListingScreenProps> = ({ navigation }) => {




    return (
        <SafeAreaView style={StyleView.container}>
            <ScrollView style={StyleView.container}>
                <Image style={{ width: '100%', height: '40%', marginTop: 10, resizeMode: 'cover' }} source={require('../../assets/images/upload_image.png')} />
                <Text style={[StyleView.text, { fontSize: 18 }]}>{StringKey.upload_photo}</Text>
                <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        placeholderTextColor={Colors.greyd0}
                        placeholder={StringKey.Title}
                    />
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        placeholderTextColor={Colors.greyd0}
                        placeholder={StringKey.Price}
                    />
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        placeholderTextColor={Colors.greyd0}
                        placeholder={StringKey.description}
                    />
                </View>
                <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.location}</Text>
                <View style={[StyleView.rowContainer, { marginStart: 10 }]}>
                    <Text>N2A 2S6</Text>
                    <TouchableOpacity>
                        <Text style={[StyleView.b2, { marginStart: 8 }]}>{StringKey.edit}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.tac}</Text>
                <Text style={[StyleView.text, { width: '90%', alignSelf: 'center', textAlign: 'left' }]}>
                    Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt
                    eleifend vitaeLorem ipsum dolor sit amet consectetur.
                    Ultrici es tincidunt eleifend vitaeLorem ipsum dolor sit amet
                    consectetur. Ultrici es tincidunt eleifend vitaeLorem ipsum
                    dolor sit amet consectetur. Ultrici es tincidunt eleifend
                    vitaeLorem ipsum dolor sit amet consectetur. Ultrici es
                    tincidunt eleifend vitae
                </Text>
                <View style={{ flex: 1 }} />
               
                  
                    <CustomButton
                        text={StringKey.upload}
                        textTheme={StyleView.b1}
                        btnTheme={[StyleView.B1, {  marginTop: 18, }]}
                        btnClick={() => {
                            navigation.navigate('HomeScreen');
                        }}
                    />
                
                <View style={{ height: 70 }}></View>



            </ScrollView>

        </SafeAreaView>
    );
};

export default CreatePostListingScreen;
