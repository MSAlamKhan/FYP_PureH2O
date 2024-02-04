import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashBoardScreen from '../Screens/Shop/Dashboard';
import {Image, View} from 'react-native';
import {ConstantStyles} from '../Constants/Styles';
import {moderateScale, scale} from 'react-native-size-matters';
import {Colors} from '../Constants/Colors';
import ProfileScreen from '../Screens/Common/Profie';
import WalletScreen from '../Screens/Common/Wallet';
import WithdrawScreen from '../Screens/Shop/Withdraw';
import InventoryScreen from '../Screens/Shop/Inventory';
import CustomButton from '../Components/CustomButton';
import CustomerScreen from '../Screens/Shop/Customers';
import CustomerDetailScreen from '../Screens/Shop/CustomerDetails';
import SubscriptionScreen from '../Screens/Shop/Subscription';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Main Navigator (Root Navigator)

const ShopNavigator = () => {
  return (
    <Drawer.Navigator
      // drawerContent={()=> (
      //   <View style={{height:scale(120),}}>
      //     <Image
      //   source={require('../Assets/Images/Banner.png')}
      //     style={ConstantStyles.bannerImage}
      //     />
      //   </View>
      // )}

      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.ScreenBackGroundColor,
        },
      }}>
      <Drawer.Screen name="My Dashboard" component={Home} />
      <Drawer.Screen name="My Profile" component={ProfileScreen} />
      <Drawer.Screen name="My Wallet" component={Wallet} />
      <Drawer.Screen name="My Inventory" component={InventoryScreen} />
      <Drawer.Screen name="My Customers" component={Customer} />
      <Drawer.Screen name="My Subscription" component={SubscriptionScreen} />
    </Drawer.Navigator>
  );
};

export default ShopNavigator;

// children Stack navigators

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={DashBoardScreen} />
      <Stack.Screen name="Profile-Home" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const Wallet = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} />
    </Stack.Navigator>
  );
};

const Customer = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Customers" component={CustomerScreen} />
      <Stack.Screen name="Customer-Details" component={CustomerDetailScreen} />
    </Stack.Navigator>
  );
};
