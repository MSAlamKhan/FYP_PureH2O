import React, { PureComponent, useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import { ServerContainer, useFocusEffect } from '@react-navigation/native';
import Services from '../../Api/Services';
import { scale } from 'react-native-size-matters';
import { Font } from '../../Constants/font';
import { Colors } from '../../Constants/Colors';

const CustomerDetailScreen = ({ navigation, route }) => {
  const { customer } = route.params;


  const [order, setOrders] = useState();
  const [orderLoader, setOrderLoader] = useState(false);

  useFocusEffect(useCallback(() => {
    setOrderLoader(true)
    Services.getOrders(customer.id, setOrderLoader, setOrders)
  }, []))

  // render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={customer.customerName} />
      <View style={ConstantStyles.screen}>
        <View style={styles.bottomSheet}>
          <Text
            style={styles.bottomSheetText}>
            Orders History
          </Text>
          {!orderLoader ? <FlatList
            data={order?.reverse()}
            renderItem={({ item }) => {
              return (
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
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      width: "80%"
                    }}>
                    <View>
                      <Text
                        style={{ fontFamily: Font.Poppins600, color: Colors.Black }}>
                        Bottles : {item.bottles}
                      </Text>
                      <Text
                        style={{ fontFamily: Font.Poppins300, color: Colors.Black }}>
                        Payment : {item.payment_Status}
                      </Text>

                    </View>
                    <Text
                      style={{ fontFamily: Font.Poppins600, color: Colors.Black }}>
                      {`RPs. ${item.amount}`}
                    </Text>
                  </View>
                  {/* {item.payment_Status != "Paid" && <TouchableOpacity style={{ backgroundColor: Colors.CardGreen, paddingHorizontal: scale(5), paddingVertical: scale(10), borderRadius: scale(10), }}
                    onPress={() => onPayment(item)}
                  >
                    <Text>Pay Now</Text>
                  </TouchableOpacity>} */}
                </View>
              )
            }}
          /> : <ActivityIndicator size={"large"} color={Colors.PrimaryBlue} />}
        </View>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  buttonStyle: { height: scale(90), borderRadius: scale(10), alignItems: "center", justifyContent: "flex-start", flexDirection: "row", padding: scale(20), marginBottom: scale(10) },
  buttonTextStyle: {
    fontFamily: Font.Poppins500,
    fontSize: scale(20),
    marginLeft: scale(30)
  }, bottomSheetText: {
    fontFamily: Font.Gilroy600,
    color: Colors.PrimaryBlue,
    fontSize: scale(16),
    marginTop: scale(15),
  }, bottomSheet: {
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    paddingHorizontal: scale(10),
  }
})

export default CustomerDetailScreen;