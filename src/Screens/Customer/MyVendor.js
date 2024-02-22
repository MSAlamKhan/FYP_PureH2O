import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ConstantStyles } from "../../Constants/Styles";
import { moderateScale, scale } from "react-native-size-matters";

import Error from '../../Components/Errors/Error';
import { Font } from "../../Constants/font";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../Constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../Redux/Types";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Services from "../../Api/Services";
import { FlatList } from "react-native-gesture-handler";
import VendorListTiles from "../../Components/ListTiles/VendorListTile";
import CustomButton from "../../Components/CustomButton";
import Toast from "react-native-toast-message";
import toastConfig from "../../Constants/ToastConfig";
import VendorCard from "../../Components/VendorCard";
import Modal from "react-native-modal";
import CustomInput from "../../Components/Inputs/CustomInput";
import { useForm } from "react-hook-form";

const { default: CommonHeader } = require("../../Components/Headers/CommonHeader")

const MyVendorScreen = ({ navigation }) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch()

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'all' });

    const [selet, setSelect] = useState(null);

    const [screenLoader, SetScreenLoader] = useState(true);
    const [orderLoader, setOrderLoader] = useState(false);
    const [order, setOrders] = useState();
    const [vendor, setVendor] = useState();
    const [vendorList, setVendorList] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);


    useFocusEffect(useCallback(() => {
        if (vendor === undefined) {
            Services.getMyVendor(user.id, setVendor, SetScreenLoader);
        }
        if (vendor == null) {
            Services.getVendorList(setVendorList, SetScreenLoader);
        }
        Services.getOrders(user.id, setOrderLoader, setOrders)
    }, [vendor, isValid]))
    console.log("there are my orderss ", order);


    const onContinue = () => {
        if (selet == null) {
            Toast.show({
                type: "tomatoToast",
                text1: "Please Select a Vendor",
                position: "top",
                visibilityTime: 1500,
                autoHide: true,
            })
        }
        else {
            const formData = new FormData();
            formData.append("vendor", selet)
            formData.append("customer", user.id)
            SetScreenLoader(true)
            Services.makeCustomer(formData, SetScreenLoader, setVendor)
        }
    }

    const onPlaceOrder = (data) => {
        setButtonLoader(true)
        console.log("bottles", data);
        const formData = new FormData();
        formData.append("vendorId", vendor.id)
        formData.append("customerId", user.id)
        formData.append("amount", parseFloat(data.bottles) * 180)
        formData.append("bottles", parseInt(data.bottles))
        Services.placeOrder(formData, setButtonLoader, setIsVisible, setVendor)

    }


    const onPayment = (item) => {
        Alert.alert("Payment Confirmation", "Are sure you want to continue payment?", [
            {
                text: "Yes",
                onPress: () => makePayment(item)
            },
            {
                text: "Cancel",
                onPress: () => null
            }
        ])
    }

    const makePayment = (item) => {
        if (user.balance < item.amount) {
            Alert.alert("Insufficient Balance", "Please Recharge your Wallet then Try Again", [
                {
                    text: "Recharge",
                    onPress: () => navigation.navigate("My Wallet")
                }, {
                    text: "Cancel",
                    onPress: () => null
                }])
        } else {
            SetScreenLoader(true)
            const formdata = new FormData();
            formdata.append("orderId", item.id);
            formdata.append("amount", item.amount);
            formdata.append("userId", user.id);
            formdata.append("vendorId", item.vendorId);
            Services.orderPayment(formdata, SetScreenLoader, dispatch, setVendor)
        }

    }
    // render function
    return (
        <>
            <CommonHeader navigation={navigation} title={'My Vendor'} />
            <View style={ConstantStyles.screen}>

                {
                    screenLoader ? <ActivityIndicator size={"large"} color={Colors.PrimaryBlue} /> :
                        <>
                            {vendor == null && !screenLoader &&
                                <FlatList
                                    data={vendorList}
                                    renderItem={({ item }) => <VendorListTiles item={item} vendor={selet} setVendor={setSelect} />}
                                    ListHeaderComponent={() => <Text style={{
                                        fontFamily: Font.Poppins700,
                                        color: Colors.Black,
                                        fontSize: scale(15),
                                        textAlign: "center"
                                    }} >Kindly choose your Water Service Provider to begin placing your order.</Text>}

                                    ListFooterComponent={() =>
                                        <CustomButton
                                            onPress={onContinue}
                                            textStyle={{ color: Colors.White }}
                                            containerRestyle={{
                                                marginBottom: scale(20),
                                            }}
                                            title={'Continue'}
                                        />}
                                />}
                            {vendor != null &&
                                <>
                                    <VendorCard vendor={vendor} onPress={() => setIsVisible(true)} />
                                    <View style={styles.bottomSheet}>
                                        <View
                                            style={styles.whiteDash}
                                        />
                                        <Text
                                            style={styles.bottomSheetText}>
                                            My Orders
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
                                                        {item.payment_Status != "Paid" && <TouchableOpacity style={{ backgroundColor: Colors.CardGreen, paddingHorizontal: scale(5), paddingVertical: scale(10), borderRadius: scale(10), }}
                                                            onPress={() => onPayment(item)}
                                                        >
                                                            <Text>Pay Now</Text>
                                                        </TouchableOpacity>}
                                                    </View>
                                                )
                                            }}
                                        /> : <ActivityIndicator size={"large"} color={Colors.PrimaryBlue} />}
                                    </View>

                                </>}
                        </>
                }
            </View>
            <Modal
                onBackdropPress={() => setIsVisible(false)}
                isVisible={isVisible}>
                <View style={{ backgroundColor: Colors.White, borderRadius: scale(20), alignItems: "center", padding: scale(20) }}>
                    <Text
                        style={{
                            fontFamily: Font.Poppins700,
                            color: Colors.Black,
                            fontSize: scale(15),
                            textAlign: "center"
                        }}
                    >
                        Order Details
                    </Text>
                    <CustomInput
                        fontSize={scale(16)}
                        MaterialIcons={true}
                        restyle={{ paddingHorizontal: moderateScale(10) }}
                        MaterialIcons_Name="water-drop"
                        size={scale(20)}
                        control={control}
                        keyboardType="phone-pad"
                        name="bottles"
                        rules={{
                            required: 'Bottles are required',
                            // pattern: {
                            //   // value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            //   message: 'Email is not valid',
                            // },
                        }}
                        placeholder="Bottles"
                    />
                    {errors.bottles && (
                        <Error
                            textStyle={{ color: Colors.Black }}
                            text={errors.bottles.message}
                        />
                    )}
                    <CustomButton
                        loading={buttonLoader}
                        onPress={handleSubmit(onPlaceOrder)}
                        textStyle={{ color: Colors.White }}
                        containerRestyle={{
                            marginTop: scale(10),
                            width: "100%"
                        }}
                        title={'Place Order'}
                    />
                </View>

            </Modal>
            <Toast
                config={toastConfig}
            />
        </>
    )
}


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
        flex: 1.5,
        marginTop: scale(5),
        borderTopRightRadius: scale(20),
        borderTopLeftRadius: scale(20),
        paddingHorizontal: scale(10),
    }
})


export default MyVendorScreen;