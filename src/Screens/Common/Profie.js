import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet,ScrollView} from 'react-native';
import {ConstantStyles} from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import {
    scale,
    verticalScale,
    moderateVerticalScale,
    moderateScale,
  } from 'react-native-size-matters';
import {Colors} from '../../Constants/Colors';
import {Font} from '../../Constants/font';
import {useForm} from 'react-hook-form';
import CustomInput from '../../Components/Inputs/CustomInput';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import CustomButton from '../../Components/CustomButton';


const ProfileScreen = ({navigation}) => {
    const accountType = 'shop'

    // UseForm Hook
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});



  // render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={'Account'} />
      <ScrollView style={ConstantStyles.screen}>
        <View style={{flexDirection: 'row'}}>
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
              Shop Name
            </Text>
            <Text
              style={{
                fontFamily: Font.Gilroy400,
                color: Colors.PrimaryBlue,
                fontSize: scale(13),
              }}>
              Shop Address
            </Text>
          </View>
        </View>
        <View style={{marginVertical:scale(10)}}>
        <Text style={{fontFamily:Font.Manrope800, color:Colors.PrimaryBlue, fontSize:scale(18)}}>Account Details</Text>
        </View>
        <View style={{paddingHorizontal: moderateScale(10)}}>
        <CustomInput
          fontSize={scale(16)}
          Feather={true}
          restyle={{paddingHorizontal: moderateScale(10)}}
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
            textStyle={{color: Colors.Black}}
            text={errors.fullName.message}
          />
        )}
        {accountType == 'shop' && (
          <>
            <CustomInput
              fontSize={scale(16)}
              IonIcons={true}
              restyle={{paddingHorizontal: moderateScale(10)}}
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
                textStyle={{color: Colors.Black}}
                text={errors.shopName.message}
              />
            )}
          </>
        )}
        <CustomInput
          fontSize={scale(16)}
          IonIcons={true}
          restyle={{paddingHorizontal: moderateScale(10)}}
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
            textStyle={{color: Colors.Black}}
            text={errors.address.message}
          />
        )}

        <CustomInput
          fontSize={scale(16)}
          Feather={true}
          restyle={{paddingHorizontal: moderateScale(10)}}
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
            textStyle={{color: Colors.Black}}
            text={errors.contact.message}
          />
        )}

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
          <Error
            textStyle={{color: Colors.Black}}
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
            textStyle={{color: Colors.Black}}
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
            textStyle={{color: Colors.Black}}
            text={errors.confirmPassword.message}
          />
        )}
        <CustomButton
          onPress={()=> null}
          textStyle={{color: Colors.White}}
          containerRestyle={{marginTop: scale(30)}}
          title={'Save Changes'}
        />
      </View>
      <View style={{height: scale(50)}} />
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  detailsContainer: {marginLeft: scale(10), marginTop: scale(5)},
  profileImage :{
    height: scale(100),
    width: scale(100),
    borderRadius: scale(20),
    overflow: 'hidden',
  }
});
