import {GestureResponderEvent, Image, ImageSourcePropType, ImageStyle, StyleProp, TouchableOpacity} from "react-native";
import React from "react";

interface ImageProps {
    style: StyleProp<ImageStyle>;
    source: ImageSourcePropType,
    onPress?:(event: GestureResponderEvent) => void
}

export default function CircularImage({...props}: ImageProps) {
    return (<TouchableOpacity {...props}>
        <Image {...props} resizeMethod="auto"/>
    </TouchableOpacity>);
}
