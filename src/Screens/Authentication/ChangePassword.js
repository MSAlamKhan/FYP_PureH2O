import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../Constants/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Font } from '../../Constants/font';
import CustomButton from '../../Components/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../Components/Inputs/CustomInput';
import Error from '../../Components/Errors/Error';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import Services from '../../Api/Services';
import Toast from 'react-native-toast-message';
import toastConfig from '../../Constants/ToastConfig';
const CELL_COUNT = 4;

const ChangePasswordScreen = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });
  const { formData, type } = route.params

  const [loader, setLoader] = useState(false);

  // State Variables
  const [count, setCount] = useState(10);
  const [value, setValue] = useState();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // Continue Button Method

  const onSubmit = data => {
    formData.append("newPassword", data.password);
    console.log('====================================');
    console.log(formData);
    console.log('====================================');

    Services.changePassword(formData, setLoader, navigation, type);
    // navigation.navigate('Sign-In');
  };

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
          <Text style={ConstantStyles.mainHeadingText}>New Password</Text>
        </View>
        <Text style={ConstantStyles.subText}>Set up Your new Password</Text>
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
        <View style={{ marginTop: verticalScale(60), marginBottom: scale(50) }}>
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
            placeholder="Create Password"
            maxLength={20}
          />

          {errors.password && (
            <Error textStyle={{ color: 'red' }} text={errors.password.message} />
          )}

          <PasswordInput
            fontSize={scale(16)}
            iconcolor={Colors.PrimaryBlue}
            control={control}
            name="confirmPassword"
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
            placeholder="Confirm Password"
            maxLength={20}
          />

          {errors.confirmPassword && (
            <Error
              textStyle={{ color: 'red' }}
              text={errors.confirmPassword.message}
            />
          )}
        </View>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          loading={loader}
          textStyle={{ color: Colors.PrimaryBlue }}
          containerRestyle={{
            marginTop: scale(30),
            backgroundColor: Colors.ScreenBackGroundColor,
          }}
          title={'Continue'}
        />
      </View>
      <Toast
        config={toastConfig}
      />
    </View>
  );
};

export default ChangePasswordScreen;
