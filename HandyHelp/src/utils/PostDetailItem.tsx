import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import CustomButton from "../Views/CustomButton";
import Colors from "./Colors";
import StyleView from "./StylesView";
import StringKey from "./StringsFile";
import PostModel from "../Model/PostModel";
import { formatCustomDate } from "./Utils";

type PostDetailItemProp = {
    postType: string,
    item: PostModel,
    onPostActionClick: () => void,
    onPostClick: () => void;
};




const PostDetailItemView: React.FC<PostDetailItemProp> = ({ postType, item, onPostClick,onPostActionClick }) => {
    console.log("post time",item.scheduleData);




    return (
        <View style={[StyleView.container, { width: '90%', alignSelf: 'center', marginBottom: 10 }]}>

            <View style={[StyleView.container, StyleView.circularborderStyle,]}>

                <View style={[StyleView.rowContainer, { flex: 1, padding: 5 }]}>
                    <TouchableOpacity style={StyleView.container} onPress={onPostClick}>
                        <View style={[StyleView.container,]}>
                            <Text style={[StyleView.t4, { alignSelf: 'flex-start', }]}>{item.postTitle}</Text>
                            <Text style={[StyleView.sub_12_text, { marginTop: 5 }]}>{item.postCity}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPostActionClick}>
                    <Text style={
                        postType === StringKey.upcoming
                            ? { color: Colors.textColor41 }
                            : postType === StringKey.completed
                                ? { color: Colors.colorfb }
                                : { color: Colors.redCancel }
                    }
                    >{postType === StringKey.upcoming ? formatCustomDate(item.scheduleData) : (postType === StringKey.completed ? StringKey.completed :  (postType==StringKey.my_post?StringKey.cancel:StringKey.cancelled))}</Text>
                    </TouchableOpacity>
                </View>

            </View >
        </View>
    );
};



export default PostDetailItemView;
