import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import CustomButton from "../Views/CustomButton";
import Colors from "./Colors";
import StyleView from "./StylesView";
import StringKey from "./StringsFile";
import PostModel from "../Model/PostModel";

type PostDetailItemProp = {
    postType: string,
    item : PostModel,
    onPostActionClick: () => void,
    onPostClick: () => void;
};

const PostDetailItemView: React.FC<PostDetailItemProp> = ({ postType,item, onPostClick }) => {
    
    return (
        <View style={[StyleView.container,{width:'90%',alignSelf:'center',marginBottom:10}]}>
            <TouchableOpacity onPress={onPostClick}>
                <View style={[StyleView.container, StyleView.circularborderStyle,]}>

                    <View style={[StyleView.rowContainer, { flex: 1, padding: 5 }]}>
                        <View style={[StyleView.container,]}>
                            <Text style={[StyleView.t4, { alignSelf: 'flex-start', }]}>{item.postTitle}</Text>
                            <Text style={[StyleView.sub_12_text, { marginTop: 5 }]}>Lawn Cut</Text>
                        </View>
                        <Text style={
  postType === StringKey.upcoming
    ? { color: Colors.textColor41 }
    : postType === StringKey.completed
    ? { color: Colors.colorfb }
    : { color: Colors.redCancel }
}
>{postType === StringKey.upcoming ? "Today at 9:20 pm" : (postType===StringKey.completed ? StringKey.done : StringKey.cancel)}</Text>
                    </View>

                </View >
            </TouchableOpacity>
        </View>
    );
};



export default PostDetailItemView;
