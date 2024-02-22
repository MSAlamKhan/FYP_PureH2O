import React, { PureComponent, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import {
  scale,
  verticalScale,
  moderateVerticalScale,
  moderateScale,
} from 'react-native-size-matters';
import { Colors } from '../../Constants/Colors';
import { Font } from '../../Constants/font';
import { useForm } from 'react-hook-form';
import Error from '../../Components/Errors/Error';
import CustomInput from '../../Components/Inputs/CustomInput';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import CustomButton from '../../Components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import Services from '../../Api/Services';
import Toast from 'react-native-toast-message';
import toastConfig from '../../Constants/ToastConfig';


const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);

  const [loader, setLoader] = useState(false)


  // UseForm Hook
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all', defaultValues: {
      fullName: user.name,
      shopName: user.shopName,
      address: user.role_id == 1 ? user.shopAddress : user.homeAddress,
      contact: user.phoneNumber,
      email: user.email
    }
  });

  const dispatch = useDispatch();

  const onUpdate = (data) => {
    setLoader(true);
    console.log("profile update data :", user.role_id);
    const formData = new FormData();
    formData.append("userId", user.id)
    formData.append("role", user.role_id)
    formData.append("name", data.fullName)
    formData.append("homeAddres", data.address)
    formData.append("phoneNumber", data.contact)
    formData.append("email", data.email)
    formData.append("shopName", data.shopName)
    formData.append("shopAddress", data.address)
    Services.updateProfile(formData, setLoader, dispatch, navigation)

  }


  // render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={'Account'} />
      <ScrollView style={ConstantStyles.screen}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={styles.profileImage}>
            <Image
              source={require('../../Assets/Images/icon.jpg')}
              style={ConstantStyles.bannerImage}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text
              style={{
                fontFamily: Font.Gilroy700,
                color: Colors.PrimaryBlue,
                fontSize: scale(15),
              }}>
              {user.role_id == 1 ? user.shopName : user.name}
            </Text>
            <Text
              style={{
                fontFamily: Font.Gilroy400,
                color: Colors.PrimaryBlue,
                fontSize: scale(13),
              }}>
              {user.role_id == 1 ? user.shopAddress : user.homeAddress}
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: scale(10) }}>
          <Text style={{ fontFamily: Font.Manrope800, color: Colors.PrimaryBlue, fontSize: scale(18) }}>Account Details</Text>
        </View>
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
          {user.role_id == 1 && (
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
              user.role_id == 1 ? 'business-outline' : 'home-outline'
            }
            size={scale(20)}
            control={control}
            keyboardType="default"
            name="address"
            rules={{
              required:
                user.role_id == 1
                  ? 'Shop address is required'
                  : 'Home address is required',
              // pattern: {
              //   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              //   message: 'Email is not valid',
              // },
            }}
            placeholder={user.role_id == 1 ? 'Shop address' : 'Home address'}
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
          <CustomButton
            loading={loader}
            onPress={handleSubmit(onUpdate)}
            textStyle={{ color: Colors.White }}
            containerRestyle={{ marginTop: scale(30) }}
            title={'Save Changes'}
          />
        </View>
        <View style={{ height: scale(50) }} />
        <Toast
          config={toastConfig}
        />
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  detailsContainer: { marginLeft: scale(10), marginTop: scale(5) },
  profileImage: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(20),
    overflow: 'hidden',
  }
});
