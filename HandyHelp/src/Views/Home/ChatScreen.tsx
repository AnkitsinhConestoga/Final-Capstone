import React, { useEffect, useState } from "react";
import { View, StatusBar, Image, Text, FlatList, TouchableOpacity } from "react-native";
import StyleView from "../../utils/StylesView";
import CustomButton from "../CustomButton";
import StringKey from '../../utils/StringsFile';
import ChatData from "../../Model/ChatData";
import FirebaseDatabaseManager from "../../utils/FirebaseDatabaseManager";
import { USER } from "../../Model/UserModel";
import { useFocusEffect } from "@react-navigation/native";
import { formatCustomDate, generateChatId } from "../../utils/Utils";
import Colors from "../../utils/Colors";



type ChatScreenProps = {
    navigation: any;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {


    const [chatDataList, setchatDataList] = useState<ChatData[]>([]);
    const isMounted = React.useRef(true);

    useFocusEffect(
        React.useCallback(() => {
          // Your code to run when the screen gains focus
          FirebaseDatabaseManager.fetchChatData(USER.userId).then((cahtDataList) => {
            console.log("data list", cahtDataList);
            if (cahtDataList) {
                setchatDataList(cahtDataList);
            }

        });
    
    
          // Cleanup function (optional) - will be called when the component unmounts or loses focus
          return () => {
            // Your cleanup code if needed
            console.log('Screen is losing focus');
          };
        }, [])
      );





    return (
        <View style={StyleView.container}>
            <FlatList
            style={[StyleView.container,{marginBottom:25}]}
                data={chatDataList} // Assuming you have an array of chat data, replace it with your actual array
                keyExtractor={(item) => item.chatId}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[{margin:10,},StyleView.elevatedView,]} onPress={() => {
                        FirebaseDatabaseManager.getanotherUserData((item.chatHead.users[0]==USER.userId)?item.chatHead.users[1]:item.chatHead.users[0]).then((user)=>{
           
                            navigation.navigate('ChatDetails', {
                                recipientId:user.userId,
                                chatId:item.chatHead.chatId,
                                recipientName:user.name,
                                recipientProfileImage:user.profileUrl,
                                postModel:item
                              });
                        });
                     }}>
                        <View style={[StyleView.rowContainer,]} >
                            <Image source={{ uri: item.chatHead.postPicture }} style={StyleView.chatProfile} />
                            <View  style={{marginStart:10}}>
                                <View style={[StyleView.rowContainer]}>
                                <Text style={StyleView.b2}>{(item.chatHead.user1Id==USER.name)?item.chatHead.user2Id:item.chatHead.user1Id}</Text>
                                <Text style={[StyleView.b8,{color:Colors.textColor41}]}>{" . "+item.chatHead.postTitle}</Text>
                                </View>
                                <Text style={StyleView.b8}>{item.lastMessage.text+" : "+formatCustomDate(item.lastMessage.timestamp)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
};

export default ChatScreen;
