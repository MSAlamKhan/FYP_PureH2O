import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ConstantStyles} from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import Error from '../../Components/Errors/Error';
import {useForm} from 'react-hook-form';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomInput from '../../Components/Inputs/CustomInput';
import {Colors} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const WithdrawScreen = ({navigation}) => {
  // UseForm Hook
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  // render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={'Withdraw'} />
      <View style={ConstantStyles.screen}>
        <View style={{paddingHorizontal: moderateScale(10)}}>
          <CustomInput
            fontSize={scale(16)}
            FontAwesome5={true}
            restyle={{paddingHorizontal: moderateScale(10)}}
            FontAwesome5_Name={'money-bill-wave'}
            size={scale(20)}
            control={control}
            keyboardType="number-pad"
            name="amount"
            rules={{
              required: 'amount is required',
            }}
            placeholder="Amount"
          />
          {errors.amount && (
            <Error
              textStyle={{color: Colors.Black}}
              text={errors.fullName.message}
            />
          )}

          <CustomInput
            fontSize={scale(16)}
            FontAwesome={true}
            restyle={{paddingHorizontal: moderateScale(10)}}
            FontAwesome_Name="bank"
            size={scale(20)}
            control={control}
            keyboardType="default"
            name="bankName"
            rules={{
              required: 'Bank Name is required',
            }}
            placeholder="Bank Name"
          />
          {errors.bankName && (
            <Error
              textStyle={{color: Colors.Black}}
              text={errors.shopName.message}
            />
          )}

          <CustomInput
            fontSize={scale(16)}
            MaterialCommunityIcons={true}
            restyle={{paddingHorizontal: moderateScale(10)}}
            MaterialCommunityIcons_Name={'form-textbox-password'}
            size={scale(20)}
            control={control}
            keyboardType="default"
            name="ibanNumber"
            rules={{
              required: 'IBAN Number is Required',
              // pattern: {
              //   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              //   message: 'Email is not valid',
              // },
            }}
            placeholder={'IBAN Number'}
          />
          {errors.address && (
            <Error
              textStyle={{color: Colors.Black}}
              text={errors.address.message}
            />
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomInput
              maxLength={2}
              boxStyle={{width: '45%'}}
              fontSize={scale(16)}
              restyle={{paddingHorizontal: moderateScale(10)}}
              size={scale(20)}
              control={control}
              keyboardType="number-pad"
              name="month"
              rules={{
                required: 'Date is Required',
                // pattern: {
                //   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                //   message: 'Email is not valid',
                // },
              }}
              placeholder="Exp Month"
            />
            {errors.month && (
              <Error
                textStyle={{color: Colors.Black}}
                text={errors.contact.message}
              />
            )}

            <CustomInput
              fontSize={scale(16)}
              maxLength={2}
              boxStyle={{width: '45%'}}
              restyle={{paddingHorizontal: moderateScale(10)}}
              size={scale(20)}
              control={control}
              keyboardType="number-pad"
              name="year"
              rules={{
                required: 'Year is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email is not valid',
                },
              }}
              placeholder="Exp Year"
            />
            {errors.email && (
              <Error
                textStyle={{color: Colors.Black}}
                text={errors.email.message}
              />
            )}
          </View>
          <CustomInput
            fontSize={scale(16)}
            FontAwesome5={true}
            restyle={{paddingHorizontal: moderateScale(10)}}
            FontAwesome5_Name={'user'}
            size={scale(20)}
            control={control}
            keyboardType="default"
            name="name"
            rules={{
              required: 'Name is required',
            }}
            placeholder="Account Holder Name"
          />
          {errors.name && (
            <Error
              textStyle={{color: Colors.Black}}
              text={errors.fullName.message}
            />
          )}
        </View>
        <CustomButton
          onPress={() => null}
          textStyle={{color: Colors.White}}
          containerRestyle={{
            marginTop: scale(30),
          }}
          title={'WITHDRAW'}
        />
      </View>
    </>
  );
};

export default WithdrawScreen;

const style = StyleSheet.create({});
