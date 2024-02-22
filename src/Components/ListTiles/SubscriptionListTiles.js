import { Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

const { default: LinearGradient } = require('react-native-linear-gradient');
const { Colors } = require('../../Constants/Colors');
const { ConstantStyles } = require('../../Constants/Styles');

const SubscriptionListTiles = ({ item, onPress }) => {
    // [{"cost": 2000, "days": 30, "id": 1, "type": "Monthly"}, {"cost": 5000, "days": 180, "id": 2, "type": "Half Yearly"}, {"cost": 10000, "days": 365, "id": 3, "type": "Yearly"}]
    let gradientColor;
    if (item.type == "Bronze") {
        gradientColor = ["#CD7F32", "#BE7023", "#AF6114", "#DC8E41"]

    } else if (item.type == "Silver") {
        gradientColor = ["#A8A9AD", "#B4B5B8", "#C0C0C3", "#CBCCCD", "#D7D7D8", "#E3E3E3"]
    }
    else {
        gradientColor = ["#FFCC00", "#D4AF37", "#B8860B"]
    }
    // render Function

    return (
        <TouchableOpacity
            onPress={onPress}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={gradientColor}
                style={ConstantStyles.listTile}>
                <View style={{ marginLeft: scale(10) }}>
                    <Text style={ConstantStyles.listTileTitle}>{item.type}</Text>
                    <Text style={ConstantStyles.listTileSubText}>
                        {item.cost} Rps
                    </Text>
                    <Text style={ConstantStyles.listTileSubText}>
                        Valid for: {item.days} days
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default SubscriptionListTiles;
