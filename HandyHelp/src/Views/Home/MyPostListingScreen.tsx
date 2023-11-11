import React, { useState } from "react";
import { View, StatusBar, Image, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import StyleView from "../../utils/StylesView";
import CustomButton from "../CustomButton";
import StringKey from '../../utils/StringsFile';
import Colors from "../../utils/Colors";
import PostDetailItemView from "../../utils/PostDetailItem";



type MyPostListingScreenProps = {
    navigation: any;
};

const MyPostListingScreen: React.FC<MyPostListingScreenProps> = ({ navigation }) => {
    const [selectedText, setSelectedText] = useState(StringKey.upcoming);

  const handleTextSelection = (text: string) => {
    setSelectedText(text);
  };

    return (
        <SafeAreaView style={[StyleView.container]}>
            <View style={[StyleView.container,]}>
                <View style={[StyleView.rowContainer,StyleView.circularborderStyle, StyleView.CardStyle,{height:50}]}>
                    <TouchableOpacity
                        style={[
                            StyleView.textContainer,
                            selectedText === StringKey.upcoming && StyleView.selectedText,
                        ]}
                        onPress={() => handleTextSelection(StringKey.upcoming)}
                    >
                        <Text style={[StyleView.text,selectedText === StringKey.upcoming && StyleView.selectText]}>{StringKey.upcoming}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            StyleView.textContainer,
                            selectedText === StringKey.completed && StyleView.selectedText,
                        ]}
                        onPress={() => handleTextSelection(StringKey.completed)}
                    >
                        <Text style={[StyleView.text,selectedText === StringKey.completed && StyleView.selectText]}>{StringKey.completed}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            StyleView.textContainer,
                            selectedText === StringKey.cancelled && StyleView.selectedText,
                        ]}
                        onPress={() => handleTextSelection(StringKey.cancelled)}
                    >
                        <Text style={[StyleView.text,selectedText === StringKey.cancelled && StyleView.selectText]}>{StringKey.cancelled}</Text>
                    </TouchableOpacity>

                </View>
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
                ]} renderItem={({ item }) => <PostDetailItemView onPostClick={() => {
                    navigation.navigate('PostOfferScreen');

                } } postType={selectedText} onPostActionClick={() =>{}} ></PostDetailItemView>}>

                </FlatList>

            </View>

        </SafeAreaView>

    );
};

export default MyPostListingScreen;
