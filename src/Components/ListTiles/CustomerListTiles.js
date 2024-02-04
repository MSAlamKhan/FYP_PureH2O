import {Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';

const {default: LinearGradient} = require('react-native-linear-gradient');
const {Colors} = require('../../Constants/Colors');
const {ConstantStyles} = require('../../Constants/Styles');

const CustomerListTiles = ({item, onPress}) => {
    console.log();
  // render Function
  return (
    <TouchableOpacity
      onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Colors.SecondaryBlue, Colors.PaleBlue]}
        style={ConstantStyles.listTile}>
        <View style={ConstantStyles.listTileImage}>{/* <Image/> */}</View>
        <View style={{marginLeft: scale(10)}}>
          <Text style={ConstantStyles.listTileTitle}>{item.customerName}</Text>
          <Text style={ConstantStyles.listTileSubText}>
            {item.customerAddress}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomerListTiles;
