import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import CommonHeader from '../../Components/Headers/CommonHeader';
import LineGraph from '../../Components/Graphs/LineGraph';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Font } from '../../Constants/font';
import { Colors } from '../../Constants/Colors';
import CustomInput from '../../Components/Inputs/CustomInput';
import { useForm } from 'react-hook-form';
import Error from '../../Components/Errors/Error';
import CustomButton from '../../Components/CustomButton';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Services from '../../Api/Services';
import Toast from 'react-native-toast-message';
import toastConfig from '../../Constants/ToastConfig';

const InventoryScreen = ({ navigation }) => {



  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  const user = useSelector((state) => state.auth.user);
  const [invetory, setInventory] = useState(null);
  const [loader, setLoader] = useState(false);

  const [weatherHistory, setWeatherHistory] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const [graphLoader, setGraphLoader] = useState(true);

  useFocusEffect(useCallback(() => {

    if (invetory == null) {
      setLoader(true);
      Services.getInventory(user.id, setInventory, setLoader);
    }



    let Dates = {
      start: `${new Date().getFullYear()}-${1 + new Date().getMonth()}-1`,
      end: `${new Date().getFullYear()}-${1 + new Date().getMonth()}-31`,

    }
    if (weatherHistory == null) {
      Services.getWeatherHistory(setWeatherHistory, setGraphLoader, Dates)
    }

    if (weatherHistory != null) {
      console.log("this is my average temperature ==>", getAvgTemp(), getAvgHum());
      const raw = JSON.stringify({
        "data": [
          [
            getAvgTemp(),
            getAvgHum()
          ]
        ]
      });
      if (prediction == null) {
        Services.getSalesPredictions(raw, setPrediction,);
      }
      if (prediction != null) {
        setGraphLoader(false)
      }

    }
  }, [weatherHistory, prediction]))

  const getAvgTemp = () => Math.round(weatherHistory.reduce((acc, cv) => acc + cv.day.avgtemp_c, 0) / weatherHistory.length)
  const getAvgHum = () => (weatherHistory.reduce((acc, cv) => acc + cv.day.avghumidity, 0) / weatherHistory.length) / 100;

  // steps for inventory
  const createInventorySteps = () => Math.round(Math.round(997) / 5);

  const calculateGraphValues = (steps, type) => {
    let elements = [];
    if (type == "sale") {
      for (let index = 0; index < 6; index++) {
        elements[index] = `${((steps * index) / 1000)}`;
      }

    } else {
      for (let index = 0; index < 6; index++) {
        elements[index] = `${((steps * index))}`;
      }
    }
    elements.shift()
    return elements;
  };

  let inventoryArray = calculateGraphValues(createInventorySteps(), "inventory");
  console.log("there are my inventory array", inventoryArray);

  const onUpdate = (data) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("vendorId", user.id);
    formData.append("bottles", data.inventory);
    Services.updateInventory(formData, setInventory, setLoader);

  }

  // Render Function

  return (
    <>
      <CommonHeader navigation={navigation} title={'Inventory'} />
      <ScrollView style={ConstantStyles.screen}>
        <View style={{ marginVertical: verticalScale(10) }}>
          <Text style={ConstantStyles.graphTitle}>Inventory Stats</Text>
        </View>
        {
          graphLoader || Math.max(...inventoryArray) == 0 ? <ActivityIndicator size={"large"} color={Colors.PrimaryBlue} /> : <LineGraph yAxis={inventoryArray} type={"inventory"} prediction={prediction} />
        }
        <View
          style={{
            height: scale(50),
            backgroundColor: Colors.SecondaryBlue,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(10),
            marginVertical: scale(20),
          }}>
          {!loader ? <Text style={{ fontFamily: Font.Poppins500, fontSize: scale(15) }}>
            {' '}
            Current Inventory : {invetory}
          </Text> : <ActivityIndicator size={"large"} color={Colors.White} />}
        </View>
        <View
          style={{ borderBottomWidth: scale(1), borderBottomColor: Colors.PrimaryBlue, borderStyle: "dashed", }}
        />
        <View style={{ marginVertical: verticalScale(10) }}>
          <Text style={[ConstantStyles.subText, { fontFamily: Font.Poppins700, fontSize: scale(15) }]}>Update Your Inventory</Text>
        </View>
        <View style={{ paddingHorizontal: moderateScale(10), marginBottom: scale(20) }}>
          <CustomInput
            fontSize={scale(16)}
            //   MaterialIcons={true}
            restyle={{ paddingHorizontal: moderateScale(10) }}
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
              textStyle={{ color: Colors.Black }}
              text={errors.inventory.message}
            />
          )}
        </View>
        <CustomButton
          loading={loader}
          onPress={handleSubmit(onUpdate)}
          textStyle={{ color: Colors.White }}
          title={'UPDATE'}
        />
        <Toast
          config={toastConfig}
        />
      </ScrollView>
    </>
  );
};

export default InventoryScreen;
