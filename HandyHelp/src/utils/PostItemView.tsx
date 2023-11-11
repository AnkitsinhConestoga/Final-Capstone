import * as React from "react";
import { View, Image, Text } from "react-native";
import StyleView from "./StylesView";
import StringKey from "./StringsFile";
import CustomButton from "../Views/CustomButton";
import Colors from "./Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

type PostItemProp = {
    onPostClick: () => void;
};

const PostItemView: React.FC<PostItemProp> = ({ onPostClick }) => {

    return (
        <TouchableOpacity  onPress={onPostClick}>
            <View style={[StyleView.container, StyleView.circularborderStyle, StyleView.CardStyle]}>

                <View style={[StyleView.rowContainer, { flex: 1, padding: 10 }]}>
                    <View style={[StyleView.container, { backgroundColor: Colors.cardBg }]}>
                        <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginTop: 10 }]}>Clean Dishes</Text>
                        <Text style={[StyleView.sub_12_text, { marginTop: 5 }]}>25 Dishes   |   2 Hours   |   45$</Text>
                        <View style={[StyleView.rowContainer, { marginTop: 5 }]}>
                            <Image source={require('../assets/images/location_icon.png')} resizeMode="contain" style={{ width: 16, height: 16 }} />
                            <Text style={[StyleView.sub_12_text, { color: Colors.textColor41 }]}>800m (5mins away)</Text>
                        </View>

                    </View>
                    <View style={[StyleView.container, { backgroundColor: Colors.cardBg }]}>
                        <Image source={require('../assets/images/demo.png')} resizeMode="cover" style={{ width: "90%", height: "80%", alignSelf: 'flex-end' }} />

                    </View>
                </View>




                <View style={StyleView.rowContainer}>
                    <CustomButton
                        text={StringKey.negotiate}
                        textTheme={StyleView.b2}
                        btnTheme={[StyleView.B2, { backgroundColor: Colors.cardBg, flex: 1, margin: 8 }]}
                        btnClick={() => {
                            // need to add event
                        }}
                    />

                    <CustomButton
                        text={StringKey.accept}
                        textTheme={StyleView.b1}
                        btnTheme={[StyleView.B1, { flex: 1, margin: 8 }]}
                        btnClick={() => {
                            //need to add event
                        }}
                    />
                </View>
            </View >
        </TouchableOpacity>
    );
};



export default PostItemView;
