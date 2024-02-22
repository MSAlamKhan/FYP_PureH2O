import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../Constants/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Font } from '../../Constants/font';
import CustomButton from '../../Components/CustomButton';
import Services from '../../Api/Services';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import toastConfig from '../../Constants/ToastConfig';
const CELL_COUNT = 6;
const OtpScreen = ({ navigation, route }) => {

  const { type, userDetails, otpValidator } = route.params;

  // State Variables
  const [count, setCount] = useState(10);
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  const [buttonLoading, setButtonLoaing] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Button Method

  const onSubmit = () => {
    setButtonLoaing(true);
    otpValidator.confirm(value).then((result) => {
      if (type == "forgot") {
        setButtonLoaing(false);
        navigation.navigate("Change-password", { formData: userDetails, type: "hehe" })
      } else {
        const formData = new FormData();
        console.log(userDetails.role_id);
        formData.append("role", userDetails.role_id);
        formData.append("name", userDetails.fullName);
        { userDetails.role_id == 1 && formData.append("shopName", userDetails.shopName); }
        {
          userDetails.role_id == 1 ? formData.append("shopAddress", userDetails.address) : formData.append("homeAddres", userDetails.address);
        }
        formData.append("phoneNumber", userDetails.contact);
        formData.append("email", userDetails.email);
        formData.append("password", userDetails.password);
        setButtonLoaing(false);
        Services.signup(formData, setButtonLoaing, navigation);

      }
    }).catch((e) => {
      console.log("error", e);
    })
  }

  // Render Functions
  return (
    <View style={[ConstantStyles.screen, { padding: scale(0) }]}>
      <View style={{ height: scale(55), marginVertical: scale(25) }}>
        <Image
          source={require('../../Assets/Images/Banner.png')}
          style={ConstantStyles.bannerImage}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: scale(20),
          marginBottom: scale(20),
        }}>
        <View style={{ marginVertical: scale(10) }}>
          <Text style={ConstantStyles.mainHeadingText}>
            OTP Verification
          </Text>
        </View>
        <Text style={ConstantStyles.subText}>
          We’ve just send you 6 digits code to your Phone number
        </Text>
      </View>
      <View
        style={[
          ConstantStyles.screen,
          {
            backgroundColor: Colors.PrimaryBlue,
            borderTopLeftRadius: scale(30),
            borderTopRightRadius: scale(30),
            // paddingTop:verticalScale(100)
            // alignContent: 'center',
            // justifyContent: 'center',
          },
        ]}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={{
            marginLeft: scale(5),
            marginRight: scale(5),
            marginTop: verticalScale(100),
            marginBottom: scale(50),
          }}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              style={{
                backgroundColor: Colors.White,
                borderRadius: scale(20),
                marginRight: scale(10),
              }}>
              <Text
                key={index}
                style={[
                  {
                    color: Colors.Black,
                    width: scale(45),
                    height: scale(50),
                    fontSize: scale(20),
                    textAlign: 'center',
                    fontFamily: Font.Manrope400,
                  },
                  isFocused && Platform.OS == 'ios'
                    ? { lineHeight: verticalScale(30) }
                    : { textAlignVertical: 'center' },
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <CustomButton
          onPress={onSubmit}
          loading={buttonLoading}
          textStyle={{ color: Colors.PrimaryBlue }}
          containerRestyle={{ marginTop: scale(30), backgroundColor: Colors.ScreenBackGroundColor }}
          title={'Continue'}
        />
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

export default OtpScreen;
