import {useRoute} from "@react-navigation/native";
import {Text, View} from "../../../components/Widgets";
import {HomeRouteProp} from "../../../navigation/ScreenTypes";
import {Animated, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import layoutParams from "../../../utils/LayoutParams";
import layout from "../../../utils/LayoutParams";
import React from "react";
import * as SplashScreen from 'expo-splash-screen';
import {CarObjectInterface} from "../../../utils/AppInterfaces";
import {sharedStyles} from "../../../utils/SharedStyles";

SplashScreen.preventAutoHideAsync();
export default function CarDetails() {
    const boxOpacity = React.useRef<Animated.Value>(new Animated.Value(0));
    const [state, setState] = React.useState({
        carData: {} as CarObjectInterface | undefined, appIsReady: false
    })
    let filteredObject = {};
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
            Animated.timing(boxOpacity.current, {
            toValue: 1, duration: 500, delay: 200, useNativeDriver: true,
        })
        ]).start();

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
            <ImageBackground source={require("../../../../assets/images/mainCarImage.jpg")} style={{
                height: "70%", width: "95%", borderRadius: 10, marginTop: 20
            }}/>
        </View>);
    }

    const infoBox = (text1: string, text2: string) => (<View style={styles.timeBoxContainer}>
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
                <ScrollView>
                    <Text style={{
                        fontSize: 20, fontFamily: "WorkSans_600SemiBold", marginLeft: 30, marginTop: 10
                    }}>Specifications</Text>
                    <Animated.View
                        style={{
                            flexDirection: 'row', padding: 8, opacity: boxOpacity.current,
                        }}
                        renderToHardwareTextureAndroid // just to avoid UI glitch when animating view with elevation
                    >
                        {Object.entries(route.params.cardetails).filter(key => {
                            delete route.params.cardetails['imageUrl']
                            delete route.params.cardetails['id']
                            return route.params.cardetails;
                        }).map((text, index) => (infoBox(text, "Car Info")))}
                    </Animated.View>
                </ScrollView>

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
        paddingVertical: 12,
        elevation: 3,
        shadowColor: 'grey',
        shadowOffset: {width: 1.1, height: 1.1},
        shadowOpacity: 0.22,
        shadowRadius: 8.0,
    }, timeBoxTitle: {
        fontSize: 14, fontFamily: 'WorkSans_600SemiBold', color: layoutParams.colors.black,
    }, textStyle: {
        fontSize: 22, fontFamily: 'WorkSans_500Medium', color: layoutParams.colors.lighGrey, letterSpacing: 0.27,
    },
})
