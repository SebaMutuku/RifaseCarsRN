import {useRoute} from "@react-navigation/native";
import {Text, View} from "../../../components/Widgets";
import {HomeRouteProp} from "../../../navigation/ScreenTypes";
import {Animated, Easing, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import layoutParams from "../../../utils/LayoutParams";
import layout from "../../../utils/LayoutParams";
import React from "react";
import * as SplashScreen from 'expo-splash-screen';
import {CarItemProps} from "../../../utils/AppInterfaces";
import {sharedStyles} from "../../../utils/SharedStyles";
import {FontAwesome} from "@expo/vector-icons";


export default function CarDetails() {
    const viewOpacity = React.useRef<Animated.Value>(new Animated.Value(0)).current;
    const scrollOpacity = React.useRef<Animated.Value>(new Animated.Value(0)).current;
    const buttonTranslateX = React.useRef<Animated.Value>(new Animated.Value(100)).current;
    const [state, setState] = React.useState({
        carData: {} as CarItemProps | undefined, appIsReady: false
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
        Animated.parallel([
            Animated.timing(viewOpacity, {
                toValue: 1, duration: 500, delay: 200, useNativeDriver: true, easing: Easing.bounce
            }), Animated.timing(scrollOpacity, {
                toValue: 1, duration: 600, delay: 400, useNativeDriver: true,
                easing: Easing.linear
            }),
            Animated.timing(buttonTranslateX, {
                toValue: 1, duration: 1000, delay: 0, useNativeDriver: true,
                easing: Easing.linear
            })
        ]).start();

    }, [route.params]);
    const onLayoutRootView = React.useCallback(async () => {
        if (state.appIsReady) {
            await SplashScreen.hideAsync();
        }

    }, [state.appIsReady]);
    React.useMemo(() => Object.entries(route.params.cardetails).filter(row => {
        delete route.params.cardetails['id']
        return route.params;

    }), [route.params.cardetails]);

    function carSliderImage() {
        return (<View style={{
            ...styles.carSliderView
        }}>
            <ImageBackground source={require("../../../../assets/images/mainCarImage.jpg")} style={{
                height: "70%", width: "95%", borderRadius: 10, marginTop: 20
            }}/>
        </View>);
    }

    const lowerSection = () => (<ScrollView>
        <Text style={{
            fontSize: 25, fontFamily: "WorkSans_600SemiBold", marginLeft: 30, marginTop: 10
        }}>Ksh. {route.params.cardetails.price}</Text>
        <Animated.View
            style={{
                flexDirection: 'row', padding: 8, opacity: viewOpacity,
            }}
            renderToHardwareTextureAndroid // just to avoid UI glitch when animating view with elevation
        >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                {Object.entries(route.params.cardetails).map((entry: any, index) => (infoBox(entry[1], entry[0], index)))}
            </ScrollView>
        </Animated.View>
        <Animated.View style={{
            marginLeft: 10, marginTop: 10,
            opacity: scrollOpacity
        }}>
            <Text style={{
                fontSize: 20, fontFamily: "WorkSans_600SemiBold",
            }}>Specifications</Text>
            {route.params.cardetails.make && <Text style={{
                ...styles.carDescText
            }}>The Diesel engine is 1968 cc while the Petrol engine is 1395 cc . It is available with Automatic
                transmission. Depending upon the variant and fuel type the A3 has a mileage of 19.2 to 20.38 kmpl &
                Ground
                clearance of A3 is 165mm. The A3 is a 5 seater 4 cylinder car.
                Fuel Type: Petrol
                Fuel Tank Capacity: 50.0
                Body Type: Sedan
                Engine Displacement (cc): 1395</Text>}
        </Animated.View>
        <Animated.View style={{
            flex: 1,
            marginTop: 20,
            marginRight: 10,
            marginLeft: 10,
            translateX: buttonTranslateX
        }}>
            <FontAwesome.Button name="phone" style={{
                ...layoutParams.elevation,
            }} color={layoutParams.colors.white} iconStyle={{
                margin: 10,
                color: layoutParams.colors.white
            }} onPress={() => {
            }} size={24} backgroundColor={layoutParams.colors.black} borderRadius={15}>
                Call the Owner
            </FontAwesome.Button>
        </Animated.View>
    </ScrollView>)

    const infoBox = (text1: string, text2: string, key: number) => (<View style={styles.timeBoxContainer} key={key}>
        <Text style={[styles.textStyle, styles.timeBoxTitle]}>{text1}</Text>
        <Text style={[styles.textStyle, {fontSize: 14}]}>{text2}</Text>
    </View>);

    return (<SafeAreaView style={{
        ...sharedStyles.container, backgroundColor: layoutParams.colors.listColors
    }}>
        <View style={{flex: 1}}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content"/>
            <View style={{
                flex: 1
            }}>
                {carSliderImage()}
            </View>
            <View style={{
                ...styles.secondView
            }}>
                {lowerSection()}
            </View>
        </View>
    </SafeAreaView>);
}
const styles = StyleSheet.create({
    carSliderView: {
        flex: 1,
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
    }, secondView: {
        flex: 3,
        backgroundColor: layoutParams.colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowOffset: {width: 1.1, height: 1.1},
        shadowOpacity: 0.2,
        shadowRadius: 10.0,
        elevation: 16,
    }, timeBoxContainer: {
        backgroundColor: layoutParams.colors.white,
        borderRadius: 16,
        alignItems: 'center',
        margin: 8,
        paddingHorizontal: 18,
        paddingVertical: 12, ...layoutParams.elevation
    }, timeBoxTitle: {
        fontSize: 14, fontFamily: 'WorkSans_600SemiBold', color: layoutParams.colors.black,
    }, textStyle: {
        fontSize: 22, fontFamily: 'WorkSans_500Medium', color: layoutParams.colors.lighGrey, letterSpacing: 0.27,
    },
    carDescText: {
        fontFamily: "Poppins_500Medium"
    }
})
