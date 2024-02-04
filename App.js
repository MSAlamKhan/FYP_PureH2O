import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

import {Provider, useSelector} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import store from './src/Redux/store';
import ShopNavigator from './src/Navigation/ShopNavigator';
import {UseSelector} from 'react-redux';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3500);
  }, []);

  const email = useSelector(state => state.auth.email);
  return (
    // <View style={ConstantStyles.screen}>
    //  <Ionicons name="menu" size={24} color="black" />
    // </View>
    // <SignInScreen/>

    <NavigationContainer>
      {email == 'shop@a.com' && <ShopNavigator />}
      {email == null && <AuthNavigator />}
    </NavigationContainer>
  );
}

export default App;
