import React, { PureComponent, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import {
  scale,
  verticalScale,
  moderateVerticalScale,
  moderateScale,
} from 'react-native-size-matters';

import { useForm } from 'react-hook-form';
import { Font } from '../../Constants/font';
import { Colors } from '../../Constants/Colors';
import CustomInput from '../../Components/Inputs/CustomInput';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import Error from '../../Components/Errors/Error';
import CustomButton from '../../Components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../../Redux/Types';
import Services from '../../Api/Services';
import Toast from 'react-native-toast-message';
import toastConfig from '../../Constants/ToastConfig';
const SignInScreen = ({ navigation }) => {
  // UseForm Hook

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  const dispatch = useDispatch();

  const [buttonLoading, setButtonLoaing] = useState(false);
  // button method

  const onSubmit = data => {
    setButtonLoaing(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password)
    Services.login(formData, setButtonLoaing, dispatch)
    // dispatch({ type: LOGIN, payload: userDetials });
  };

  // Render Function
  // This retruns /  renders the componenet on the screen
  return (
    <View style={[ConstantStyles.screen]}>
      <View
        style={{
          height: scale(100),
          marginTop: scale(50),
          marginBottom: scale(25),
        }}>
        <Image
          source={require('../../Assets/Images/Banner.png')}
          style={ConstantStyles.bannerImage}
        />
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={ConstantStyles.authText}>
          Sign In
        </Text>
      </View>
      <View style={{ paddingHorizontal: moderateScale(10) }}>
        <CustomInput
          fontSize={scale(16)}
          MaterialIcons={true}
          restyle={{ paddingHorizontal: moderateScale(10) }}
          MaterialIcons_Name="phone"
          size={scale(20)}
          control={control}
          keyboardType="phone-pad"
          name="email"
          maxLength={11}
          rules={{
            required: 'Phone Number is required',
            // pattern: {
            //   // value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            //   message: 'Email is not valid',
            // },
          }}
          placeholder="Phone Number"
        />
        {errors.email && (
          <Error
            textStyle={{ color: Colors.Black }}
            text={errors.email.message}
          />
        )}
        <PasswordInput
          fontSize={scale(16)}
          iconcolor={Colors.PrimaryBlue}
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Must be 8 characters long',
            },
            maxLength: {
              value: 16,
              message: '*Password too long',
            },
          }}
          placeholder="Password"
          maxLength={20}
        />

        {errors.password && (
          <Error
            textStyle={{ color: Colors.Black }}
            text={errors.password.message}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: verticalScale(15),
            justifyContent: 'space-around',
            // width: '100%',
            // alignSelf: 'center',
          }}>
          <Text
            style={{
              color: Colors.Gray,
              fontFamily: Font.Gilroy400,
              fontSize: scale(14),
            }}>
            Forgot your password?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Forgot-password')}>
            <Text
              style={{
                color: Colors.PrimaryBlue,
                textDecorationLine: 'underline',
                fontFamily: Font.Gilroy700,
                fontSize: scale(14),
              }}>
              Reset here
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          loading={buttonLoading}
          onPress={handleSubmit(onSubmit)}
          textStyle={{ color: Colors.White }}
          title={'SIGN IN'}
        />
      </View>
      <View
        style={{
          marginTop: verticalScale(30),
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: Colors.PrimaryBlue,
            fontSize: scale(13),
            fontFamily: Font.Gilroy600,
          }}>
          Dont have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sign-up')}>
          <Text
            style={{
              color: Colors.Yellow,
              fontSize: scale(13),
              fontFamily: Font.Gilroy600,
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

export default SignInScreen;
