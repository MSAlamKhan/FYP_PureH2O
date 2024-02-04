import React, {PureComponent} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ConstantStyles} from '../../Constants/Styles';
import Header from '../../Components/Headers/Header';
import LineGraph from '../../Components/Graphs/LineGraph';
import {scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../Constants/Colors';
import {Font} from '../../Constants/font';

const DashBoardScreen = ({navigation}) => {
  // render Function

  return (
    <>
      <Header navigation={navigation} title={'Developer'} image={null} />
      <ScrollView style={ConstantStyles.screen}>
        <View style={{marginVertical: verticalScale(10)}}>
          <Text
            style={ConstantStyles.graphTitle}>
            Sales Forcast
          </Text>
        </View>
        <LineGraph />
        <View style={{marginVertical: verticalScale(10)}}>
          <Text
            style={ConstantStyles.graphTitle}>
            Order Analytics
          </Text>
        </View>
        <LineGraph />
        <View
          style={{
            height: scale(50),
            backgroundColor: Colors.SecondaryBlue,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(10),
            marginVertical: scale(20),
          }}>
          <Text style={{fontFamily: Font.Poppins500, fontSize: scale(15)}}>
            {' '}
            Current Inventory : 350 Bottles
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default DashBoardScreen;
