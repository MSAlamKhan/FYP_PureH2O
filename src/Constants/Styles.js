import {StyleSheet} from 'react-native';
import {Colors} from './Colors';
import {
  scale,
  verticalScale,
  moderateVerticalScale,
  moderateScale,
} from 'react-native-size-matters';
import {Font} from './font';
export const ConstantStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.ScreenBackGroundColor,
    padding: scale(10),
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  authText: {
    fontFamily: Font.Poppins700,
    color: Colors.Black,
    fontSize: scale(20),
  },
  mainHeadingText: {
    color: Colors.PrimaryBlue,
    fontSize: scale(30),
    fontFamily: Font.Manrope600,
  },
  subText: {
    color: Colors.PrimaryBlue,
    textAlign: 'center',
    fontFamily: Font.Poppins600,
  },
  graphTitle: {
    fontSize: scale(15),
    color: Colors.Black,
    fontFamily: Font.Gilroy500,
  },
  listTileTitle:{
    fontFamily: Font.Poppins500,
    color: Colors.Black,
    fontSize: scale(15),
  },
  listTileSubText:{
    fontFamily: Font.Poppins300,
    color: Colors.Black,
    fontSize: scale(12),
  },
  listTile:{
    height: scale(100),
    flexDirection: 'row',
    alignItems: 'center',
    margin: scale(10),
    borderRadius: scale(20),
    padding: moderateScale(10),
  },
  listTileImage:{
    height: scale(80),
    width: scale(80),
    backgroundColor: Colors.PaleBlue,
    borderRadius: scale(20),
  }
});
