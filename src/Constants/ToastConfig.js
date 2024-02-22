import { Text, View } from "react-native";
import { Font } from "./font";
import { Colors } from "./Colors";

const { scale } = require("react-native-size-matters");

const toastConfig = {

    tomatoToast: ({ text1, props }) => (
        <View style={{ height: scale(70), width: '90%', backgroundColor: 'tomato', borderRadius: scale(20), padding: scale(10) }}>
            <Text style={{ fontFamily: Font.Poppins700, fontSize: scale(15), color: Colors.White }}>Attention</Text>
            <Text style={{ fontFamily: Font.Poppins500, fontSize: scale(12), color: Colors.White }}>{text1}</Text>
        </View>
    ),

    greenSuccess: ({ text1, props }) => (
        <View style={{ height: scale(70), width: '90%', backgroundColor: '#70E000', borderRadius: scale(20), padding: scale(10) }}>
            <Text style={{ fontFamily: Font.Poppins700, fontSize: scale(15), color: Colors.White }}>Success</Text>
            <Text style={{ fontFamily: Font.Poppins500, fontSize: scale(12), color: Colors.White }}>{text1}</Text>
        </View>
    ),
};

export default toastConfig