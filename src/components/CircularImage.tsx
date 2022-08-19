import {GestureResponderEvent, Image, ImageSourcePropType, ImageStyle, StyleProp, TouchableOpacity} from "react-native";
import React from "react";

interface ImageProps {
    style: StyleProp<ImageStyle>;
    source: ImageSourcePropType,
    onPress?:(event: GestureResponderEvent) => void
}

export  default function CircularImage({
                                  style, source,onPress
                              }: ImageProps) {
    return (<TouchableOpacity onPress={()=>onPress}>
        <Image source={source} style={style} resizeMethod="auto"/>
    </TouchableOpacity>);
}
