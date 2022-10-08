import {carData, CarViewProps} from "../utils/AppInterfaces";
import {Animated, Easing, Image, Pressable, StyleSheet} from "react-native";
import layoutParams from "../utils/LayoutParams";
import {Text, View} from "../components/Widgets";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../navigation/ScreenTypes";
import {PopularCarData} from "../utils/Data";



const ViewedCarList = ({...props}: CarViewProps) => {
    const PressableView = Animated.createAnimatedComponent(Pressable);
    const opacity = React.useRef<Animated.Value>(new Animated.Value(0)).current;
    const translateY = React.useRef<Animated.Value>(new Animated.Value(50)).current;
    const navigation = useNavigation<CombinedNavigationProps>();


    function getSelectedCar(carYom: string) {
        return PopularCarData.find(mappedCar => mappedCar.yom === carYom);
    }

    const [state, setState] = React.useState({
        selectedId: 0,
    });
    React.useEffect(() => {
        Animated.parallel([Animated.timing(translateY, {
            toValue: 0, duration: 500, delay: props.index * 100, useNativeDriver: true,
        }), Animated.timing(opacity, {
            toValue: 1, duration: 500, delay: props.index * 200, useNativeDriver: true, easing: Easing.linear
        })

        ]).start()
    }, [props.index]);
    const carRowItems = (item: string, key: string) => (<View style={{
        flexDirection: "row",
    }}>
        <Text style={{
            fontFamily: "WorkSans_600SemiBold", color: layoutParams.colors.lighGrey
        }} adjustsFontSizeToFit>{item}</Text>
        <Text style={{
            fontFamily: "WorkSans_500Medium",
        }}>{key}</Text>
    </View>);
    return (<PressableView style={{
        ...viewedCarStyles.list, padding: 5, opacity, translateY
    }} key={props.index} onPress={() => {
        setState({
            ...state, selectedId: props.index
        });
        navigation.navigate("CarDetails", {cardetails: getSelectedCar(props.carData.yom)});
    }}>
        {/*Car Items at the start*/}
        <Image source={require("../../assets/images/mainCarImage.jpg")} style={{
            justifyContent: "flex-start",
            height: "100%",
            width: layoutParams.WINDOW.width * .4,
            borderRadius: 10,
            resizeMode: "contain",
        }}/>
        <View style={{
            flex: 1, marginLeft: 5
        }}><Text style={{
            fontSize: 20, marginTop: 5, fontFamily: 'WorkSans_600SemiBold'
        }}>{props.carData.make}</Text>
            {carRowItems("Model : ", props.carData.model as string)}
            {carRowItems("Price : ", "ksh. " + props.carData.price)}
            {carRowItems("Year Of Manufacturing : ", props.carData.yom)}
            {carRowItems("Mileage : ", props.carData.mileage + " kms")}
        </View>
    </PressableView>)
}

export default ViewedCarList;

const viewedCarStyles = StyleSheet.create({
    list: {
        margin: 10,
        borderRadius: 10,
        minHeight: layoutParams.WINDOW.height * .15,
        flexDirection: "row",
        backgroundColor: layoutParams.colors.searchInput, ...layoutParams.elevation
    }
})
