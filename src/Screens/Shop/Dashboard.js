import React, { PureComponent, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import Header from '../../Components/Headers/Header';
import LineGraph from '../../Components/Graphs/LineGraph';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../Constants/Colors';
import { Font } from '../../Constants/font';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Services from '../../Api/Services';

const DashBoardScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const [invetory, setInventory] = useState([]);
  const [loader, setLoader] = useState(true);
  const [weatherHistory, setWeatherHistory] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [graphLoader, setGraphLoader] = useState(true);

  useFocusEffect(useCallback(() => {
    setGraphLoader(true)
    Services.getInventory(user.id, setInventory, setLoader);

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
  // * by 180 since per bottle price is 180
  const createSalesSteps = () => Math.round(Math.round(997 * 180) / 5);
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

  let salesArray = calculateGraphValues(createSalesSteps(), "sale");
  let inventoryArray = calculateGraphValues(createInventorySteps(), "inventory");
  console.log("there are my inventory array", inventoryArray);
  // render Function

  return (
    <>
      <Header navigation={navigation} title={user.name} image={null} />
      <ScrollView style={ConstantStyles.screen}>
        <View style={{ marginVertical: verticalScale(10) }}>
          <Text
            style={ConstantStyles.graphTitle}>
            Sales Forcast
          </Text>
        </View>
        {
          graphLoader || Math.max(...salesArray) == 0 ? <ActivityIndicator size={"large"} color={Colors.PrimaryBlue} /> : <LineGraph yAxis={salesArray} type={"sale"} prediction={prediction} />
        }

        <View style={{ marginVertical: verticalScale(10) }}>
          <Text
            style={ConstantStyles.graphTitle}>
            Order Analytics
          </Text>
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
      </ScrollView>
    </>
  );
};

export default DashBoardScreen;
