import { Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

const { default: LinearGradient } = require('react-native-linear-gradient');
const { Colors } = require('../../Constants/Colors');
const { ConstantStyles } = require('../../Constants/Styles');

import Ionicons from 'react-native-vector-icons/Ionicons';

const VendorListTiles = ({ item, vendor, setVendor }) => {

  // render Function
  return (
    <TouchableOpacity
      onPress={() => setVendor(item.id)}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[Colors.SecondaryBlue, Colors.PaleBlue]}
        style={[ConstantStyles.listTile, { flexDirection: "row", justifyContent: "space-between" }]}>
        <View style={{ marginLeft: scale(10) }}>
          <Text style={ConstantStyles.listTileTitle}>{item.shopName}</Text>
          <Text style={ConstantStyles.listTileSubText}>
            Address : {item.shopAddress}
          </Text>
          <Text style={ConstantStyles.listTileSubText}>
            Contact : {item.phoneNumber}
          </Text>
        </View>
        {vendor == item.id &&
          <View style={{ marginRight: scale(10) }}>
            <Ionicons name="checkmark-done" size={24} color={Colors.PrimaryBlue} />
          </View>
        }
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default VendorListTiles;
