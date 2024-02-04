import React, { PureComponent } from 'react';
import { View } from 'react-native';
import CommonHeader from '../../Components/Headers/CommonHeader';
import { ConstantStyles } from '../../Constants/Styles';
import { Colors } from '../../Constants/Colors';


const SubscriptionScreen = ({navigation}) =>{


    // render Function

    return(
        <>
        <CommonHeader 
        navigation={navigation}
        title={"My Subscription"}
        />
        <View style={[ConstantStyles.screen, {backgroundColor:Colors.PaleBlue}]}>

        </View>
        </>
    )
}


export default SubscriptionScreen;