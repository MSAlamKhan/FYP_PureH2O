import React, {PureComponent} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {ConstantStyles} from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import {CustomerArray} from '../../Constants/StaticData';
import {moderateScale, scale} from 'react-native-size-matters';
import {Colors} from '../../Constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import CustomerListTiles from '../../Components/ListTiles/CustomerListTiles';

const CustomerScreen = ({navigation}) => {
  // Render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={'My Customers'} />
      <View style={ConstantStyles.screen}>
        <View>
          <FlatList
            data={CustomerArray}
            renderItem={({item}) => <CustomerListTiles item={item} onPress={()=> navigation.navigate("Customer-Details", {customer: item})} />}
          ListFooterComponent={()=> (<View
          style={{height:scale(20)}}
          />)}
          />
          
        </View>
      </View>
    </>
  );
};

export default CustomerScreen;
