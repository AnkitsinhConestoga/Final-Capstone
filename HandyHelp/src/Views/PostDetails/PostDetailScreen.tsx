import React, { useState } from "react";

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

type PostDetailProp = {
    navigation: any
}


const PostDetailScreen: React.FC<PostDetailProp> = ({ navigation }) => {

    const dataList = ['https://is.zobj.net/image-server/v1/images?r=u2BDkd2VpCW805eBGuGCKSkocIb1J04Rnm3wWuC0ABpx5kj-XZNHw0ziu1WRHFTLFcz9Cw2JLJ_rzn5ZGgyir_1fSxxio_SB2bnNAj4RTyhP_FuFvFtTMI5MSl04eip9HhdKgvOQ2W-mGpjd9x5IgM6TKXn6p6HoCVwEqgeZwfmEPTvY9H_I5PkH25arh7FJ_F8lXUYUfNP2UXDAoCTAVXYzpwewD8hdeNKi5HbL6VOMaMzv5E0ULhzAl6E', 'https://is.zobj.net/image-server/v1/images?r=Nj95PUwPNvh8EBI31b76SvW_xEpPmr5dLdjveiQ7kPJpmHq7mVvquzqfJjb9wfKU0Ait_N0CsdtE1StNFB6zoY6O5JsNsJVNX6d_ll4LvxpChpSuEcebeWeM-VdDA56sYj4-aRCVcOHuIUFdkzPPmDScfYc7BvZKfi6TKl-nEsjAgAEJyUm7yo2TpsoFPU2SidnmpkvAPSBzUz68GKmaHYAPO0MdLalvK9EZ1gbzx336QdSF2J2jcSWEja8', 'https://is.zobj.net/image-server/v1/images?r=UxpKFKkDXm3RxMAUCOHM3WQuzrMDzWR9vhEBvzZB1Hpmd5F6OjzCMUvOJoE5rVTE_7cUyYnlTwfJQ97zay7NiPHGzNokjzQD3-jZ1PuQXegyPw0uqTfh33SwdM_9eYLEiObKA8zFJuFzf-HxWIo7Y4OcsQFAz4Kbl4bs4C0fkrkm5ZpEtzjEG48rTMAad9TMhQImkojdAfBmejSb5jUy0PgI5wOSkozM5exWangwB1DqCZoaoqDQflfTZnY', 'https://is.zobj.net/image-server/v1/images?r=BavFWty0N0Gk9y4ocENn3TpNo1LSFU1KwxGvdz0wes7sV2MZUr7sQsYN1xztTrSa4YHkQMZlongsXR4X9E41vjSiaxebI4bidOng8zrMRkelii0oM4qRiSH1Elb0zuF4f1XzaNXnpqFPJcMAK4cSQtFr8KeoXjzv_SkRDrCv79RxHnff1hYyTk-1B-kADvSOU3EK2MiK4tUQnCbFy2FJ_lpE0Jjbj1Wgl76y_jH9zJPYJPTRL3yG9k25fnI']
        ;
    const [currentIndex, setCurrentIndex] = useState(0);

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
    return (
        <SafeAreaView style={StyleView.container}>
            <ScrollView>
                <View>
                    <BackView
                        text={StringKey.Back}
                        btnClick={() => navigation.goBack()}
                    />
                    <ScrollView>
                        <Text style={[StyleView.tabHeaderStyle, { marginStart: 10, marginTop: 15 }]}>Clean Car</Text>


                        <View style={[StyleView.rowContainer, { marginTop: '5%' }]}>
                            <TouchableOpacity onPress={handlePrevious} disabled={currentIndex === 0} >
                                <Image style={StyleView.iconStyle} resizeMode="contain" source={require("../../assets/images/left_arrow.png")} />
                            </TouchableOpacity>
                            <ScrollView>
                                <TouchableOpacity onPress={handleImageClick}>
                                    <Image
                                        source={{ uri: dataList[currentIndex] }}
                                        style={StyleView.sliderImage}
                                    />
                                </TouchableOpacity>
                            </ScrollView>
                            <TouchableOpacity onPress={handleNext} disabled={currentIndex === dataList.length - 1} >
                                <Image style={StyleView.iconStyle} resizeMode="contain" source={require("../../assets/images/right_arrow.png")} />
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                    <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.specification}</Text>
                    <View style={[StyleView.rowContainer, { marginStart: '4%' }]}>
                        <View style={[StyleView.circularborderStyle, StyleView.CardStyle, { width: '20%', height: 80 }]}>
                            <Image style={[StyleView.iconStyle, { alignSelf: 'center', marginEnd: 0, marginTop: 8 }]} resizeMode="contain" source={require("../../assets/images/location_icon.png")} />
                            <Text style={[StyleView.t4, { fontSize: 12 }]}>5mins away</Text>
                            <Text style={[StyleView.t4, { fontSize: 10, marginTop: -5, lineHeight: 12 }]}>800M</Text>


                        </View>
                        <View style={[StyleView.circularborderStyle, StyleView.CardStyle, { width: '20%', height: 80, marginStart: '4%' }]}>
                            <Image style={[StyleView.iconStyle, { alignSelf: 'center', marginEnd: 0, marginTop: 8 }]} resizeMode="contain" source={require("../../assets/images/dollor_icon.png")} />
                            <Text style={[StyleView.t4, { fontSize: 12 }]}>25$</Text>
                            <Text style={[StyleView.t4, { fontSize: 10, marginTop: -5, lineHeight: 12 }]}>After work</Text>
                        </View>
                        <View style={[StyleView.circularborderStyle, StyleView.CardStyle, { width: '20%', height: 80, marginStart: '4%' }]}>
                            <Image style={[StyleView.iconStyle, { alignSelf: 'center', marginEnd: 0, marginTop: 8 }]} resizeMode="contain" source={require("../../assets/images/time_icon.png")} />
                            <Text style={[StyleView.t4, { fontSize: 12 }]}>Approx Time</Text>
                            <Text style={[StyleView.t4, { fontSize: 10, marginTop: -5, lineHeight: 12 }]}>30 min</Text>
                        </View>
                    </View>
                    <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.description}</Text>

                    <Text style={[{ color: Colors.chatGreyTextColor, fontSize: 14, padding: 16, width: '90%', alignSelf: 'center', backgroundColor: Colors.greye8, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }]}>Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae</Text>

                    <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.location}</Text>
                    
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

