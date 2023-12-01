import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, Pressable, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../utils/RootStackParamList'; // Import your StackParamList
import ChatData from '../../Model/ChatData';
import { USER } from '../../Model/UserModel';
import StyleView from '../../utils/StylesView';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import StringKey from '../../utils/StringsFile';

type ChatDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ChatDetails'>;

type ChatDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatDetails'>;

type ChatDetailsScreenProps = {
    route: ChatDetailsScreenRouteProp;
    navigation: ChatDetailsScreenNavigationProp;
};

const ChatDetailsScreen: React.FC<ChatDetailsScreenProps> = ({ route, navigation }) => {
    const { chatId, recipientId, recipientName, recipientProfileImage, postModel } = route.params;
    const [chatData, setChatData] = useState<ChatData | null>(null);

    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .doc(chatId)
            .collection('messages')  // Access the 'messages' subcollection
            .orderBy('timestamp')    // Order the messages by timestamp
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map(doc => doc.data());
                setChatData({ ...chatData, messages });
            });

        return () => {
            unsubscribe();
        };
    }, [chatId]);
    const screenWidth = Dimensions.get('window').width;

    const sendMessage = async () => {
        try {
            if (newMessage.trim() === '') return;

            const chatRef = firestore().collection('chats').doc(chatId);
            const message = {
                messageId: firestore().collection('chats').doc().id,
                senderId: USER.userId, // Replace with the actual current user ID
                text: newMessage,
                timestamp: new Date().toISOString(),
            };
            const sortedIds = [USER.userId, recipientId].sort();

            



            const chatDoc = await chatRef.get();

            if (!chatDoc.exists) {
                const chatHeadData = {
                    user1Id: (sortedIds[0]==USER.userId)?USER.name:recipientName,
                    user2Id: (sortedIds[1]==USER.userId)?USER.name:recipientName,
                    postId: postModel.postId,
                    postTitle:postModel.postTitle,
                    postPicture: postModel.postImages[0],
                    users:sortedIds,
                    chatId:chatId
                    
                }
                await chatRef.set({ lastMessage: message, chatHead: chatHeadData });
            } else {
                await chatRef.update({
                    lastMessage: message,
                });
            }

            await chatRef.collection('messages').doc(message.messageId).set(message);

            setNewMessage('');
        } catch (error) {
            console.log('Error sending message:', error);
        }
    };

    console.log("chat message list", chatData?.messages);

    return (
        <View style={[StyleView.container]}>
            <View style={[StyleView.rowContainer, { paddingTop: 10 }]}>
                <Pressable onPress={() => { navigation.goBack() }}>
                    <Icon style={{ padding: 5 }} name="left" size={24} color={Colors.blackIcon} />
                </Pressable>
                <Image source={{ uri: recipientProfileImage }} style={StyleView.chatProfile} />
                <Text style={[StyleView.b2, { marginStart: 10, color: Colors.textColor41 }]}>{recipientName}</Text>
            </View>
            <View style={[StyleView.lineStyle, { flex: 0, margin: 5 }]} />

            <FlatList
                data={chatData?.messages}
                keyExtractor={(item) => item.timestamp}
                renderItem={({ item }) => (

                    

                    (item.senderId != USER.userId) ? <View style={[{ alignSelf: 'flex-start', maxWidth: Math.min(0.8 * screenWidth, item.text.length*50 ) }]}>
                        <Text style={[{ color: Colors.grey5a, fontSize: 14, padding: 10, margin: 5, backgroundColor: Colors.greye8, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }]}>{item.text}</Text>
                    </View> : <View style={[{ alignSelf: 'flex-end', maxWidth: Math.min(0.8 * screenWidth, item.text.length*50 ) }]}>
                        <Text style={[{
                            color: Colors.grey5a, fontSize: 14, padding: 10, margin: 5, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderTopLeftRadius: 16, borderColor: Colors.colorfb, borderStyle: "solid",borderWidth: 1, backgroundColor: Colors.cardBg,
                        }, {}]}>{item.text}</Text>
                    </View>



                )}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderColor: '#ccc', padding: 10 }}>
                <TextInput
                    style={[StyleView.circularborderStyle, { flex: 1 }]}
                    placeholder={StringKey.message_placeholder}
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                />
                <TouchableOpacity onPress={sendMessage} >
                    <Image style={{height:20,width:20,margin:10}} source={require('../../assets/images/send_message.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatDetailsScreen;
