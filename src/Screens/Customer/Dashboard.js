import React, { PureComponent, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, LogBox, ScrollView, Text, View } from 'react-native';
import { ConstantStyles } from '../../Constants/Styles';
import Header from '../../Components/Headers/Header';
import LineGraph from '../../Components/Graphs/LineGraph';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../../Constants/Colors';
import { Font } from '../../Constants/font';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Services from '../../Api/Services';
import WeatherCard from '../../Components/WeatherCard';

const DashBoardScreen = ({ navigation }) => {
    const user = useSelector((state) => state.auth.user);
    const [weather, setWeather] = useState();
    const [loader, setLoader] = useState(false);
    console.log("weather", weather?.location?.country);
    useFocusEffect(useCallback(() => {
        Services.getCurrentWeather(setWeather, setLoader);
    }, []))
    // render Function

    return (
        <>
            <Header navigation={navigation} title={user.name} image={null} />
            <ScrollView style={ConstantStyles.screen}>
                <WeatherCard loader={loader} weather={weather}/>
            </ScrollView>
        </>
    );
};

export default DashBoardScreen;
