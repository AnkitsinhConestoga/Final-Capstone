import React, { useState } from "react";
import { View, StatusBar, Image, Text } from "react-native";
import StyleView from "../../utils/StylesView";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import PostItemView from "../../utils/PostItemView";




type JobListingScreenProps = {
    navigation: any;
};

const JobListingScreen: React.FC<JobListingScreenProps> = ({ navigation }) => {
    const [titleText, setTitleText] = useState("18 work available");



    return (
        <SafeAreaView style={StyleView.container}>
            <View style={StyleView.container}>
                <Text style={[StyleView.b8, { marginStart: 10 }]}>{titleText}</Text>
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
                ]} renderItem={({ item }) => <PostItemView onPostClick={() => {
                    navigation.navigate('PostDetailScreen');

                }} ></PostItemView>}>

                </FlatList>

            </View>
        </SafeAreaView>

    );
};

export default JobListingScreen;
