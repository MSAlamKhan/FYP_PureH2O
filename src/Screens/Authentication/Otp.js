import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ConstantStyles} from '../../Constants/Styles';
import {scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../Constants/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Font} from '../../Constants/font';
import CustomButton from '../../Components/CustomButton';
const CELL_COUNT = 4;
const OtpScreen = ({navigation, route}) => {

    const {otp, type} = route.params;

  // State Variables
  const [count, setCount] = useState(10);
  const [value, setValue] = useState();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
console.log('====================================');
console.log(type );
console.log('====================================');

// Button Method

const onSubmit = () =>{
  if (value == otp && type == "forgot") {
    navigation.navigate("Change-password")
  } else {
    navigation.navigate("Sign-In");
  }
}

  // Render Functions
  return (
    <View style={[ConstantStyles.screen, {padding: scale(0)}]}>
      <View style={{height: scale(55), marginVertical: scale(25)}}>
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
        <View style={{marginVertical: scale(10)}}>
          <Text style={ConstantStyles.mainHeadingText}>
            OTP Verification
          </Text>
        </View>
        <Text style={ConstantStyles.subText}>
          We’ve just send you 4 digits code to your email test@gmail.com 
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
            width: '60%',
            alignSelf: 'center',
            marginTop: verticalScale(100),
            marginBottom: scale(50),
          }}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
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
                    ? {lineHeight: verticalScale(30)}
                    : {textAlignVertical: 'center'},
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <CustomButton
        onPress={onSubmit}
        textStyle={{color: Colors.PrimaryBlue}}
        containerRestyle={{marginTop: scale(30), backgroundColor:Colors.ScreenBackGroundColor}}
        title={'Continue'}
       />
      </View>
    </View>
  );
};

export default OtpScreen;
