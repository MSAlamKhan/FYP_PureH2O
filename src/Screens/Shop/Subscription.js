import React, { PureComponent, useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import CommonHeader from '../../Components/Headers/CommonHeader';
import { ConstantStyles } from '../../Constants/Styles';
import { Colors } from '../../Constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import Services from '../../Api/Services';
import { FlatList } from 'react-native-gesture-handler';
import SubscriptionListTiles from '../../Components/ListTiles/SubscriptionListTiles';
import { useSafeAreaFrame } from 'react-native-safe-area-context';


const SubscriptionScreen = ({ navigation }) => {
    const [packages, setPackages] = useState([]);
    const [loader, setLoader] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoader(true);
        Services.getSubscriptionPackages(setPackages, setLoader);
    }, []))

    // render Function

    return (
        <>
            <CommonHeader
                navigation={navigation}
                title={"My Subscription"}
            />
            <View style={[ConstantStyles.screen, { backgroundColor: Colors.PaleBlue }]}>
                {!loader ? <FlatList
                    data={packages}
                    renderItem={({ item }) => <SubscriptionListTiles item={item} onPress={() => console.log("hello")} />}

                /> : <ActivityIndicator size={"large"} color={Colors.PrimaryBlue} style={{flex:1, }} />}

            </View>
        </>
    )
}


export default SubscriptionScreen;