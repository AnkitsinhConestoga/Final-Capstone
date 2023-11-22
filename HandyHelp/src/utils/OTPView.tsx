import React from 'react';
import {useState, useRef} from 'react';
import {TextInput, View} from 'react-native';
import StyleView from './StylesView';

interface OTPViewProps {
  onOTPChange: (otp: string) => void;
}

const OTPView: React.FC<OTPViewProps> = ({ onOTPChange }) => {
  const [otp, setOTP] = useState(['', '', '', '', '','']);
  const inputs = Array(6)
    .fill(0)
    .map((_, index) => useRef<TextInput>(null));

  const handleInputChange = (text: string, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);

    if (text !== '' && index < 5) {
      inputs[index + 1].current?.focus();
    }
    const otpString = newOTP.join('');
    onOTPChange(otpString);
  };

  return (
    <View style={[StyleView.rowContainer, {marginHorizontal: '10%'}]}>
      {otp.map((value, index) => (
        <View
          key={index}
          style={[
            StyleView.greyBorder,
            {flex: 1, margin: 5, marginTop: '10%'},
          ]}>
          <TextInput
            key={index}
            style={[StyleView.placeHolderStyle, {textAlign: 'center'}]}
            value={value}
            onChangeText={text => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={inputs[index]}
          />
        </View>
      ))}
    </View>
  );
};

export default OTPView;
