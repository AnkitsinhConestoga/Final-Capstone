import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View, Dimensions, Platform, PanResponder, SafeAreaView } from 'react-native';

import StringKey from './StringsFile';
import BackView from '../Views/BackButtonView';
import StyleView from './StylesView';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';


type ImageUrlNavigationProp = StackNavigationProp<RootStackParamList, 'ZoomableImages'>;
type ImageUrlRouteProps = RouteProp<RootStackParamList, 'ZoomableImages'>;



type FullScreenImageProps = {
    route: ImageUrlRouteProps,
    navigation: ImageUrlNavigationProp
};

const FullScreenImageViewer: React.FC<FullScreenImageProps> = ({ route,navigation }) => {
    const [currentScale, setCurrentScale] = useState(1);
    const [lastScale, setLastScale] = useState(1);
    const {dataList,currentIndex} =  route.params;

    // For Android, you'd need to use PanResponder to handle pinch and zoom
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event) => {
                if (event.nativeEvent.changedTouches.length > 1) {
                    const touches = event.nativeEvent.changedTouches;
                    const touch1 = touches[0];
                    const touch2 = touches[1];

                    // Calculate the distance between two fingers
                    const distance = Math.sqrt(
                        Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2),
                    );

                    // You would need to calculate the scale based on the distance and set it
                    // This is a simplification
                    const scale = distance / 200; // You need a function to calculate the scale correctly

                    setCurrentScale(scale > 1 ? lastScale * scale : lastScale / scale);
                }
            },
            onPanResponderRelease: () => {
                // Set the last scale when the fingers are released
                setLastScale(currentScale);
            },
        }),
    ).current;
    
    return (
        <SafeAreaView style={StyleView.container}>
            <View>
                <BackView
                    text={StringKey.Back}
                    btnClick={() => navigation.goBack()}
                />
                <View style={styles.container}>
                    
                </View>
            </View>
        </SafeAreaView>
    );
};

const windowDimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    scrollViewContent: {
        height: windowDimensions.height,
        width: windowDimensions.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: windowDimensions.width,
        height: windowDimensions.height,
        backgroundColor: '#454545',
    },
});

export default FullScreenImageViewer;