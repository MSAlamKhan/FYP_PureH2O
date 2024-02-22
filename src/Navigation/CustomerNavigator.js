import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardScreen from '../Screens/Customer/Dashboard';
import { Image, View } from 'react-native';
import { ConstantStyles } from '../Constants/Styles';
import { moderateScale, scale } from 'react-native-size-matters';
import { Colors } from '../Constants/Colors';
import ProfileScreen from '../Screens/Common/Profie';
import WalletScreen from '../Screens/Common/Wallet';
import WithdrawScreen from '../Screens/Shop/Withdraw';
import InventoryScreen from '../Screens/Shop/Inventory';
import CustomButton from '../Components/CustomButton';
import CustomerScreen from '../Screens/Shop/Customers';
import CustomerDetailScreen from '../Screens/Shop/CustomerDetails';
import SubscriptionScreen from '../Screens/Shop/Subscription';
import SettingsScreen from '../Screens/Common/Settings';
import ChangePasswordScreen from '../Screens/Authentication/ChangePassword';
import RechargeScreen from '../Screens/Customer/Recharge';
import MyVendorScreen from '../Screens/Customer/MyVendor';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Main Navigator (Root Navigator)

const CustomerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.ScreenBackGroundColor,
        },
      }}>
      <Drawer.Screen name="My Dashboard" component={Home} />
      <Drawer.Screen name="My Profile" component={ProfileScreen} />
      <Drawer.Screen name="My Vendor" component={MyVendorScreen} />
      <Drawer.Screen name="My Wallet" component={Wallet} />
      <Drawer.Screen name="Settings" component={Settings} />

    </Drawer.Navigator>
  );
};

export default CustomerNavigator;

// children Stack navigators

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashBoardScreen} />
      <Stack.Screen name="Profile-Home" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const Wallet = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Recharge" component={RechargeScreen} />

    </Stack.Navigator>
  );
};


const Settings = () =>
(
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Change-Password" component={ChangePasswordScreen} />
  </Stack.Navigator>
);
