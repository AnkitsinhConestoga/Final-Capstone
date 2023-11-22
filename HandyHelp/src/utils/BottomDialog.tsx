import React from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import StyleView from "./StylesView";
import StringKey from "./StringsFile";
import CustomButton from "../Views/CustomButton";

interface BottomDialogProps {
  visible: boolean;
  onClose: () => void;
  onOption1Press: () => void;
  onOption2Press: () => void;
}
const BottomDialog: React.FC<BottomDialogProps> = ({ visible, onClose, onOption1Press, onOption2Press }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={StyleView.dialogContainer}>
        <View style={StyleView.bottomDialog}>

          <CustomButton
            text={StringKey.choose_camera}
            textTheme={StyleView.b1}
            btnTheme={[StyleView.B1, { marginTop: '5%' }]}
            btnClick={onOption1Press}
          />
          <CustomButton
            text={StringKey.choose_library}
            textTheme={StyleView.b1}
            btnTheme={[StyleView.B1, { marginTop: '5%' }]}
            btnClick={onOption2Press}
          />
          <CustomButton
            text={StringKey.cancel}
            textTheme={StyleView.b2}
            btnTheme={[StyleView.B2, { marginTop: '5%' }]}
            btnClick={onClose}
          />

        </View>
      </View>
    </Modal>
  );
};

export default BottomDialog;