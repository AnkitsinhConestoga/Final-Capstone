import React, { useCallback, useState } from "react";
import { View, StatusBar, Image, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import StyleView from "../../utils/StylesView";
import CustomButton from "../CustomButton";
import StringKey from '../../utils/StringsFile';
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Colors from "../../utils/Colors";
import { pickPlace, PlacePickerResults, } from 'react-native-place-picker';
import { useFocusEffect } from "@react-navigation/native";
import Dialog from "../../utils/Dialog";
import BottomDialog from "../../utils/BottomDialog";
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";
import FirebaseStorageManager from "../../utils/FirebaseStorageManager";
import FirebaseDatabaseManager from "../../utils/FirebaseDatabaseManager";
import PostModel from "../../Model/PostModel";
import { USER } from "../../Model/UserModel";




type CreatePostListingScreenProps = {
    navigation: any;
};

const CreatePostListingScreen: React.FC<CreatePostListingScreenProps> = ({ navigation }) => {

    const [results, setResults] = useState<PlacePickerResults>();

    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postDesc, setPostDesc] = useState('');
    const [errorMessage, seterrorMessage] = React.useState('');
    const [dialogTitle, setdialogTitle] = React.useState('');

    const [selectedImage, setSelectedImage] = useState<string[]>([]);
    const [bottomDialogVisible, setBottomDialogVisible] = useState(false);

    useFocusEffect(() => {
        setIsLoadingVisible(false);
    });



    const closeDialog = () => {
        // Handle checkbox state change
        console.log(`Error shown: `);
        setIsDialogVisible(false);
    };
    const openDialog = () => {
        console.log("Dialog open");
        if(isLoadingVisible){
            setIsLoadingVisible(false);
        }
        setIsDialogVisible(true);
    };

    const showBottomDialog = () => {
        setBottomDialogVisible(true);
    };

    const closeBottomDialog = () => {
        setBottomDialogVisible(false);
    };

    const removeImage = (index: number) => {
        const updatedImages = [...selectedImage];
        updatedImages.splice(index, 1);
        setSelectedImage(updatedImages);
    };

    const OpenCamera = async () => {

        // Handle Option 1 Press
        closeBottomDialog();
        const options: ImageLibraryOptions = {
            selectionLimit: 1,
            mediaType: 'photo' || "video",
            quality: 0.6,
            includeBase64: false
        };

        await launchCamera(options, res => {
            if (res.didCancel) {
                console.log('User cancelled')
            } else if (res.errorCode) {
                console.log('ImagePickerError: ', res.errorMessage)
            } else {
                console.log("image", res);
                let imageUri = res.assets?.[0]?.uri;
                if (imageUri) {
                    setSelectedImage([...selectedImage, imageUri]);

                }
            }
        });
    };

    const OpenImageLibrary = useCallback(async () => {
        closeBottomDialog();
        const options: ImageLibraryOptions = {
            selectionLimit: 1,
            mediaType: 'photo' || "video",
            quality: 0.6,
            includeBase64: false
        };

        await launchImageLibrary(options, res => {
            if (res.didCancel) {
                console.log('User cancelled')
            } else if (res.errorCode) {
                console.log('ImagePickerError: ', res.errorMessage)
            } else {
                console.log("image", res);
                let imageUri = res.assets?.[0]?.uri;
                if (imageUri) {
                    setSelectedImage([...selectedImage, imageUri]);
                }
            }
        });
    }, []);



    const selectPlace = () => {
        pickPlace({ enableGeocoding: true, initialCoordinates: { latitude: 43.4790352, longitude: -80.5179835 } }).then(setResults).catch((error) => {
            console.log(error);
            setResults(undefined);
        });
    }

    const handleCheckboxChange = (checked: boolean) => {
        // Handle checkbox state change
        setIsChecked(checked);
    };

    const createPost = async () => {

        if (selectedImage.length <= 0) {
            seterrorMessage(StringKey.error_post_image);
            setdialogTitle(StringKey.error);
            openDialog();
            return;
        }
        if (!postTitle) {
            seterrorMessage(StringKey.error_po_title);
            setdialogTitle(StringKey.error);
            openDialog();
            return;
        }
        if (!postPrice) {
            seterrorMessage(StringKey.error_po_price);
            setdialogTitle(StringKey.error);
            openDialog();
            return;
        }
        if (!postDesc) {
            seterrorMessage(StringKey.error_po_desc);
            setdialogTitle(StringKey.error);
            openDialog();
            return;
        }


        if (!results) {
            seterrorMessage(StringKey.error_location);
            setdialogTitle(StringKey.error);
            openDialog();
            return;
        }

        setIsLoadingVisible(true);

        const PostId = FirebaseDatabaseManager.generateId();
        console.log("post id is ", PostId);
        if (PostId) {
            const ImageUrls: string[] = await FirebaseStorageManager.savePostMedia(selectedImage, PostId);
            if (ImageUrls.length > 0) {

                const myPost: PostModel = {
                    postTitle: postTitle,
                    postPrice: Number(postPrice),
                    postDesc: postDesc,
                    postLat: results.coordinate.latitude,
                    postLong: results.coordinate.longitude,
                    postStreet: results.address?.streetName!,
                    postPostal: results.address?.zipCode!,
                    createdDate: new Date(),
                    postImages: ImageUrls,
                    postId: PostId,
                    authorId: USER.userId,
                    isForVerified: isChecked
                };

                await FirebaseDatabaseManager.savePostData(PostId, myPost).then(() => {
                    setIsLoadingVisible(false);
                    console.log("data updated");
                    setdialogTitle(StringKey.success);
                    seterrorMessage(StringKey.post_created);
                    resetValue();
                    openDialog();
                    
                }).catch(error => {
                    setIsLoadingVisible(false);
                    console.log(error);
                    setdialogTitle(StringKey.error);
                    seterrorMessage(error);
                    resetValue();
                    openDialog();
                });
            } else {
                console.log('empty image url');
                setIsLoadingVisible(false);
                setdialogTitle(StringKey.error);
                seterrorMessage("error while uploading image");
                
                openDialog();
            }
        } else {
            setIsLoadingVisible(false);
            console.log("error at gernerting id");
            setdialogTitle(StringKey.error);
            seterrorMessage("error while geting id");
            openDialog();
        }
    }

    const resetValue =()=>{
        setResults(undefined);
        setIsLoadingVisible(false);
        setIsChecked(false);
        setPostTitle('');
        setPostDesc('');
        setPostPrice('');
       
        setSelectedImage([]);
        
        
    }





    return (
        <SafeAreaView style={StyleView.container}>
            <ScrollView style={StyleView.container}>
                {
                    (isLoadingVisible) ?

                        <View style={StyleView.preloader}>
                            <ActivityIndicator size="large" color={Colors.colorfb} />
                        </View>

                        : null
                }
                {

                    (selectedImage.length > 0) ? <FlatList style={{ width: '100%', height: '35%', marginTop: 10 }} horizontal={true} data={selectedImage} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                        <View style={{

                            width: 250, marginTop: 20, marginEnd: 25
                        }}>

                            <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={{ uri: item }} />
                            <TouchableOpacity onPress={() => removeImage(index)} >
                                <View style={[StyleView.circularborderStyle, { margin: 5, padding: 5, top: -260, right: -5, position: 'absolute', backgroundColor: Colors.chatGreyTextColor }]}>
                                    <Image style={[{ width: 15, height: 15, alignSelf: 'flex-end' }]} source={require('../../assets/images/close_btn.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    } /> : <Image style={{ width: '100%', height: '35%', marginTop: 10, resizeMode: 'cover' }} source={require('../../assets/images/upload_image.png')} />

                }<TouchableOpacity onPress={showBottomDialog}><Text style={[StyleView.text, { color: Colors.colorfb, fontSize: 18 }]}>{StringKey.upload_photo}</Text></TouchableOpacity>
                <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        value={postTitle}
                        placeholderTextColor={Colors.greyd0}
                        onChangeText={setPostTitle}
                        placeholder={StringKey.Title}
                    />
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput
                        style={StyleView.placeHolderStyle}
                        placeholderTextColor={Colors.greyd0}
                        value={postPrice}
                        onChangeText={(text) => {
                            const sanitizedText = text.replace(/[^0-9.]/g, '');
                            const parts = sanitizedText.split('.');

                            if (parts.length > 1) {
                                parts[1] = parts[1].slice(0, 2);
                            }

                            const formattedText = parts.join('.'); if (/^\d+(\.\d*)?$/.test(formattedText)) {
                                setPostPrice(formattedText);
                            }
                        }}
                        keyboardType="numeric"
                        placeholder={StringKey.Price}
                    />
                </View>
                <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
                    <TextInput
                        multiline={true} numberOfLines={5}
                        value={postDesc}
                        style={[StyleView.placeHolderStyle, { textAlignVertical: 'top' }]}
                        placeholderTextColor={Colors.greyd0}
                        onChangeText={setPostDesc}
                        placeholder={StringKey.description}
                    />
                </View>
                <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.location}</Text>
                <View style={[StyleView.rowContainer, { marginStart: 10 }]}>
                    <Text>{results ? results.address?.zipCode : "Select a location"}</Text>
                    <TouchableOpacity onPress={selectPlace}>
                        <Text style={[StyleView.b2, { marginStart: 8 }]}>{StringKey.edit}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[StyleView.t4, { alignSelf: 'flex-start', marginStart: 10, marginTop: 15 }]}>{StringKey.tac}</Text>
                <Text style={[StyleView.text, { width: '90%', alignSelf: 'center', textAlign: 'left' }]}>
                    Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt
                    eleifend vitaeLorem ipsum dolor sit amet consectetur.
                    Ultrici es tincidunt eleifend vitaeLorem ipsum dolor sit amet
                    consectetur. Ultrici es tincidunt eleifend vitaeLorem ipsum
                    dolor sit amet consectetur. Ultrici es tincidunt eleifend
                    vitaeLorem ipsum dolor sit amet consectetur. Ultrici es
                    tincidunt eleifend vitae
                </Text>
                <View style={[StyleView.rowContainer, { marginStart: 10, marginTop: 10 }]}>
                    <TouchableOpacity onPress={() => handleCheckboxChange(!isChecked)}>
                        <Image source={isChecked ? require('../../assets/images/checked_circle.png') : require('../../assets/images/check_circle.png')} style={StyleView.iconStyle} />
                    </TouchableOpacity>


                    <Text style={[StyleView.b8, { width: '90%' }]}>
                        {StringKey.only_verified}

                    </Text>
                </View>
                <View style={{ flex: 1 }} />


                <CustomButton
                    text={StringKey.upload}
                    textTheme={StyleView.b1}
                    btnTheme={[StyleView.B1, { marginTop: 18, }]}
                    btnClick={createPost}
                />

                <View style={{ height: 70 }}></View>

                <Dialog
                    visible={isDialogVisible}
                    title={dialogTitle}
                    content={errorMessage}
                    onClose={closeDialog}
                />
                <BottomDialog
                    visible={bottomDialogVisible}
                    onClose={closeBottomDialog}
                    onOption1Press={OpenCamera}
                    onOption2Press={OpenImageLibrary}
                />

            </ScrollView>

        </SafeAreaView>
    );
};

export default CreatePostListingScreen;
