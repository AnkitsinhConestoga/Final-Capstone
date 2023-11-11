import React from "react";
import { View, StatusBar, Image, Text } from "react-native";
import StyleView from "../../utils/StylesView";
import CustomButton from "../CustomButton";
import StringKey from '../../utils/StringsFile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobListingScreen from "./JobListingScreen";
import MyPostListingScreen from "./MyPostListingScreen";
import CreatePostListingScreen from "./CreatePostScreen";
import ChatScreen from "./ChatScreen";
import SettingScreen from "./SettingScreen";
import Colors from "../../utils/Colors";
import { Icon } from "react-native-vector-icons/Icon";




type HomeScreenProps = {
    navigation: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const Tab = createBottomTabNavigator();


    return (
        <View style={StyleView.container}>
            <Tab.Navigator screenOptions={{
                tabBarStyle: { position: 'relative' },
                headerTitleStyle:StyleView.tabHeaderStyle,
                tabBarActiveTintColor: Colors.colorfb,
                tabBarInactiveTintColor: Colors.textColor41
            }}>
                <Tab.Screen name={StringKey.home} options={{
                    title: StringKey.avail_work, tabBarLabel: StringKey.home, tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/home_icon.png')}
                            style={[{width:24,height:24}, { tintColor: focused?Colors.colorfb:Colors.textColor41 }]}
                        />
                    ),
                }} component={JobListingScreen} />
                <Tab.Screen name={StringKey.my_post} options={{ title: '',headerShown:false, tabBarLabel: StringKey.my_post,tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/post_icon.png')}
                            style={[{width:24,height:24}, { tintColor: focused?Colors.colorfb:Colors.textColor41 }]}
                        />
                    ), }} component={MyPostListingScreen} />
                <Tab.Screen name={StringKey.create_post} options={{ title: StringKey.create_post,headerShown:false, tabBarLabel: StringKey.Post,tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/add_icon.png')}
                            style={[{width:24,height:24}, { tintColor: focused?Colors.colorfb:Colors.textColor41 }]}
                        />
                    ), }} component={CreatePostListingScreen} />
                <Tab.Screen name={StringKey.Chat} options={{ title: StringKey.Chat, tabBarLabel: StringKey.Chat,tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/chat_icon.png')}
                            style={[{width:24,height:24}, { tintColor: focused?Colors.colorfb:Colors.textColor41 }]}
                        />
                    ), }} component={ChatScreen} />
                <Tab.Screen name={StringKey.Setting} options={{ title: StringKey.Settings, tabBarLabel: StringKey.Setting,tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/setting_icon.png')}
                            style={[{width:24,height:24}, { tintColor: focused?Colors.colorfb:Colors.textColor41 }]}
                        />
                    ), }} component={SettingScreen} />
            </Tab.Navigator>
        </View>
    );
};

export default HomeScreen;
