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
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/RootStackParamList";
import { PlacePickerPresentationStyle } from "react-native-place-picker";
import MapView, { Marker } from "react-native-maps";

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



    // Construct the result string
    // const resultString: string = ` ${formattedDistance} km (${formattedTime} min away)`;

    const handleNext = () => {
        if (currentIndex < dataList.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

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
                    style={{width:'100%',minHeight:180}}
                        mapType="standard" // Set the map type (standard, satellite, hybrid)
                        
                        
                    >
                        <Marker coordinate={{latitude:postModel.postLat,longitude:postModel.postLong}}/>
                    </MapView>

                </View>
            </ScrollView>
            <View style={{ flex: 1 }} />
            <View style={StyleView.rowContainer}>
                <CustomButton
                    text={StringKey.negotiate}
                    textTheme={StyleView.b2}
                    btnTheme={[StyleView.B2, { flex: 1, margin: 8 }]}
                    btnClick={() => {
                        navigation.goBack();
                    }}
                />

                <CustomButton
                    text={StringKey.accept}
                    textTheme={StyleView.b1}
                    btnTheme={[StyleView.B1, { flex: 1, margin: 8 }]}
                    btnClick={() => {
                        navigation.navigate('HomeScreen');
                    }}
                />
            </View>


        </SafeAreaView>);

}

export default PostDetailScreen;

