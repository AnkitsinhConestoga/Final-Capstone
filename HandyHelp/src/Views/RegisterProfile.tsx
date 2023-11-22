import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import StyleView from '../utils/StylesView';
import StringKey from '../utils/StringsFile';
import BackView from './BackButtonView';
import Colors from '../utils/Colors';
import CustomButton from './CustomButton';
import Picker from 'react-native-picker-select';
import ImagePicker, { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BottomDialog from '../utils/BottomDialog';
import { USER } from '../Model/UserModel';
import Dialog from '../utils/Dialog';
import FirebaseStorageManager from '../utils/FirebaseStorageManager';
import FirebaseDatabaseManager from '../utils/FirebaseDatabaseManager';
import { postalPattern } from '../utils/Utils';

type ProfileRegProp = {
  navigation: any;
};

const ProfileReg: React.FC<ProfileRegProp> = ({ navigation }) => {
  const [fullname, setfullName] = React.useState('');
  const [Street, setStreet] = React.useState('');
  const [City, setCity] = React.useState('');
  const [Postal, setPostal] = React.useState('');
  const [profileImage, setProfileImage] = useState(null||'');
  const [bottomDialogVisible, setBottomDialogVisible] = useState(false);

  //For dialog
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [errorMessage, seterrorMessage] = React.useState('');
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

  const openDialog = () => {
    console.log("Dialog open");
    setIsDialogVisible(true);
  };
  const closeDialog = () => {
    // Handle checkbox state change
    console.log(`Error shown: `);
    setIsDialogVisible(false);
  };

  const showBottomDialog = () => {
    setBottomDialogVisible(true);
  };

  const closeBottomDialog = () => {
    setBottomDialogVisible(false);
  };

  const OpenCamera = async () => {

    // Handle Option 1 Press
    closeBottomDialog();
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      quality:0.6,
      includeBase64: false
    };

    await launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled')
      } else if (res.errorCode) {
        console.log('ImagePickerError: ', res.errorMessage)
      } else {
        console.log("image", res);
        let imageUri =  res.assets?.[0]?.uri;
        if (imageUri) {
          setProfileImage(imageUri);
          
        }
      }
    });
  };

  const OpenImageLibrary = useCallback(async () => {
    closeBottomDialog();
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      quality:0.6,
      includeBase64: false
    };

    await launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled')
      } else if (res.errorCode) {
        console.log('ImagePickerError: ', res.errorMessage)
      } else {
        console.log("image", res);
        let imageUri =  res.assets?.[0]?.uri;
        if (imageUri) {
          setProfileImage(imageUri);
         
        }

      }
    });
  }, []);



  const registerProfile = async () => {
    if (!profileImage) {
      seterrorMessage(StringKey.error_profile_image);
      openDialog();
      return;
    }
    if (!Street) {
      seterrorMessage(StringKey.error_street);
      openDialog();
      return;
    }
    if (!City) {
      seterrorMessage(StringKey.error_city);
      openDialog();
      return;
    }

    if (!Postal) {
      seterrorMessage(StringKey.empty_postal);
      openDialog();
      return;
    }
    
    if (!postalPattern.test(Postal.replaceAll(" ", "").toLocaleLowerCase())) {
      seterrorMessage(StringKey.error_posta);
      openDialog();
      return;
    }

    setIsLoadingVisible(true);
    await FirebaseStorageManager.saveUserData(profileImage,USER.userId);
    USER.updateStreetName(Street);
    USER.updateCityName(City);
    USER.updatePostalCode(Postal);

    await FirebaseDatabaseManager.saveUserData(USER);
    setIsLoadingVisible(false);

    navigation.navigate('HomeScreen');
    

   


    
  }


  return (
    <SafeAreaView style={StyleView.container}>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      <View style={StyleView.container}>
        <BackView
          text={StringKey.Back}
          title={StringKey.profile}
          btnClick={() => {
            if (navigation.canGoBack())
              navigation.goBack();
            else
              BackHandler.exitApp();
          }}
        />

{
                        (isLoadingVisible) ?

                            <View style={StyleView.preloader}>
                                <ActivityIndicator size="large" color={Colors.colorfb} />
                            </View>

                            : null
                    }
        <View style={{ alignItems: 'center', marginTop: '10%' }}>
          <TouchableOpacity onPress={showBottomDialog}>
            
            <Image
              source={
                profileImage ? {uri:profileImage}: require('../assets/images/default-profile-image.png')
              } // Provide a default profile image
              style={StyleView.profileImage}
            />
            <View style={StyleView.cameraIcon}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../assets/images/camera-icon.png')}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={[StyleView.greyBorder, { marginTop: '10%' }]}>
          <TextInput
            style={StyleView.placeHolderStyle}
            onChangeText={setfullName}
            editable={false}
            placeholder={StringKey.full_name}
            placeholderTextColor={Colors.greyd0}

          >{USER.name}</TextInput>
        </View>

        <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
          <TextInput
            style={StyleView.placeHolderStyle}
            onChangeText={setStreet}
            placeholder={StringKey.street}
            placeholderTextColor={Colors.greyd0}
          />
        </View>

        <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
          <Picker
            style={{
              chevron: { backgroundColor: Colors.black },
              inputAndroid: { color: Colors.textColor41 },
            }}
            onValueChange={setCity}
            items={[
              { label: 'Toronto', value: 'Toronto' },
              { label: 'Ottawa', value: 'Ottawa' },
              { label: 'Mississauga', value: 'Mississauga' },
              { label: 'Hamilton', value: 'Hamilton' },
              { label: 'Brampton', value: 'Brampton' },
              { label: 'London', value: 'London' },
              { label: 'Markham', value: 'Markham' },
              { label: 'Vaughan', value: 'Vaughan' },
              { label: 'Windsor', value: 'Windsor' },
              { label: 'Kitchener', value: 'Kitchener' },
              { label: 'Barrie', value: 'Barrie' },
              { label: 'Kingston', value: 'Kingston' },
              { label: 'Guelph', value: 'Guelph' },
              { label: 'Cambridge', value: 'Cambridge' },
              { label: 'Waterloo', value: 'Waterloo' },
              { label: 'St. Catharines', value: 'St. Catharines' },
              { label: 'Niagara Falls', value: 'Niagara Falls' },
              { label: 'Burlington', value: 'Burlington' },
              { label: 'Oakville', value: 'Oakville' },
              { label: 'Richmond Hill', value: 'Richmond Hill' },
            ]}
            placeholder={{ label: StringKey.City, value: null }}
          />
        </View>

        <View style={[StyleView.greyBorder, { marginTop: '5%' }]}>
          <TextInput
            style={StyleView.placeHolderStyle}
            onChangeText={setPostal}
            placeholder={StringKey.Postal_code}
            placeholderTextColor={Colors.greyd0}
          />
        </View>

        <View style={{ flex: 1 }} />
        <View style={StyleView.rowContainer}>
          <CustomButton
            text={StringKey.cancel}
            textTheme={StyleView.b2}
            btnTheme={[StyleView.B2, { flex: 1, margin: 8 }]}
            btnClick={() => {
              if (navigation.canGoBack())
                navigation.goBack();
              else
                BackHandler.exitApp();

            }}
          />

          <CustomButton
            text={StringKey.save}
            textTheme={StyleView.b1}
            btnTheme={[StyleView.B1, { flex: 1, margin: 8 }]}
            btnClick={registerProfile}
          />
        </View>
        <Dialog
          visible={isDialogVisible}
          title={StringKey.error}
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
};

export default ProfileReg;


