import {Animated} from "react-native";
import React from "react";
import layout from "../constants/Layout";
import {imageProps} from "../utils/AppInterfaces";




export default function displayImage({resizeMode, borderRadii}: imageProps) {
    return (
        <Animated.Image source={require('../../assets/images/mainCarImage.jpg')} style={{
            flex: 1, resizeMode: resizeMode, borderBottomLeftRadius: borderRadii, borderBottomRightRadius: borderRadii,
            width: layout.window.width
        }}/>);

}
