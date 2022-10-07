import {Animated} from "react-native";
import React from "react";
import {flatlistProps} from "../utils/AppInterfaces";


export default function FlatListView({...props}: flatlistProps) {
    return (<Animated.FlatList {...props} />);
}
