import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ConstantStyles} from '../../Constants/Styles';
import {Colors} from '../../Constants/Colors';
import {Font} from '../../Constants/font';
import {scale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import CommonHeader from '../../Components/Headers/CommonHeader';
import BalanceCard from '../../Components/BalanceCard';
import { Transactions } from '../../Constants/StaticData';

const WalletScreen = ({navigation}) => {
  

  // render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={'Wallet'} />
      <View style={ConstantStyles.screen}>
        <BalanceCard 
        onWithdraw={()=> navigation.navigate("Withdraw")}
        />
      </View>
      <View style={styles.bottomSheet}>
        <View
          style={styles.whiteDash}
        />
        <Text
          style={styles.bottomSheetText}>
          Recent Transections
        </Text>
        <FlatList
          data={Transactions}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                // justifyContent: "space-evenly",
                backgroundColor: Colors.White,
                height: scale(80),
                width: '100%',
                flexDirection: 'row',
                marginVertical: scale(10),
                paddingHorizontal: scale(10),
                borderRadius: scale(10),
              }}>
              <View
                style={{
                  backgroundColor:
                    item.type == 'credit'
                      ? Colors.BrightGreen
                      : Colors.BrightRed,
                  height: scale(50),
                  width: scale(50),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: scale(10),
                }}>
                <Entypo
                  name="credit"
                  size={scale(24)}
                  color={
                    item.type == 'credit' ? Colors.DeepGreen : Colors.DeepRed
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  width:"80%"
                }}>
                <View>
                  <Text
                    style={{fontFamily: Font.Poppins600, color: Colors.Black}}>
                    {item.name}
                  </Text>
                  <Text
                    style={{fontFamily: Font.Poppins300, color: Colors.Black}}>
                    {item.time}
                  </Text>
                </View>
                <Text
                  style={{fontFamily: Font.Poppins600, color: Colors.Black}}>
                  {`$${item.amount}`}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1.5,
    backgroundColor: Colors.PrimaryBlue,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    paddingHorizontal: scale(10),
  },
  bottomSheetText :{
    fontFamily: Font.Gilroy600,
    color: Colors.White,
    fontSize: scale(16),
    marginBottom: scale(15),
  },
  whiteDash:{
    marginTop: scale(10),
    marginBottom: scale(15),
    alignSelf: 'center',
    borderRadius: scale(10),
    width: scale(50),
    height: scale(5),
    backgroundColor: Colors.White,
  }
});
export default WalletScreen;
