import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ConstantStyles} from '../../Constants/Styles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Colors} from '../../Constants/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Font} from '../../Constants/font';
import CustomButton from '../../Components/CustomButton';
import {useForm} from 'react-hook-form';
import CustomInput from '../../Components/Inputs/CustomInput';
import Error from '../../Components/Errors/Error';
const CELL_COUNT = 4;

const SearchEmailScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  // State Variables
  const [count, setCount] = useState(10);
  const [value, setValue] = useState();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Continue Button Method

  const onSubmit = data => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    navigation.navigate('Otp', {otp: 1234, type : "forgot"});
  };

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
            Forgot Password?
          </Text>
        </View>
        <Text style={ConstantStyles.subText}>
          No worries, we got you covered, enter your email and we'll end you an
          opt
        </Text>
      </View>
      <View
        style={[
          ConstantStyles.screen,
          {
            backgroundColor: Colors.PrimaryBlue,
            borderTopLeftRadius: scale(30),
            borderTopRightRadius: scale(30),
          },
        ]}>
        <View style={{marginTop: verticalScale(60), marginBottom: scale(50)}}>
          <CustomInput
            fontSize={scale(16)}
            MaterialIcons={true}
            restyle={{paddingHorizontal: moderateScale(10)}}
            MaterialIcons_Name="email"
            size={scale(20)}
            control={control}
            keyboardType="email-address"
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Email is not valid',
              },
            }}
            placeholder="Email Address"
          />
          {errors.email && (
            <Error textStyle={{color: 'red'}} text={errors.email.message} />
          )}
        </View>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          textStyle={{color: Colors.PrimaryBlue}}
          containerRestyle={{
            marginTop: scale(30),
            backgroundColor: Colors.ScreenBackGroundColor,
          }}
          title={'Continue'}
        />
      </View>
    </View>
  );
};

export default SearchEmailScreen;
