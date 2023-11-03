import React, {useState} from 'react';
import {
  Alert,
  Image,
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
import ImagePicker from 'react-native-image-picker';

type ProfileRegProp = {
  navigation: any;
};

const ProfileReg: React.FC<ProfileRegProp> = ({navigation}) => {
  const [fullname, setfullName] = React.useState('');
  const [Street, setStreet] = React.useState('');
  const [City, setCity] = React.useState('');
  const [Postal, setPostal] = React.useState('');
  const [profileImage, setProfileImage] = useState(null);

  const selectImage = () => {
    const options = {
      title: 'Select Profile Picture',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // ImagePicker.launchImageLibrary(options, response => {
    //     if (response.didCancel) {
    //         console.log('User canceled image picker');
    //     } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     } else {
    //         // Set the selected image as the new profile image
    //         setProfileImage({ uri: response.uri });
    //     }
    // });
  };

  return (
    <SafeAreaView style={StyleView.container}>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      <View style={StyleView.container}>
        <BackView
          text={StringKey.Back}
          title={StringKey.profile}
          btnClick={() => navigation.goBack()}
        />

        <View style={{alignItems: 'center', marginTop: '10%'}}>
          <TouchableOpacity onPress={selectImage}>
            <Image
              source={
                profileImage ||
                require('../assets/images/default-profile-image.png')
              } // Provide a default profile image
              style={StyleView.profileImage}
            />
            <View style={StyleView.cameraIcon}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../assets/images/camera-icon.png')}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={[StyleView.greyBorder, {marginTop: '10%'}]}>
          <TextInput
            style={StyleView.placeHolderStyle}
            onChangeText={setfullName}
            placeholder={StringKey.full_name}
            placeholderTextColor={Colors.greyd0}
          />
        </View>

        <View style={[StyleView.greyBorder, {marginTop: '5%'}]}>
          <TextInput
            style={StyleView.placeHolderStyle}
            onChangeText={setStreet}
            placeholder={StringKey.street}
            placeholderTextColor={Colors.greyd0}
          />
        </View>

        <View style={[StyleView.greyBorder, {marginTop: '5%'}]}>
          <Picker
            style={{
              chevron: {backgroundColor: Colors.black},
              inputAndroid: {color: Colors.textColor41},
            }}
            onValueChange={setCity}
            items={[
              {label: 'Toronto', value: 'Toronto'},
              {label: 'Ottawa', value: 'Ottawa'},
              {label: 'Mississauga', value: 'Mississauga'},
              {label: 'Hamilton', value: 'Hamilton'},
              {label: 'Brampton', value: 'Brampton'},
              {label: 'London', value: 'London'},
              {label: 'Markham', value: 'Markham'},
              {label: 'Vaughan', value: 'Vaughan'},
              {label: 'Windsor', value: 'Windsor'},
              {label: 'Kitchener', value: 'Kitchener'},
              {label: 'Barrie', value: 'Barrie'},
              {label: 'Kingston', value: 'Kingston'},
              {label: 'Guelph', value: 'Guelph'},
              {label: 'Cambridge', value: 'Cambridge'},
              {label: 'Waterloo', value: 'Waterloo'},
              {label: 'St. Catharines', value: 'St. Catharines'},
              {label: 'Niagara Falls', value: 'Niagara Falls'},
              {label: 'Burlington', value: 'Burlington'},
              {label: 'Oakville', value: 'Oakville'},
              {label: 'Richmond Hill', value: 'Richmond Hill'},
            ]}
            placeholder={{label: StringKey.City, value: null}}
          />
        </View>

        <View style={[StyleView.greyBorder, {marginTop: '5%'}]}>
          <TextInput
            style={StyleView.placeHolderStyle}
            onChangeText={setPostal}
            placeholder={StringKey.Postal_code}
            placeholderTextColor={Colors.greyd0}
          />
        </View>

        <View style={{flex: 1}} />
        <View style={StyleView.rowContainer}>
          <CustomButton
            text={StringKey.cancel}
            textTheme={StyleView.b2}
            btnTheme={[StyleView.B2, {flex: 1, margin: 8}]}
            btnClick={() => {
              navigation.goBack();
            }}
          />

          <CustomButton
            text={StringKey.save}
            textTheme={StyleView.b1}
            btnTheme={[StyleView.B1, {flex: 1, margin: 8}]}
            btnClick={() => {
              // navigation.navigate('Login');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileReg;
