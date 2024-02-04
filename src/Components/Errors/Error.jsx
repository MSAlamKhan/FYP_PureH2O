import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { verticalScale,scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { Font } from '../../Constants/font';

const Error = props => {
  return (
    <View style={styles.Container}>
      <Feather name={'info'} size={scale(20)} color={'red'} />

      <Text style={[styles.error,props.textStyle]}>{props.text}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  Container:{flexDirection: 'row', marginTop: verticalScale(5)},
  error: {
    color: 'red',
    fontSize: scale(12),
    marginLeft: scale(5),
    marginBottom: verticalScale(-10),
    fontFamily: Font.Manrope400,
    top: verticalScale(1.5)
  },
});
