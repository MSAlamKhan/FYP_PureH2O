import React, { useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
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
import { useFocusEffect } from '@react-navigation/native';
import Services from '../../Api/Services';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WithdrawScreen = ({ navigation }) => {
  // UseForm Hook
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });
  // render Function



  const [loader, setLoader] = useState(false);
  const [banks, setbanks] = useState([]);
  const [bankId, setBankId] = useState();

  const user = useSelector((state) => state.auth.user);

  useFocusEffect(useCallback(() => {
    setLoader(true);
    Services.getVendorbanks(user.id, setbanks, setLoader)
  }, []))


  const BankRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setBankId(item.id);
          // handleSubmit(onWithDraw)
        }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[Colors.SecondaryBlue, Colors.PaleBlue]}
          style={[ConstantStyles.listTile, { flexDirection: "row", justifyContent: "space-between" }]}>
          <View style={{ marginLeft: scale(10) }}>
            <Text style={{
              fontFamily: Font.Poppins700,
              color: Colors.Black,
              fontSize: scale(15),
            }}>Bank Name: {item.bank_name}</Text>
            <Text style={[ConstantStyles.listTileTitle, { fontSize: scale(13), }]}>{item.account_holder_name}</Text>
            <Text style={ConstantStyles.listTileSubText}>
              {item.IBAN}
            </Text>
          </View>
          {bankId == item.id &&
            <View style={{ marginRight: scale(10) }}>
              <Ionicons name="checkmark-done" size={24} color={Colors.PrimaryBlue} />

            </View>
          }
        </LinearGradient>
      </TouchableOpacity>
    )
  }


  const onWithDraw = (data) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("bankId", bankId)
    formData.append("amount", data.amount)
    formData.append("userId", user.id);
    Services.addWithdrawRequest(formData, setLoader, navigation)
  }

  return (
    <>
      <CommonHeader navigation={navigation} title={'Withdraw'} />
      <View style={ConstantStyles.screen}>
        {
          loader ?
            <ActivityIndicator size={"large"} color={Colors.PrimaryBlue} />
            :
            <FlatList
              data={banks}
              renderItem={({ item }) => <BankRow item={item} />}
              ListEmptyComponent={() => <Text style={{
                fontFamily: Font.Poppins700,
                color: Colors.Black,
                fontSize: scale(15),
                textAlign: "center"
              }}>Currently, no banks have been added to enable withdrawals.</Text>}

              ListHeaderComponent={() =>
                banks.length > 0 &&
                <View style={{ paddingHorizontal: moderateScale(10), marginBottom: scale(10) }}>
                  <Text style={{
                    fontFamily: Font.Poppins700,
                    color: Colors.Black,
                    fontSize: scale(15),
                    textAlign: "center"
                  }}>Please Enter the Amount You Wish to Withdraw, then Press on the Bank to Withdraw</Text>
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
                </View>

              }

              ListFooterComponent={() =>
                <>
                  <CustomButton
                    onPress={() => navigation.navigate("AddBank")}
                    textStyle={{ color: Colors.White }}
                    containerRestyle={{
                      marginBottom: scale(20),
                    }}
                    title={'Add Bank'}
                  />
                  <CustomButton
                    onPress={handleSubmit(onWithDraw)}
                    textStyle={{ color: Colors.White }}
                    containerRestyle={{
                      marginBottom: scale(30),
                    }}
                    title={'Withdraw'}
                  />
                </>
              }

            />}
      </View >
    </>
  );
};

export default WithdrawScreen;

const style = StyleSheet.create({});
