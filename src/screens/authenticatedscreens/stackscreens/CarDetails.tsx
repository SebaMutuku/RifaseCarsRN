import {useRoute} from "@react-navigation/native";
import {Text, View} from "../../../components/Themed";
import {HomeRouteProp} from "../../../navigation/ScreenTypes";
import {Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import layoutParams from "../../../utils/LayoutParams";
import layout from "../../../utils/LayoutParams";
import React from "react";
import * as SplashScreen from 'expo-splash-screen';
import {Entypo} from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();
export default function CarDetails() {
    interface carObject {
        id: string,
        make: string,
        mileage: string,
        price: string,
        yom: string
    }

    const [state, setState] = React.useState({
        carData: {} as carObject, appIsReady: false
    })

    const route: any = useRoute<HomeRouteProp>();
    React.useEffect(() => {
        setState({
            ...state, carData: route.params.cardetails
        });
        if (state.carData as any != undefined) {
            setState({
                ...state, appIsReady: true
            })
        }
    }, [route.params]);
    const onLayoutRootView = React.useCallback(async () => {
        if (state.appIsReady) {
            await SplashScreen.hideAsync();

        }

    }, [state.appIsReady]);

    function carSliderImage() {
        return (<View style={{
            ...styles.carSliderView
        }}>
            <Image source={require("../../../../assets/images/mainCarImage.jpg")} style={{
                height: "70%", width: "95%", borderRadius: 10, resizeMode: "contain", marginTop: 20
            }}/>
            <Text style={{
                fontSize: 25, fontWeight: "bold"
            }}> {route.params.cardetails != undefined || route.params.cardetails != null ? route.params.cardetails.make : "Loading details"}</Text>
        </View>);
    }

    return state.appIsReady ? (<SafeAreaView style={{...styles.container}}>
        {carSliderImage()}
        <View style={{
            margin: 5, flex: 1
        }}>
            <Text style={{
                fontWeight: "bold", fontSize: 18
            }}>Car desciption</Text>
            <ScrollView style={{
                marginTop: 10
            }}>
                <Text style={{
                    fontSize: 16
                }}>When/where was the car built?
                    Do you know what production number your car is?
                    Can you determine ownership history? Include any noteworthy or celebrity owners, if any.
                    What original parts does it have? If you purchased the car and were told it has “matching numbers,”
                    which means the car carries the original engine and other mechanical components, it is important to
                    consider getting that verified by an expert.
                    Include all the specifications of the vehicle that you can: engine, intake, transmission, brakes,
                    wheels/tires, interior features, etc.
                    Was the car restored? If so, who restored it? When was it restored?
                    Do you have the restoration photos and/or receipts? Not only should these be scanned and sent along
                    with
                    your consignment application, you may want to consider including them with the sale.
                    Has the car been customized? What custom elements are on the vehicle?
                    Has the vehicle won awards? Summarize those and indicate if awards (or copies of them) will be
                    included
                    with the sale. Be sure to scan or photograph and send copies of awards with your consignment
                    application.
                    Has the car been featured in any prominent publications? Will copies of the publication be included
                    with
                    the sale?</Text>
                <TouchableOpacity style={{
                    ...styles.callerButton
                }} onPress={() => {
                }}>
                    <Text style={{
                        color: layoutParams.colors.white, fontSize: 18, fontWeight: "bold"
                    }}>Call Seller</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    </SafeAreaView>) : <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        onLayout={onLayoutRootView}>
        <Text>SplashScreen Demo! 👋</Text>
        <Entypo name="rocket" size={30}/>
    </View>;
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: layoutParams.colors.backgroundColor
    }, carSliderView: {
        flex: 2,
        backgroundColor: layoutParams.colors.white, ...layoutParams.elevation,
        margin: 5,
        borderRadius: 10,
        alignItems: "center"
    }, callerButton: {
        elevation: layout.elevation.elevation,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: layoutParams.colors.black,
        width: layout.WINDOW.width * .95,
        borderRadius: 10,
        padding: 6,
        height: layout.WINDOW.height * .07
    }
})
