import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import Error from '../../Components/Errors/Error';
import { useForm } from 'react-hook-form';
import { moderateScale, scale } from 'react-native-size-matters';
import CustomInput from '../../Components/Inputs/CustomInput';
import { Colors } from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Font } from '../../Constants/font';
import { useSelector } from 'react-redux';
import Services from '../../Api/Services';
import Toast from 'react-native-toast-message';
import toastConfig from '../../Constants/ToastConfig';

const AddBankScreen = ({ navigation }) => {
    // UseForm Hook
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'all' });
    // render Function
    const user = useSelector((state) => state.auth.user);
    const [loader, setLoader] = useState(false);

    const onSubmit = (data) => {
        setLoader(true)
        console.log("data", data);
        const formData = new FormData();
        formData.append("userId", user.id);
        formData.append("bankName", data.bankName);
        formData.append("iban", data.ibanNumber);
        formData.append("accountHolder", data.name);
        Services.addVendorBank(formData, setLoader, navigation)

    }




    return (
        <>
            <CommonHeader navigation={navigation} title={'Add Bank'} />
            <View style={ConstantStyles.screen}>
                <View style={{ paddingHorizontal: moderateScale(10) }}>

                    <CustomInput
                        fontSize={scale(16)}
                        FontAwesome={true}
                        restyle={{ paddingHorizontal: moderateScale(10) }}
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
                            textStyle={{ color: Colors.Black }}
                            text={errors.bankName.message}
                        />
                    )}

                    <CustomInput
                        fontSize={scale(16)}
                        MaterialCommunityIcons={true}
                        restyle={{ paddingHorizontal: moderateScale(10) }}
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
                    {errors.ibanNumber && (
                        <Error
                            textStyle={{ color: Colors.Black }}
                            text={errors.ibanNumber.message}
                        />
                    )}
                    <CustomInput
                        fontSize={scale(16)}
                        FontAwesome5={true}
                        restyle={{ paddingHorizontal: moderateScale(10) }}
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
                            textStyle={{ color: Colors.Black }}
                            text={errors.name.message}
                        />
                    )}
                </View>
                <CustomButton
                    loading={loader}
                    onPress={handleSubmit(onSubmit)}
                    textStyle={{ color: Colors.White }}
                    containerRestyle={{
                        marginTop: scale(30),
                    }}
                    title={'WITHDRAW'}
                />
            </View>
            <Toast
                config={toastConfig}
            />
        </>
    );
};

export default AddBankScreen;


