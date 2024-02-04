import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Constants/Colors';
import {ConstantStyles} from '../../Constants/Styles';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {Font} from '../../Constants/font';

const Header = ({navigation, title, image}) => {
  // render Function

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Ionicons
          name="menu"
          size={scale(30)}
          color={Colors.PrimaryBlue}
          onPress={() => navigation.openDrawer()}
          style={{alignSelf: 'center'}}
        />
        <View style={{marginLeft: scale(20)}}>
          <Text
            style={{
              color: Colors.Gray,
              fontFamily: Font.Poppins700,
              fontSize: scale(15),
            }}>
            Hello, Developer
          </Text>
          <Text
            style={{
              color: Colors.Black,
              fontFamily: Font.Poppins800,
              fontSize: scale(18),
            }}>
            Dashboard
          </Text>
        </View>
      </View>
      <TouchableOpacity 
      onPress={()=>navigation.navigate("Profile-Home")}
      style={styles.profileImage}>
        <Image
          source={require('../../Assets/Images/icon.jpg')}
          style={ConstantStyles.bannerImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PaleBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    height: scale(80),
    borderBottomLeftRadius: scale(15),
    borderBottomRightRadius: scale(15),
  },
  profileImage: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(100),
    overflow: 'hidden',
  },
});
export default Header;
