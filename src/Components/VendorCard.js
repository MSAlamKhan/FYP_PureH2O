import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../Constants/Colors';
import { Font } from '../Constants/font';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ConstantStyles } from '../Constants/Styles';

const VendorCard = ({ vendor, onPress }) => {

    console.log(" vendor in comp", vendor);

    //render Function

    return (
        <>
            <View style={styles.TopCard}>
                <View style={{ marginVertical: scale(5), }}>
                    <Text
                        style={
                            {
                                fontSize: scale(25),
                                fontFamily: Font.Gilroy600,
                                color: Colors.PrimaryBlue,
                            }
                        }>
                        {vendor.shopName}
                    </Text>
                </View>

                <Text
                    style={{
                        color: Colors.PrimaryBlue,
                        fontSize: scale(14),
                        fontFamily: Font.Gilroy300,
                    }}>
                    Owner : {vendor.name}
                </Text>
                <Text
                    style={{
                        color: Colors.PrimaryBlue,
                        fontSize: scale(14),
                        fontFamily: Font.Gilroy300,
                    }}>
                    Address : {vendor.shopAddress}
                </Text>
                <Text
                    style={{
                        color: Colors.PrimaryBlue,
                        fontSize: scale(14),
                        fontFamily: Font.Gilroy300,
                    }}>
                    Contact : {vendor.phoneNumber}
                </Text>

            </View>
            <View style={styles.BottomCard}>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={onPress}
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
                    <Text style={{ fontSize: scale(12), fontFamily: Font.Gilroy500, color: Colors.White  }}>
                        {"Order"}
                    </Text>
                </View>
            </View>
        </>
    );
};

export default VendorCard;

const styles = StyleSheet.create({
    TopCard: {
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(150),
        backgroundColor: Colors.CardGreen,
        paddingHorizontal: scale(30),
        borderTopRightRadius: scale(20),
        borderTopLeftRadius: scale(20),
        // borderRadius: scale(20)
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
