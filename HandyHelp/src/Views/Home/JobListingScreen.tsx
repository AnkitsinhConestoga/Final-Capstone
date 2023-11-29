import React, { useState } from "react";
import { View, StatusBar, Image, Text, TouchableOpacity } from "react-native";
import StyleView from "../../utils/StylesView";
import StringKey from "../../utils/StringsFile";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import PostItemView from "../../utils/PostItemView";
import { PlacePickerResults, pickPlace } from "react-native-place-picker";

import FirebaseDatabaseManager from "../../utils/FirebaseDatabaseManager";
import { USER } from "../../Model/UserModel";
import DatePicker from "react-native-date-picker";
import PostModel from "../../Model/PostModel";
import { Status } from "../../utils/Utils";




type JobListingScreenProps = {
    navigation: any;
};

const JobListingScreen: React.FC<JobListingScreenProps> = ({ navigation }) => {
    const [titleText, setTitleText] = useState("0 work available");
    const [cityName, setCityName] = useState('');
    const [results, setResults] = useState<PlacePickerResults>();
    const [data, setData] = useState<PostModel[]>([]);
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours()+1);
    const [date, setDate] = useState(currentDate)
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<PostModel | null>(null);
   

    const selectPlace = () => {
        pickPlace({ enableGeocoding: true, initialCoordinates: { latitude: 43.4790352, longitude: -80.5179835 } }).then((result) => {
            setResults(result);
            getCityData(result.coordinate.latitude!, result?.coordinate.longitude!);
        }).catch((error) => {
            console.log(error);
            setResults(undefined);
        });
    }

    function getCityData(lat: number, long: number) {
        FirebaseDatabaseManager.getPostData(lat, long, USER.userId).then((postResult) => {
            console.log(postResult);
            setTitleText(postResult.length + " work available");
            setData(postResult);
        });
    }

    function updateItem(){
        console.log("TAGS",selectedItem);
        if(selectedItem){
            selectedItem.scheduleData = date.toISOString();
            selectedItem.postStatus=Status.Approved;
            selectedItem.workerId=USER.userId;
            FirebaseDatabaseManager.updateStatusPostData(selectedItem.postId,selectedItem).then(()=>{
                getCityData(results?.coordinate.latitude!, results?.coordinate.longitude!);
            }).catch((error)=>{
                console.log("Error while update post details");
            })
        }
    }

    function showTimeDialog(item : PostModel){
        setOpen(true);
        setSelectedItem(item);
        console.log("TAGS",selectedItem);
        

    }


    return (
        <SafeAreaView style={StyleView.container}>
            <View style={StyleView.container}>

                <View style={[StyleView.rowContainer, { marginEnd: 10, alignSelf: 'flex-end' }]}>
                    <Text>{results ? results.address?.city : "Select a location"}</Text>
                    <TouchableOpacity onPress={selectPlace}>
                        <Text style={[StyleView.b2, { marginStart: 8 }]}>{StringKey.edit}</Text>
                    </TouchableOpacity>
                </View>
                {

                    (results) ? <View>
                        <Text style={[StyleView.b8, { marginStart: 10 }]}>{titleText}</Text>
                        <FlatList data={data} renderItem={({ item }) => <PostItemView model={item} onPostClick={() => {
                            
                                navigation.navigate('PostDetailScreen', { item });

                            
                            
                        }}  onApproveClick={()=>{
                            
                            
                            showTimeDialog(item);

                        }} onNegotiateClick={()=>{
                           
                        }}></PostItemView>}>

                        </FlatList>
                    </View> : <Text style={[StyleView.container, StyleView.b2, { textAlign: 'center', verticalAlign: 'middle' }]}>{StringKey.error_city}</Text>
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
            </View>
        </SafeAreaView>

    );
};

export default JobListingScreen;


