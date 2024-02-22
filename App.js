import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Provider, useDispatch, useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import store from './src/Redux/store';
import ShopNavigator from './src/Navigation/ShopNavigator';
import { UseSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN } from './src/Redux/Types';
import CustomerNavigator from './src/Navigation/CustomerNavigator';
import Toast from 'react-native-toast-message';
import toastConfig from './src/Constants/ToastConfig';
import Services from './src/Api/Services';

function App() {
  useEffect(() => {
    AsyncStorage.getItem("user").then(async (item) => {
      const user = JSON.parse(item);
      if (user != null) {
        //try updating user data
        Services.getUserDetails(user, dispatch, () => {
          SplashScreen.hide();
        })
      }
      else {
        SplashScreen.hide();
      }

      // setTimeout(() => {
      //   SplashScreen.hide();
      // }, 1500);

    })
  }, []);
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user);
  console.log(user);
  return (
    // <View style={ConstantStyles.screen}>
    //  <Ionicons name="menu" size={24} color="black" />
    // </View>
    // <SignInScreen/>

    <NavigationContainer>
      {user?.role_id == 1 && <ShopNavigator />}
      {user == null && <AuthNavigator />}
      {user?.role_id == 2 && <CustomerNavigator />}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
