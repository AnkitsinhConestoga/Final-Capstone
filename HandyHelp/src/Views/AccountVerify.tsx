import { FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native"
import StyleView from "../utils/StylesView"
import StringKey from "../utils/StringsFile"
import React, { useCallback, useState } from "react"
import { View } from "react-native"
import BackView from "./BackButtonView"
import Dialog from "../utils/Dialog"

import FirebaseDatabaseManager from "../utils/FirebaseDatabaseManager"
import { USER } from "../Model/UserModel"

import BottomDialog from "../utils/BottomDialog"
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker"
import Colors from "../utils/Colors"
import CustomButton from "./CustomButton"
import FirebaseStorageManager from "../utils/FirebaseStorageManager"


type AccountVerifyProp = {
    navigation: any
}

const AccountVerify: React.FC<AccountVerifyProp> = ({ navigation }) => {


    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [errorMessage, seterrorMessage] = React.useState('');
    const [profession, setProfession] = React.useState('');
    const [selectedImage, setSelectedImage] = useState<string[]>([]);

    const [bottomDialogVisible, setBottomDialogVisible] = useState(false);



    const openDialog = () => {
        console.log("Dialog open");
        setIsDialogVisible(true);
    };

    const closeDialog = () => {
        setIsDialogVisible(false);
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
                const imageUri: string = res.assets?.[0]?.uri!;
                if (imageUri) {
                    // selectedImage.push(imageUri);
                    setSelectedImage(prevImages => [...prevImages, imageUri]);
                    console.log("total images ", selectedImage.length);
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
                const imageUri: string = res.assets?.[0]?.uri!;
                if (imageUri) {
                    // selectedImage.push(imageUri);
                    setSelectedImage(prevImages => [...prevImages, imageUri]);
                    console.log("total images ", selectedImage.length);
                }
            }
        });
    }, []);

    const removeImage = (index: number) => {
        const updatedImages: string[] = [];
        updatedImages.push(...selectedImage);
        updatedImages.splice(index, 1);
        setSelectedImage(updatedImages);
    };



    const submitVerification = async () => {
        if(!profession){
            seterrorMessage(StringKey.error_pofession);
            openDialog();
            return; 
        }

        if(selectedImage.length<2){
            seterrorMessage(StringKey.select_valid_photo);
            openDialog();
            return;            
        }
    

        const ImageUrls: string[] = await FirebaseStorageManager.saveVeriDocument(selectedImage, USER.userId);
        if (ImageUrls.length > 0) {
            const myPost:any={
                images:ImageUrls,
                userId:USER.userId,
                name:USER.name,
                professionName:profession,
                user:USER
            }
            const PostId = FirebaseDatabaseManager.generateVId();
            await FirebaseDatabaseManager.saveVeriData( PostId,myPost).then(() => {
               
                console.log("data updated");
                
                seterrorMessage(StringKey.post_created);
                resetValue();
                openDialog();

            })
        }


    }

    const showBottomDialog = () => {
        setBottomDialogVisible(true);
    };

    const closeBottomDialog = () => {
        setBottomDialogVisible(false);
    };


    const resetValue = () => {
        setSelectedImage([]);
        setProfession('');
        


    }

    return (
        <SafeAreaView style={StyleView.container}>
            <View style={StyleView.container}>
                <BackView
                    text={StringKey.Back}
                    title={StringKey.acc_verify}
                    btnClick={() => navigation.goBack()}
                />
                <View style={[{ marginTop: '5%', alignItems: 'center' }]}>
                    <Text style={StyleView.placeHolderStyle} >{StringKey.info_acc_verify}</Text>

                </View>
                <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
                    <TextInput style={StyleView.placeHolderStyle} onChangeText={setProfession} value={profession} placeholder={StringKey.place_profess} placeholderTextColor={Colors.greyd0} ></TextInput>
                </View>
                {


                    (selectedImage.length > 0) ? <FlatList style={{ width: '100%', height: '35%', marginTop: 10 }} horizontal={true} data={selectedImage} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) =>
                        <View style={{

                            width: 250, marginTop: 20, marginEnd: 25
                        }}>

                            <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={{ uri: item }} />
                            <TouchableOpacity onPress={() => removeImage(index)} >
                                <View style={[StyleView.circularborderStyle, { margin: 5, padding: 5, top: -260, right: -5, position: 'absolute', backgroundColor: Colors.chatGreyTextColor }]}>
                                    <Image style={[{ width: 15, height: 15, alignSelf: 'flex-end' }]} source={require('../assets/images/close_btn.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    } /> : <Image style={{ width: '100%', height: '35%', marginTop: 10, resizeMode: 'cover' }} source={require('../assets/images/upload_image.png')} />

                }

                <CustomButton
                    text={StringKey.select_photo}
                    textTheme={StyleView.b1}
                    btnTheme={[StyleView.B1, { marginTop: '5%' }]}
                    btnClick={showBottomDialog}
                />
                <CustomButton
                    text={StringKey.upload}
                    textTheme={StyleView.b1}
                    btnTheme={[StyleView.B1, { marginTop: '5%' }]}
                    btnClick={submitVerification}
                />

                <Dialog
                    visible={isDialogVisible}
                    title={StringKey.send_successful}
                    content={errorMessage}
                    onClose={closeDialog}
                />
                <BottomDialog
                    visible={bottomDialogVisible}
                    onClose={closeBottomDialog}
                    onOption1Press={OpenCamera}
                    onOption2Press={OpenImageLibrary}
                />
            </View>

        </SafeAreaView>
    );
}

export default AccountVerify;