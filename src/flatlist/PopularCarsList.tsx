import layoutParams from "../utils/LayoutParams";
import {Animated, Easing, Image, Pressable, StyleSheet} from "react-native";
import {Text, View} from "../components/Widgets";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {PopularCarListProps} from "../utils/AppInterfaces";




const PopularCarsList = ({...props}: PopularCarListProps) => {
    const popularCarOpacity = React.useRef<Animated.Value>(new Animated.Value(0)).current;
    const translateY = React.useRef<Animated.Value>(new Animated.Value(50)).current;
    const favIconScale = React.useRef<Animated.Value>(new Animated.Value(0.1));
    const PressableView = Animated.createAnimatedComponent(Pressable);
    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                delay: props.index * 100,
                useNativeDriver: true,
            }),
            Animated.timing(popularCarOpacity, {
                toValue: 1,
                duration: 500,
                delay: props.index * 200,
                useNativeDriver: true,
                easing: Easing.linear
            }),
            Animated.timing(favIconScale.current, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            })
        ]).start()
    }, [props.index]);

    return (<PressableView style={{
        ...popularCarStyles.popularCars,
        backgroundColor: layoutParams.colors.listColors,
        elevation: props.selectedId == props.index ? layoutParams.elevation.elevation : 0,
        opacity: popularCarOpacity,
        translateY
    }} onPress={() => props.onPress()}>
        <Image source={require("../../assets/images/mainCarImage.jpg")} style={{
            width: "100%", borderRadius: 10, padding: 10, resizeMode: "contain", height: "40%"
        }}/>
        <View style={{
            marginLeft: 5,
            marginRight: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center'
        }}><Text style={{
            textAlign: 'center', fontSize: 20, fontFamily: "WorkSans_600SemiBold"
        }} adjustsFontSizeToFit>{props.objectItem?.make}</Text>
            <Text style={{
                color: layoutParams.colors.lighGrey, fontFamily: "WorkSans_600SemiBold", fontSize: 18
            }} adjustsFontSizeToFit>ksh. {props.objectItem?.price}</Text>
        </View>
        {props.renderCarSpecs}
        {/*Horizontal line*/}
        <View style={{
            justifyContent: 'center', alignItems: 'center'
        }}>
            <View style={{
                margin: 5, borderBottomWidth: StyleSheet.hairlineWidth, width: "85%"
            }}/>
        </View>
        <View>
            <Text style={{
                textAlign: 'center', fontFamily: "WorkSans_600SemiBold",
            }} adjustsFontSizeToFit>Show more specs</Text>
        </View>
        <Animated.View
            style={[
                popularCarStyles.favoriteIcon,
                {
                    transform: [{scale: favIconScale.current}],
                },
            ]}
        >
            <Icon name="favorite" size={24} color="white"/>
        </Animated.View>
    </PressableView>);
}
export default PopularCarsList;

const popularCarStyles = StyleSheet.create({
    popularCars: {
        margin: 3,
        borderRadius: 10,
        marginBottom: 30,
        padding: 5,
        minWidth: layoutParams.WINDOW.width * .5
    },
    favoriteIcon: {
        left: 10,
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'rgb(0, 182, 240)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 18,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
})
