import React, { PureComponent, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import Services from '../../Api/Services';
import toastConfig from '../../Constants/ToastConfig';

const SignUpScreen = ({ navigation }) => {
  // State Variables
  const [accountType, SetAccountType] = useState('shop');
  const [buttonLoading, setButtonLoaing] = useState(false);
  // UseForm Hook
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  // SignUp Function

  const SignUp = (data) => {
    setButtonLoaing(true);
    console.log("data in form =>", data.contact.slice(1));
    const formData = new FormData();
    formData.append("phoneNumber", data.contact);
    // Services.checkPhoneNumber(formData);
    auth().signInWithPhoneNumber(`+92${data.contact.slice(1)}`, true).then((validator) => {
      navigation.navigate('Otp', { otpValidator: validator, userDetails: { ...data, role_id: accountType == "shop" ? 1 : 2 } });
    }).catch((error) => {
      console.log(error);
      let message;
      if (error.code === 'auth/too-many-requests') {
        message = "Too Many requests, please try again in 4 hours"
      } else if (error.code === 'auth/invalid-phone-number') {
        message = "The phone number provided is incorrect."
      }
      Toast.show({
        type: "tomatoToast",
        text1: message,
        onHide: () => setButtonLoaing(false)
      })
      // console.log(error);
    })
    // navigation.navigate('Otp', { otpValidator: 123456, userDetails: { ...data, role_id: accountType == "shop" ? 1 : 2 } });

  };

  // Custom Component
  const AccountSelector = () => {
    return (
      <View style={style.selectorContainer}>
        <TouchableOpacity
          onPress={() => SetAccountType('shop')}
          style={[
            style.selectorButton,
            {
              backgroundColor:
                accountType == 'shop'
                  ? Colors.PrimaryBlue
                  : Colors.ScreenBackGroundColor,
            },
          ]}>
          <Text
            style={{
              color: accountType == 'shop' ? Colors.White : Colors.PrimaryBlue,
              fontSize: scale(15),
              fontFamily: Font.Poppins300,
            }}>
            Shop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SetAccountType('customer')}
          style={[
            style.selectorButton,
            {
              backgroundColor:
                accountType == 'customer'
                  ? Colors.PrimaryBlue
                  : Colors.ScreenBackGroundColor,
            },
          ]}>
          <Text
            style={{
              fontFamily: Font.Poppins300,
              fontSize: scale(15),
              color:
                accountType == 'customer' ? Colors.White : Colors.PrimaryBlue,
            }}>
            Customer
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render Function
  // This retruns /  renders the componenet on the screen
  return (
    <ScrollView style={[ConstantStyles.screen]}>
      <View style={{ height: scale(55), marginVertical: scale(25) }}>
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
          marginVertical: scale(10),
        }}>
        <Text style={ConstantStyles.authText}>Sign Up</Text>
      </View>
      {AccountSelector()}
      <View style={{ paddingHorizontal: moderateScale(10) }}>
        <CustomInput
          fontSize={scale(16)}
          Feather={true}
          restyle={{ paddingHorizontal: moderateScale(10) }}
          Feather_Name={'user'}
          size={scale(20)}
          control={control}
          keyboardType="default"
          name="fullName"
          rules={{
            required: 'Full name is required',
            // pattern: {
            //   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            //   message: 'Email is not valid',
            // },
          }}
          placeholder="Full Name"
        />
        {errors.fullName && (
          <Error
            textStyle={{ color: Colors.Black }}
            text={errors.fullName.message}
          />
        )}
        {accountType == 'shop' && (
          <>
            <CustomInput
              fontSize={scale(16)}
              IonIcons={true}
              restyle={{ paddingHorizontal: moderateScale(10) }}
              IonIcons_Name="business"
              size={scale(20)}
              control={control}
              keyboardType="default"
              name="shopName"
              rules={{
                required: 'Shop Name is required',
                // pattern: {
                //   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                //   message: 'Email is not valid',
                // },
              }}
              placeholder="Shop Name"
            />
            {errors.shopName && (
              <Error
                textStyle={{ color: Colors.Black }}
                text={errors.shopName.message}
              />
            )}
          </>
        )}
        <CustomInput
          fontSize={scale(16)}
          IonIcons={true}
          restyle={{ paddingHorizontal: moderateScale(10) }}
          IonIcons_Name={
            accountType == 'shop' ? 'business-outline' : 'home-outline'
          }
          size={scale(20)}
          control={control}
          keyboardType="default"
          name="address"
          rules={{
            required:
              accountType == 'shop'
                ? 'Shop address is required'
                : 'Home address is required',
            // pattern: {
            //   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            //   message: 'Email is not valid',
            // },
          }}
          placeholder={accountType == 'shop' ? 'Shop address' : 'Home address'}
        />
        {errors.address && (
          <Error
            textStyle={{ color: Colors.Black }}
            text={errors.address.message}
          />
        )}

        <CustomInput
          fontSize={scale(16)}
          Feather={true}
          restyle={{ paddingHorizontal: moderateScale(10) }}
          Feather_Name={'phone'}
          size={scale(20)}
          control={control}
          keyboardType="number-pad"
          name="contact"
          rules={{
            required: 'Contact is required',
            // pattern: {
            //   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            //   message: 'Email is not valid',
            // },
          }}
          placeholder="Phone Number"
        />
        {errors.contact && (
          <Error
            textStyle={{ color: Colors.Black }}
            text={errors.contact.message}
          />
        )}

        <CustomInput
          fontSize={scale(16)}
          MaterialIcons={true}
          restyle={{ paddingHorizontal: moderateScale(10) }}
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
          placeholder="Create Password"
          maxLength={20}
        />

        {errors.password && (
          <Error
            textStyle={{ color: Colors.Black }}
            text={errors.password.message}
          />
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
            textStyle={{ color: Colors.Black }}
            text={errors.confirmPassword.message}
          />
        )}
        <CustomButton
          loading={buttonLoading}
          onPress={handleSubmit(SignUp)}
          textStyle={{ color: Colors.White }}
          containerRestyle={{ marginTop: scale(30) }}
          title={'SIGN UP'}
        />
      </View>
      <View style={{ height: scale(50) }} />
      <Toast config={toastConfig} topOffset={scale(150)} />
    </ScrollView>
  );
};

export default SignUpScreen;

const style = StyleSheet.create({
  selectorContainer: {
    height: scale(60),
    width: '100%',
    backgroundColor: Colors.SecondaryBlue,
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  selectorButton: {
    height: scale(50),
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(10),
  },
});
