import React from 'react';
import {Text, View} from 'react-native';
import {ConstantStyles} from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import LineGraph from '../../Components/Graphs/LineGraph';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Font } from '../../Constants/font';
import { Colors } from '../../Constants/Colors';
import CustomInput from '../../Components/Inputs/CustomInput';
import { useForm } from 'react-hook-form';
import Error from '../../Components/Errors/Error';
import CustomButton from '../../Components/CustomButton';

const InventoryScreen = ({navigation}) => {

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
      } = useForm({mode: 'all'});
    
  // Render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={'Inventory'} />
      <View style={ConstantStyles.screen}>
        <View style={{marginVertical: verticalScale(10)}}>
          <Text style={ConstantStyles.graphTitle}>Inventory Stats</Text>
        </View>
        <LineGraph />
      <View
          style={{
            height: scale(50),
            backgroundColor: Colors.SecondaryBlue,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(10),
            marginVertical: scale(20),
          }}>
          <Text style={{fontFamily: Font.Poppins500, fontSize: scale(15)}}>
            {' '}
            Current Inventory : 350 Bottles
          </Text>
        </View>
        <View
        style={{borderBottomWidth:scale(1), borderBottomColor :Colors.PrimaryBlue, borderStyle:"dashed",}}
        />
        <View style={{marginVertical: verticalScale(10)}}>
          <Text style={[ConstantStyles.subText,{fontFamily : Font.Poppins700, fontSize:scale(15)}]}>Update Your Inventory</Text>
        </View>
        <View style={{paddingHorizontal: moderateScale(10), marginBottom:scale(20)}}>
        <CustomInput
          fontSize={scale(16)}
        //   MaterialIcons={true}
          restyle={{paddingHorizontal: moderateScale(10)}}
        //   MaterialIcons_Name="email"
          size={scale(20)}
          control={control}
          keyboardType="number-pad"
          name="inventory"
          rules={{
            required: 'Inventory is required',
          }}
          placeholder="inventory"
        />
        {errors.inventory && (
          <Error
            textStyle={{color: Colors.Black}}
            text={errors.inventory.message}
          />
        )}
      </View>
         <CustomButton
          onPress={() => null}
          textStyle={{color: Colors.White}}
          title={'UPDATE'}
        />
      </View>
    </>
  );
};

export default InventoryScreen;
