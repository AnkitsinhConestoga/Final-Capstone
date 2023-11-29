import React, { useEffect, useState } from "react";
import { View, StatusBar, Image, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import StyleView from "../../utils/StylesView";
import CustomButton from "../CustomButton";
import StringKey from '../../utils/StringsFile';
import Colors from "../../utils/Colors";
import PostDetailItemView from "../../utils/PostDetailItem";
import FirebaseDatabaseManager from "../../utils/FirebaseDatabaseManager";
import { USER } from "../../Model/UserModel";
import PostModel from "../../Model/PostModel";



type MyPostListingScreenProps = {
    navigation: any;
};

const MyPostListingScreen: React.FC<MyPostListingScreenProps> = ({ navigation }) => {
    const [selectedText, setSelectedText] = useState(StringKey.upcoming);
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);
    const [data,setData] =useState<PostModel[]>([]);

    const isMounted = React.useRef(true);
    useEffect(()=>{

        handleTextSelection(selectedText);
        FirebaseDatabaseManager.getUpcomingPost(USER.userId).then(modelList=>{
            if(isMounted.current){
                 setData(modelList);
            }
           
        });
        return () => {
            isMounted.current = false;
          };
    },[]);


    const handleTextSelection = (text: string) => {
        // setIsLoadingVisible(true);
        setData([]);
        setSelectedText(text);
        if (text == StringKey.my_post) {
            FirebaseDatabaseManager.getUserPost(USER.userId).then(modelList=>{
                setData(modelList);
            });
        }else if(text == StringKey.upcoming){
            FirebaseDatabaseManager.getUpcomingPost(USER.userId).then(modelList=>{
                setData(modelList);
            });
        }else if(text == StringKey.completed){
            FirebaseDatabaseManager.getCompletedPost(USER.userId).then(modelList=>{
                setData(modelList);
            });
        }else if(text == StringKey.cancelled){
            FirebaseDatabaseManager.getCancelledPost(USER.userId).then(modelList=>{
                setData(modelList);
            });
        }

    };

    return (
        <SafeAreaView style={[StyleView.container]}>
            <View style={[StyleView.container,]}>
                <View style={[StyleView.rowContainer, StyleView.circularborderStyle, StyleView.CardStyle, { height: 50 }]}>
                    <TouchableOpacity
                        style={[
                            StyleView.textContainer,
                            selectedText === StringKey.my_post && StyleView.selectedText,
                        ]}
                        onPress={() => handleTextSelection(StringKey.my_post)}
                    >
                        <Text style={[StyleView.text, { fontSize: 13 }, selectedText === StringKey.my_post && StyleView.selectText]}>{StringKey.my_post}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            StyleView.textContainer,
                            selectedText === StringKey.upcoming && StyleView.selectedText,
                        ]}
                        onPress={() => handleTextSelection(StringKey.upcoming)}
                    >
                        <Text style={[StyleView.text, { fontSize: 13 }, selectedText === StringKey.upcoming && StyleView.selectText]}>{StringKey.upcoming}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            StyleView.textContainer,
                            selectedText === StringKey.completed && StyleView.selectedText,
                        ]}
                        onPress={() => handleTextSelection(StringKey.completed)}
                    >
                        <Text style={[StyleView.text, { fontSize: 13 }, selectedText === StringKey.completed && StyleView.selectText]}>{StringKey.completed}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            StyleView.textContainer,
                            selectedText === StringKey.cancelled && StyleView.selectedText,
                        ]}
                        onPress={() => handleTextSelection(StringKey.cancelled)}
                    >
                        <Text style={[StyleView.text, { fontSize: 13 }, selectedText === StringKey.cancelled && StyleView.selectText]}>{StringKey.cancelled}</Text>
                    </TouchableOpacity>

                </View>
                {
                    (data.length<=0)?
                    <Text style={[StyleView.b8, { marginStart: 10 ,textAlign:'center',textAlignVertical:'center',height:'100%',flex:1}]}>No Activity </Text>
                    :<FlatList data={data} renderItem={({ item }) => <PostDetailItemView item={item} onPostClick={() => {
                        navigation.navigate('PostOfferScreen');
    
                    }} postType={selectedText} onPostActionClick={() => { }} ></PostDetailItemView>}>
    
                    </FlatList>
                }

                

            </View>
            {
                (isLoadingVisible) ?

                    <View style={StyleView.preloader}>
                        <ActivityIndicator size="large" color={Colors.colorfb} />
                    </View>

                    : null
            }

        </SafeAreaView>

    );
};

export default MyPostListingScreen;
