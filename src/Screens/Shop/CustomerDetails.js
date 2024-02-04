import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {ConstantStyles} from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';

const CustomerDetailScreen = ({navigation, route}) => {
  const {customer} = route.params;

  // render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={customer.customerName} />
      <View style={ConstantStyles.screen}></View>
    </>
  );
};


export default  CustomerDetailScreen;