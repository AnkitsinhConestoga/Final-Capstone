import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import StyleView from '../utils/StylesView';
import  Icon  from 'react-native-vector-icons/FontAwesome';

interface PasswordInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
  }
  
  const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChangeText, placeholder }) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
  
    const togglePasswordVisibility = () => {
      setPasswordVisibility(!isPasswordVisible);
    };
  
    return (
      <View style={[StyleView.inputcontainer]}>
        <TextInput
          style={StyleView.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={StyleView.iconContainer}>
          <Icon
            name={isPasswordVisible ? 'eye-slash' : 'eye'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    );
  };
  

  
  export default PasswordInput;