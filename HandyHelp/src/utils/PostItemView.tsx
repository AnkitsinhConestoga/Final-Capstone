import * as React from "react";
import { View, Image, Text } from "react-native";
import StyleView from "./StylesView";
import StringKey from "./StringsFile";
import CustomButton from "../Views/CustomButton";
import Colors from "./Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import PostModel from "../Model/PostModel";

type PostItemProp = {
    model: PostModel;
    onPostClick: () => void;
    onApproveClick: () => void;
    onNegotiateClick: () => void;
};

function formatDistanceAndTime(distanceInKm: number): string {
    // Assuming an average walking speed of 5 km/h
    const walkingSpeed: number = 5;

    // Calculate estimated time to travel
    const timeInHours: number = distanceInKm / walkingSpeed;
    const timeInMinutes: number = timeInHours * 60;

    // Format distance and time
    const formattedDistance: string = distanceInKm.toFixed(2); // Round to two decimal places
    const formattedTime: number = Math.round(timeInMinutes);

    // Construct the result string
    const resultString: string = ` ${formattedDistance} km (${formattedTime} min away)`;

    return resultString;
}

const PostItemView: React.FC<PostItemProp> = ({ model, onPostClick, onApproveClick, onNegotiateClick }) => {
    let isBtnClick = false;

    return (

        <View style={[StyleView.container, StyleView.circularborderStyle, StyleView.CardStyle]}>
            <TouchableOpacity  onPress={onPostClick}>
                <View style={[StyleView.rowContainer, {  paddingTop:10,paddingStart:10,paddingEnd:10 }]}>
                    <View style={[StyleView.container, { backgroundColor: Colors.cardBg }]}>
                        <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginTop: 10 }]}>{model.postTitle}</Text>
                        <Text style={[StyleView.sub_12_text, { marginTop: 5 }]}>{((model.workDuration) ? model.workDuration : 1) + " hour   |   " + model.postPrice + "$"}</Text>
                        <View style={[StyleView.rowContainer, { marginTop: 5 }]}>
                            <Image source={require('../assets/images/location_icon.png')} resizeMode="contain" style={{ width: 16, height: 16 }} />
                            <Text style={[StyleView.sub_12_text, { color: Colors.textColor41 }]}>{formatDistanceAndTime(model.workDistance)}</Text>
                        </View>

                    </View>
                    <View style={[StyleView.container, { backgroundColor: Colors.cardBg }]}>
                        {(model.postImages.length > 0) ?
                            <Image source={{ uri: model.postImages[0] }} resizeMode="cover" style={{ width: "90%", height: "80%", alignSelf: 'flex-end' }} />
                            :
                            <Image source={require('../assets/images/demo.png')} resizeMode="cover" style={{ width: "90%", height: "80%", alignSelf: 'flex-end' }} />
                        }

                    </View>
                </View>
            </TouchableOpacity>




            <View style={[StyleView.rowContainer,{flex:1,marginBottom:'8%'}]}>
                <CustomButton
                    text={StringKey.negotiate}
                    textTheme={StyleView.b2}
                    btnTheme={[StyleView.B2, { backgroundColor: Colors.cardBg, flex: 1, margin: 8 }]}
                    btnClick={(e) => { e.stopPropagation(); isBtnClick = true; onNegotiateClick(); }}
                />

                <CustomButton
                    text={StringKey.accept}
                    textTheme={StyleView.b1}
                    btnTheme={[StyleView.B1, { flex: 1, margin: 8 }]}
                    btnClick={(e) => { e.stopPropagation(); isBtnClick = true; onApproveClick(); }}
                />
            </View>
        </View >
    );
};



export default PostItemView;
