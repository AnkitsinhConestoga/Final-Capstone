import React, { useState, ReactNode } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import StyleView from './StylesView';
import StringKey from './StringsFile';
import CustomButton from '../Views/CustomButton';
interface DialogProps {
    visible: boolean;
    title?: string;
    content?: ReactNode;
    onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ visible, title, content, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={StyleView.dialogcontainer}>
                <View style={StyleView.dialog}>
                    <Pressable onPress={onClose}>
                        <Image source={require('../assets/images/close_btn.png')} style={{ alignSelf: 'flex-end', width: 16, height: 16, resizeMode: 'contain' }} />

                    </Pressable>
                    <Image source={require('../assets/images/offer_success.png')} style={{ alignSelf: 'center', width: '40%', height: '40%', resizeMode: 'contain' }} />
                    <Text style={[StyleView.t1, { textAlign: 'center' }]}>{title}</Text>
                    <Text style={[StyleView.t2, { textAlign: 'center', marginTop: 10 ,fontSize:14}]}>{content}</Text>

                    <CustomButton text={StringKey.back_home} textTheme={[StyleView.b1,]} btnTheme={[StyleView.B1, { marginTop: 20, }]} btnClick={onClose } ></CustomButton>
                
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({


    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginBottom: 8,
    },
    content: {
        marginBottom: 8,
    },
    closeButton: {
        alignItems: 'center',
    },
});

export default Dialog;
