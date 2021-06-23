import React from 'react';
import { View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TextField1 = (props) => {
  return (
    <TextField
    label={props.label}
    fontSize={wp('4.5%')}
    value={props.value}
    textColor='#404549'
    baseColor='#404549'
    tintColor='#70ae95'
    onChangeText={props.onChangeText}
  
    />
  );
};

export { TextField1 };
