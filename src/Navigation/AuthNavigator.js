import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import SignInScreen from '../Screens/Authentication/SignIn';
import SignUpScreen from '../Screens/Authentication/SignUp';
import OtpScreen from '../Screens/Authentication/Otp';
import SearchEmailScreen from '../Screens/Authentication/SearchEmail';
import ChangePasswordScreen from '../Screens/Authentication/ChangePassword';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Sign-In"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={SignInScreen} name="Sign-In" />
      <Stack.Screen component={SignUpScreen} name="Sign-up" />
      <Stack.Screen component={OtpScreen} name="Otp" />
      <Stack.Screen component={SearchEmailScreen} name="Forgot-password" />
      <Stack.Screen component={ChangePasswordScreen} name="Change-password" />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
