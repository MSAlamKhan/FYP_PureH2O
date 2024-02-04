import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Zocial from 'react-native-vector-icons/Zocial';
import { Font } from '../Constants/font';
import { Colors } from '../Constants/Colors';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.containerStyle, props.containerRestyle]}>

      {props.facebook ? (
        <MaterialIcons
          name="facebook"
          color={props.iconcolor ? props.iconcolor : Colors.ThemeBlue}
          size={scale(20)}
        />
      ) : null}

      {props.google ? (
        <AntDesign name="google" color={props.iconcolor ? props.iconcolor : Colors.ThemeBlue} size={scale(20)} />
      ) : null}

      {props.email ? (
        <Zocial name="email" color={props.iconcolor ? props.iconcolor : Colors.ThemeBlue} size={scale(20)} />
      ) : null}

      <Text style={[styles.font, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(30),
    marginTop: verticalScale(5),
    backgroundColor: Colors.PrimaryBlue,
    height: verticalScale(52),
    flexDirection: 'row',
  },

  font: {
    color: Colors.White,
    fontSize: scale(15),
    fontFamily: Font.Poppins800,
  },
});
