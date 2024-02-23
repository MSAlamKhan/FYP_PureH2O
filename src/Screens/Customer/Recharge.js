import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import Error from '../../Components/Errors/Error';
import { useForm } from 'react-hook-form';
import { moderateScale, scale } from 'react-native-size-matters';
import CustomInput from '../../Components/Inputs/CustomInput';
import { Colors } from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import ApiUtils from '../../Api/ApiUtils';
import axios from 'axios';
import Services from '../../Api/Services';
import { useDispatch, useSelector } from 'react-redux';

const RechargeScreen = ({ navigation }) => {
    // UseForm Hook
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'all' });

    const dispatch = useDispatch();

    const { id } = useSelector((state) => state.auth.user);
    const [loader, setLoader] = useState(false);
    // render Function


    const generateToken = async (data) => {
        setLoader(true);
        let postdata = {
            'card[number]': data.CardNumber,
            'card[exp_month]': data.month,
            'card[exp_year]': data.year,
            'card[cvc]': data.CVVNumber
        };
        const response = await axios.post("https://api.stripe.com/v1/tokens", postdata, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${ApiUtils.stripePublishToken}`
            }
        })

        console.log("RD ==>", response.data.id);
        return response.data.id;
    }

    const makeCharge = (amount, cardId, name) => {
        const charge = {
            amount: parseFloat(amount),
            currency: "USD",
            source: cardId,
            description: `PureH2O Wallet Recharge by ${name}`,
        };
        axios.post("https://api.stripe.com/v1/charges", charge, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${ApiUtils.stripeSecretToken}`
            }
        }).then((response) => {
            console.log("this is my response", response.data.id, id, amount, "credit");
            const formData = new FormData();
            formData.append("userId", id)
            formData.append("transectionId", response.data.id)
            formData.append("amount", amount)
            formData.append("type", "credit")
            formData.append("description", "Wallet Recharge")
            Services.addTransaction(formData, navigation, dispatch, setLoader);

        }).catch((err) => { console.log(err.response) })

    }


    const onSubmit = async (data) => {
        const cardID = await generateToken(data);
        console.log("cardID", cardID);
        makeCharge(data.amount, cardID, data.name)
        // console.log(data);
    }

    return (
        <>
            <CommonHeader navigation={navigation} title={'Recharge'} />
            <ScrollView style={ConstantStyles.screen}>
                <View style={{ paddingHorizontal: moderateScale(10) }}>
                    <CustomInput
                        fontSize={scale(16)}
                        FontAwesome5={true}
                        restyle={{ paddingHorizontal: moderateScale(10) }}
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
                            textStyle={{ color: Colors.Black }}
                            text={errors.amount.message}
                        />
                    )}

                    <CustomInput
                        fontSize={scale(16)}
                        FontAwesome={true}
                        restyle={{ paddingHorizontal: moderateScale(10) }}
                        FontAwesome_Name="bank"
                        size={scale(20)}
                        control={control}
                        keyboardType="number-pad"
                        name="CardNumber"
                        maxLength={16}
                        rules={{
                            required: 'CardNumber is required',
                        
                        }}
                        placeholder="Card Number"
                    />
                    {errors.CardNumber && (
                        <Error
                            textStyle={{ color: Colors.Black }}
                            text={errors.CardNumber.message}
                        />
                    )}

                    <CustomInput
                        fontSize={scale(16)}
                        MaterialCommunityIcons={true}
                        restyle={{ paddingHorizontal: moderateScale(10) }}
                        MaterialCommunityIcons_Name={'form-textbox-password'}
                        size={scale(20)}
                        control={control}
                        keyboardType="number-pad"
                        name="CVVNumber"
                        maxLength={3}
                        rules={{
                            required: 'CVV is Required',
                            // pattern: {
                            //   value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            //   message: 'Email is not valid',
                            // },
                        }}
                        placeholder={'CVV'}
                    />
                    {errors.CVVNumber && (
                        <Error
                            textStyle={{ color: Colors.Black }}
                            text={errors.CVVNumber.message}
                        />
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <View style={{ width: '45%' }}>
                            <CustomInput
                                maxLength={2}
                                // boxStyle={{ width: '120%' }}
                                fontSize={scale(16)}
                                restyle={{ paddingHorizontal: moderateScale(10) }}
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
                                    textStyle={{ color: Colors.Black }}
                                    text={errors.month.message}
                                />
                            )}
                        </View>
                        <View style={{ width: '45%' }}>

                            <CustomInput
                                fontSize={scale(16)}
                                maxLength={2}
                                // boxStyle={{ width: '120%' }}
                                restyle={{ paddingHorizontal: moderateScale(10) }}
                                size={scale(20)}
                                control={control}
                                keyboardType="number-pad"
                                name="year"
                                rules={{
                                    required: 'Year is required',
                                    // pattern: {
                                    //     value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    //     message: 'Email is not valid',
                                    // },
                                }}
                                placeholder="Exp Year"
                            />
                            {errors.year && (
                                <Error
                                    textStyle={{ color: Colors.Black }}
                                    text={errors.year.message}
                                />
                            )}
                        </View>
                    </View>
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
                            required: 'Card Holder Name is required',
                        }}
                        placeholder="Card Holder Name"
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
                    title={'Recharge'}
                />
            </ScrollView>
        </>
    );
};

export default RechargeScreen;

const style = StyleSheet.create({});
