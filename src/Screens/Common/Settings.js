import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ConstantStyles } from "../../Constants/Styles";
import { scale } from "react-native-size-matters";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import { Font } from "../../Constants/font";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../Constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../Redux/Types";

const { default: CommonHeader } = require("../../Components/Headers/CommonHeader")

const SettingsScreen = ({ navigation }) => {
    const user = useSelector((state) => state.auth.user);
    const formData = new FormData();
    formData.append("phoneNumber", user.phoneNumber);
    const dispatch = useDispatch();

    const onLogout = () => {
        AsyncStorage.clear().then(() => {
            dispatch({ type: LOGIN, payload: null })
        })
    }

    // render function


    return (
        <>
            <CommonHeader navigation={navigation} title={'Settings'} />
            <View
                style={ConstantStyles.screen}>
                <TouchableOpacity onPress={() => navigation.navigate("Change-Password", { formData: formData, type: "in-app" })}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[Colors.SecondaryBlue, Colors.PaleBlue]}
                        style={styles.buttonStyle}>
                        <MaterialIcons name="password" size={scale(24)} color="black" />
                        <Text style={styles.buttonTextStyle}>Change Password</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={onLogout}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[Colors.SecondaryBlue, Colors.PaleBlue]}
                        style={styles.buttonStyle}>
                        <SimpleLineIcons name="logout" size={scale(24)} color="black" />
                        <Text style={styles.buttonTextStyle}>Log out</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

        </>
    )
}


const styles = StyleSheet.create({
    buttonStyle: { height: scale(90), borderRadius: scale(10), alignItems: "center", justifyContent: "flex-start", flexDirection: "row", padding: scale(20), marginBottom: scale(10) },
    buttonTextStyle: {
        fontFamily: Font.Poppins500,
        fontSize: scale(20),
        marginLeft: scale(30)
    }
})


export default SettingsScreen;