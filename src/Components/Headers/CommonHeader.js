import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ConstantStyles} from '../../Constants/Styles';
import {Colors} from '../../Constants/Colors';

const CommonHeader = ({navigation, title}) => {
  // render Function

  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=> navigation.goBack()}
        style={{
          borderColor: Colors.Gray,
          borderWidth: scale(0.5),
          padding: scale(5),
          borderRadius: scale(5),
        }}>
        <AntDesign name="left" size={scale(24)} color={Colors.PrimaryBlue} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width:"80%"
        }}>
        <Text style={[ConstantStyles.authText, {color: Colors.PrimaryBlue,}]}>
         {title}
        </Text>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ScreenBackGroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: scale(10),
    height: scale(80),
    borderBottomLeftRadius: scale(15),
    borderBottomRightRadius: scale(15),
  },
});
