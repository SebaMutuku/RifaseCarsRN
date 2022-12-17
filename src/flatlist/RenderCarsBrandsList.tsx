import {Text} from "../components/Widgets";
import layoutParams from "../utils/LayoutParams";
import layout from "../utils/LayoutParams";
import React from "react";
import {Animated, Easing, Pressable, StyleSheet} from "react-native";
import {CarBrandsProps} from "../utils/AppInterfaces";


const RenderCarsBrandsList = ({...props}: CarBrandsProps) => {
    const brandOpacity = React.useRef<Animated.Value>(new Animated.Value(0)).current;
    const translateX = React.useRef<Animated.Value>(new Animated.Value(50)).current;

    function filterDataByMake(make: string) {
        return props.populaCarData.filter(item => item.make?.match(make))
    }

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: 0,
                duration: 400,
                delay: props.index * 50,
                useNativeDriver: true,
            }),
            Animated.timing(brandOpacity, {
                toValue: 1,
                duration: 600,
                delay: props.index * 50,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ]).start()
    }, [props.index]);

    return (
        <Animated.View style={{
            opacity: brandOpacity,
            transform: [{translateX}]
        }}>
            <Text style={{
                fontSize: 20,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 20,
                marginTop: 20,
                fontFamily: "WorkSans_600SemiBold",
                color: props.brandSelected === props.index ? layoutParams.colors.black : layout.colors.selectedColor
            }}
                  adjustsFontSizeToFit onPress={() => {
                props.onPress();
                filterDataByMake(props.item);
            }}>{props.item.charAt(0).toString().toUpperCase() + props.item.substring(1, props.item.length)}</Text>
        </Animated.View>)

}
export default React.memo(RenderCarsBrandsList)
const brandStyles = (brandSelected: number, index: number) => StyleSheet.create({
    brandButton: {
        alignItems: 'center',
        justifyContent: "center",
        minWidth: layoutParams.WINDOW.width * .2,
        padding: brandSelected == index ? 10 : 6,
        backgroundColor: brandSelected == index ? layout.colors.deepBlue : layout.colors.white,
        borderColor: brandSelected == index ? layout.colors.deepBlue : layout.colors.deepBlue,
        borderWidth: 0.05,
        margin: 3,
        borderRadius: 24,
        ...layoutParams.elevation
    }
});
