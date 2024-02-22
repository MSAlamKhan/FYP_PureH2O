import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../Constants/Colors';
import { Font } from '../Constants/font';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ConstantStyles } from '../Constants/Styles';

const BalanceCard = props => {

  console.log("props.user.role_id",props.user);
  //render Function

  return (
    <>
      <View style={styles.TopCard}>
        <View style={{ marginVertical: scale(10) }}>
          <Text
            style={{
              color: Colors.PrimaryBlue,
              fontSize: scale(15),
              fontFamily: Font.Gilroy500,
            }}>
            Total Balance
          </Text>
        </View>
        <Text
          style={{
            fontSize: scale(30),
            fontFamily: Font.Gilroy600,
            color: Colors.PrimaryBlue,
          }}>
          Rs.{props.user.balance}
        </Text>
      </View>
      <View style={styles.BottomCard}>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => props.user.role_id == 1 ? props.navigation.navigate("Withdraw") : props.navigation.navigate("Recharge")}
            style={[
              styles.ImageIcon,
              {
                width: scale(51),
              },
            ]}>
            <Image
              source={require('../Assets/Images/addIcon.png')}
              style={ConstantStyles.bannerImage}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: scale(12), fontFamily: Font.Gilroy500 }}>
            {props.user.role_id == 1 ? "Withdraw" : "Recharge"}
          </Text>
        </View>
        {/* <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.ImageIcon,
              {
                width: scale(50),
              },
            ]}>
            <Image
              source={require('../Assets/Images/transactionIcon.png')}
              style={ConstantStyles.bannerImage}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: scale(12), fontFamily: Font.Gilroy500 }}>
            Transaction
          </Text>
        </View> */}
      </View>
    </>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  TopCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(130),
    backgroundColor: Colors.CardGreen,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
  },
  BottomCard: {
    backgroundColor: Colors.PrimaryBlue,
    height: scale(120),
    borderBottomRightRadius: scale(20),
    borderBottomLeftRadius: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttons: { alignItems: 'center', justifyContent: 'center' },

  ImageIcon: {
    height: scale(50),
    marginVertical: scale(5),
  },
});
