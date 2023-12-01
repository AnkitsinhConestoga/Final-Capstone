import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context"
import { Alert, Button, Image, Text, TouchableOpacity, View } from "react-native";
import BackView from "../BackButtonView";
import StyleView from '../../utils/StylesView';
import StringKey from '../../utils/StringsFile';
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";
import Colors from "../../utils/Colors";
import CustomButton from "../CustomButton";
import PostModel from "../../Model/PostModel";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/RootStackParamList";
import { PlacePickerPresentationStyle } from "react-native-place-picker";
import MapView, { Marker } from "react-native-maps";
import DatePicker from "react-native-date-picker";
import { Status, formatCustomDate, generateChatId } from "../../utils/Utils";
import { USER } from "../../Model/UserModel";
import FirebaseDatabaseManager from "../../utils/FirebaseDatabaseManager";

type ScreenBRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

type PostDetailProp = {
    route: ScreenBRouteProp,
    navigation: any
}


const PostDetailScreen: React.FC<PostDetailProp> = ({ route, navigation }) => {
    const postModel: PostModel = route.params.item;

    const dataList: string[] = [];
    dataList.push(...postModel.postImages);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [distance, setDistance] = useState('');
    const [distanceTime, setDistanceTime] = useState('');
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    const [date, setDate] = useState(currentDate)
    const [open, setOpen] = useState(false);
    const [workerUser, setWorkerUser] = useState(USER);
    const [workerSet, setWorker] = useState(false);

    useEffect(() => {

        const walkingSpeed: number = 5;

        // Calculate estimated time to travel
        const timeInHours: number = postModel.workDistance / walkingSpeed;
        const timeInMinutes: number = timeInHours * 60;

        // Format distance and time
        const formattedDistance: string = postModel.workDistance.toFixed(2); // Round to two decimal places
        const formattedTime: number = Math.round(timeInMinutes);

        setDistance(`${formattedDistance} km`);
        setDistanceTime(`${formattedTime} min`);
    }, []);

    useFocusEffect(
        React.useCallback(() => {

            const fetchData = async () => {
                console.log('Screen has come into focus (onResume)');
                if (postModel.postStatus == Status.Approved || postModel.postStatus == Status.Completed) {
                    if (postModel.authorId == USER.userId) {
                        await FirebaseDatabaseManager.getanotherUserData(postModel.workerId).then((item) => {
                            if (item) {
                                console.log("fetched user", item);
                                setWorkerUser(item);
                            }
                        });
                    } else {
                        await FirebaseDatabaseManager.getanotherUserData(postModel.authorId).then((item) => {
                            if (item) {
                                console.log("fetched user", item);
                                setWorkerUser(item);
                            }
                        });
                    }
                }
            };
            if (!workerSet) {
                fetchData();

            }




            return () => {
                console.log('Screen is losing focus (onPause)');

            };
        }, [workerSet])
    );

    function updateItem() {
        console.log("TAGS", postModel);
        if (postModel) {
            postModel.scheduleData = date.toISOString();
            postModel.postStatus = Status.Approved;
            postModel.workerId = USER.userId;
            FirebaseDatabaseManager.updateStatusPostData(postModel.postId, postModel).then(() => {
                navigation.goBack();
            }).catch((error) => {
                console.log("Error while update post details");
            })
        }
    }



    // Construct the result string
    // const resultString: string = ` ${formattedDistance} km (${formattedTime} min away)`;

    const handleNext = () => {
        if (currentIndex < dataList.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    function showTimeDialog() {
        setOpen(true);




    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleImageClick = () => {
        // Handle opening the image in full-screen mode here
        navigation.navigate("FullScreenImage", { dataList, currentIndex });
    };

    console.log("received ", postModel);
    return (
        <SafeAreaView style={StyleView.container}>
            <ScrollView>
                <View>
                    <BackView
                        text={StringKey.Back}
                        btnClick={() => navigation.goBack()}
                    />
                    <ScrollView>
                        <Text style={[StyleView.tabHeaderStyle, { marginStart: 10, marginTop: 15 }]}>{postModel.postTitle}</Text>


                        <View style={[StyleView.rowContainer, { marginTop: '5%' }]}>
                            {(currentIndex === 0) ? null :
                                <TouchableOpacity onPress={handlePrevious}  >
                                    <Image style={StyleView.iconStyle} resizeMode="contain" source={require("../../assets/images/left_arrow.png")} />
                                </TouchableOpacity>

                            }


                            <ScrollView>
                                <TouchableOpacity onPress={handleImageClick}>
                                    <Image
                                        source={{ uri: dataList[currentIndex] }}

                                        style={StyleView.sliderImage}
                                    />
                                </TouchableOpacity>
                            </ScrollView>
                            {(currentIndex === dataList.length - 1) ?
                                null
                                :
                                <TouchableOpacity onPress={handleNext}  >
                                    <Image style={StyleView.iconStyle} resizeMode="contain" source={require("../../assets/images/right_arrow.png")} />
                                </TouchableOpacity>}

                        </View>

                    </ScrollView>
                    <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.specification}</Text>
                    <View style={[StyleView.rowContainer, { marginStart: '4%' }]}>
                        <View style={[StyleView.circularborderStyle, StyleView.CardStyle, { width: '20%', height: 80 }]}>
                            <Image style={[StyleView.iconStyle, { alignSelf: 'center', marginEnd: 0, marginTop: 8 }]} resizeMode="contain" source={require("../../assets/images/location_icon.png")} />
                            <Text style={[StyleView.t4, { fontSize: 12 }]}>{distanceTime}</Text>
                            <Text style={[StyleView.t4, { fontSize: 10, marginTop: -5, lineHeight: 12 }]}>{distance}</Text>


                        </View>
                        <View style={[StyleView.circularborderStyle, StyleView.CardStyle, { width: '20%', height: 80, marginStart: '4%' }]}>
                            <Image style={[StyleView.iconStyle, { alignSelf: 'center', marginEnd: 0, marginTop: 8 }]} resizeMode="contain" source={require("../../assets/images/dollor_icon.png")} />
                            <Text style={[StyleView.t4, { fontSize: 12 }]}>{postModel.postPrice + "$"}</Text>
                            <Text style={[StyleView.t4, { fontSize: 10, marginTop: -5, lineHeight: 12 }]}>After work</Text>
                        </View>
                        <View style={[StyleView.circularborderStyle, StyleView.CardStyle, { width: '20%', height: 80, marginStart: '4%' }]}>
                            <Image style={[StyleView.iconStyle, { alignSelf: 'center', marginEnd: 0, marginTop: 8 }]} resizeMode="contain" source={require("../../assets/images/time_icon.png")} />
                            <Text style={[StyleView.t4, { fontSize: 12 }]}>Approx Time</Text>
                            <Text style={[StyleView.t4, { fontSize: 10, marginTop: -5, lineHeight: 12 }]}>{(postModel.workDuration ? postModel.workDuration : 1) + " hour"}</Text>
                        </View>
                    </View>
                    <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.description}</Text>

                    <Text style={[{ color: Colors.chatGreyTextColor, fontSize: 14, padding: 16, width: '90%', alignSelf: 'center', backgroundColor: Colors.greye8, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }]}>{postModel.postDesc}</Text>

                    <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.location}</Text>
                    <MapView
                        initialRegion={{
                            latitude: postModel.postLat,
                            longitude: postModel.postLong,
                            latitudeDelta: 0.0155,
                            longitudeDelta: 0.0295,
                        }}
                        zoomControlEnabled={false}
                        scrollEnabled={false}
                        style={{ width: '100%', minHeight: 180 }}
                        mapType="standard" // Set the map type (standard, satellite, hybrid)


                    >
                        <Marker coordinate={{ latitude: postModel.postLat, longitude: postModel.postLong }} />
                    </MapView>

                    {
                        (postModel.postStatus == Status.Approved || postModel.postStatus == Status.Completed) ?
                            <View>
                                <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.schedule_time}</Text>
                                <Text style={[StyleView.b2, { marginStart: 10, color: Colors.textColor41 }]}>{formatCustomDate(postModel.scheduleData)}</Text>

                                <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.contact_info}</Text>
                                <View style={[StyleView.rowContainer, { marginStart: 10, marginTop: 15 }]}>
                                    <Image
                                        source={
                                            workerUser.profileUrl ? { uri: workerUser.profileUrl } :
                                                require('../../assets/images/default-profile-image.png')
                                        } // Provide a default profile image
                                        style={[StyleView.profileImage, { width: 75, height: 75, }]}
                                    />

                                    <View style={{ marginStart: 15 }}>
                                        <Text style={[StyleView.t4, { alignSelf: 'flex-start', }]}>{workerUser.name}</Text>
                                        <Text style={[StyleView.t2, { alignSelf: 'flex-start', }]}>{workerUser.email}</Text>
                                        <Text style={[StyleView.t2, { alignSelf: 'flex-start', }]}>{"+"+workerUser.callingCode + " " + workerUser.phone}</Text>
                                    </View>

                                </View>
                            </View> : null}





                </View>
            </ScrollView>
            <View style={{ flex: 1 }} />
            {
                (postModel.postStatus == Status.Approved)?
                <View style={StyleView.rowContainer}>
                <CustomButton
                    text={StringKey.Back}
                    textTheme={StyleView.b2}
                    btnTheme={[StyleView.B2, { flex: 1, margin: 8 }]}
                    btnClick={() => {
                        navigation.goBack();
                    }}
                />

                <CustomButton
                    text={StringKey.completed}
                    textTheme={StyleView.b1}
                    btnTheme={[StyleView.B1, { flex: 1, margin: 8 }]}
                    btnClick={() => {
                        postModel.postStatus=Status.Completed;
                        FirebaseDatabaseManager.updateStatusPostData(postModel.postId,postModel).then(()=>{
                            navigation.goBack();
                        }).catch((error)=>{
                            console.log("Error while update post details");
                        })

                    }}
                />
            </View>:(postModel.postStatus==Status.Completed)?<View>
                <Text style={[StyleView.t1,{marginTop:10,color:Colors.colorfb,textAlign:'center'}]}>{StringKey.completed}</Text>
            </View>:(postModel.postStatus==Status.Published && postModel.authorId==USER.userId)?null:<View style={StyleView.rowContainer}>
                <CustomButton
                    text={StringKey.negotiate}
                    textTheme={StyleView.b2}
                    btnTheme={[StyleView.B2, { flex: 1, margin: 8 }]}
                    btnClick={() => {
                        FirebaseDatabaseManager.getanotherUserData(postModel.authorId).then((user)=>{
           
                            navigation.navigate('ChatDetails', {
                                recipientId:user.userId,
                                chatId:generateChatId(user.userId,USER.userId,postModel.postId),
                                recipientName:user.name,
                                recipientProfileImage:user.profileUrl,
                                postModel:postModel
                              });
                        });
                    }}
                />

                <CustomButton
                    text={StringKey.accept}
                    textTheme={StyleView.b1}
                    btnTheme={[StyleView.B1, { flex: 1, margin: 8 }]}
                    btnClick={() => {
                        setOpen(true);
                    }}
                />
            </View>

            }
            
            <DatePicker
                modal
                open={open}
                minimumDate={currentDate}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    updateItem();
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />


        </SafeAreaView>);

}

export default PostDetailScreen;

