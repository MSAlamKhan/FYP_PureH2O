import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '../Constants/Colors';
import { Font } from '../Constants/font';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ConstantStyles } from '../Constants/Styles';

const WeatherCard = ({ weather, loader }) => {

    console.log("Weather in comp", weather);

    //render Function

    return (
        <>
            <View style={styles.TopCard}>
                {!loader ? <>
                    <View style={{ marginVertical: scale(10), }}>

                        <Text
                            style={
                                {
                                    fontSize: scale(25),
                                    fontFamily: Font.Gilroy600,
                                    color: Colors.PrimaryBlue,
                                }
                            }>
                            Todays Weather
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: scale(10) }}>
                        <Text style={{
                            color: Colors.PrimaryBlue,
                            fontSize: scale(16),
                            fontFamily: Font.Gilroy400,
                        }}>{weather?.location?.country}</Text>
                        <Text style={{
                            color: Colors.PrimaryBlue,
                            fontSize: scale(16),
                            fontFamily: Font.Gilroy400,
                        }}>{weather?.location?.name}</Text>
                        <Text style={{
                            color: Colors.PrimaryBlue,
                            fontSize: scale(16),
                            fontFamily: Font.Gilroy400,
                        }}>{`${new Date(weather?.location?.localtime).getDate()}-${1 + new Date(weather?.location?.localtime).getMonth()}-${new Date(weather?.location?.localtime).getFullYear()}`}</Text>
                    </View>
                    <Text
                        style={{
                            color: Colors.PrimaryBlue,
                            fontSize: scale(15),
                            fontFamily: Font.Gilroy300,
                        }}>
                        Condition : {weather?.current?.condition.text}
                    </Text>
                    <Text
                        style={{
                            color: Colors.PrimaryBlue,
                            fontSize: scale(15),
                            fontFamily: Font.Gilroy300,
                        }}>
                        Temperature : {weather?.current?.temp_c} C
                    </Text>
                    <Text
                        style={{
                            color: Colors.PrimaryBlue,
                            fontSize: scale(15),
                            fontFamily: Font.Gilroy300,
                        }}>
                        Humidity : {weather?.current?.humidity} %
                    </Text>
                </>

                    :
                    <>
                        <Text style={
                            {
                                fontSize: scale(20),
                                fontFamily: Font.Gilroy600,
                                color: Colors.PrimaryBlue,
                                marginBottom: scale(15)
                            }
                        }>Getting weather updates</Text>
                        <ActivityIndicator size={"large"} color={Colors.PrimaryBlue} />
                    </>

                }
            </View>
            {/* <View style={styles.BottomCard}>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={() => props.user.role_id == 1 ? props.navigation.navigate("Withdraw") : props.navigation.navigate("Recharge")}
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
                    <Text style={{ fontSize: scale(12), fontFamily: Font.Gilroy500 }}>
                        {props.user.role_id == 1 ? "Withdraw" : "Recharge"}
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[
                            styles.ImageIcon,
                            {
                                width: scale(50),
                            },
                        ]}>
                        <Image
                            source={require('../Assets/Images/transactionIcon.png')}
                            style={ConstantStyles.bannerImage}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: scale(12), fontFamily: Font.Gilroy500 }}>
                        Transaction
                    </Text>
                </View>
            </View> */}
        </>
    );
};

export default WeatherCard;

const styles = StyleSheet.create({
    TopCard: {
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(200),
        backgroundColor: Colors.CardGreen,
        paddingHorizontal: scale(30),
        // borderTopRightRadius: scale(20),
        // borderTopLeftRadius: scale(20),
        borderRadius: scale(20)
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
