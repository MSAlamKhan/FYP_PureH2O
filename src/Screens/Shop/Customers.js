import React, { PureComponent, useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import { CustomerArray } from '../../Constants/StaticData';
import { moderateScale, scale } from 'react-native-size-matters';
import { Colors } from '../../Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import CustomerListTiles from '../../Components/ListTiles/CustomerListTiles';
import { useFocusEffect } from '@react-navigation/native';
import Services from '../../Api/Services';
import { useSelector } from 'react-redux';
import { Font } from '../../Constants/font';

const CustomerScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);

  const [customers, setCustomers] = useState();
  const [screenLoader, setScreenLoader] = useState(false);

  useFocusEffect(useCallback(() => {
    setScreenLoader(true);
    Services.getCustomers(user.id, setCustomers, setScreenLoader)
  }, []))

  // Render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={'My Customers'} />
      <View style={ConstantStyles.screen}>
        <View>
          {!screenLoader ? <FlatList
            data={customers}
            renderItem={({ item }) => <CustomerListTiles item={item} onPress={() => navigation.navigate("Customer-Details", { customer: item })} />}
            ListFooterComponent={() => (<View
              style={{ height: scale(20) }}

            />)}

            ListEmptyComponent={() => <Text
              style={{
                fontFamily: Font.Poppins700,
                color: Colors.Black,
                fontSize: scale(15),
                textAlign: "center"
              }}
            >Sorry, you currently do not have any customers</Text>}

          /> : <ActivityIndicator size={"large"} color={Colors.PrimaryBlue} />}

        </View>
      </View>
    </>
  );
};

export default CustomerScreen;
