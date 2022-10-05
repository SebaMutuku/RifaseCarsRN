import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from "react";
import layoutParams from "../utils/LayoutParams";
import {WorkSans_500Medium} from "@expo-google-fonts/dev";

interface CategoryBtn {
    text: string;
    selectedIndex: number;
    onPress: () => void;
    index: number,
    data: any []
}

const BrandsButton = ({...props}: CategoryBtn) => (<>
    <View style={styleCatrgory(props.selectedIndex === props.index).categoryBtnContainer}>
        <Pressable
            style={({pressed}) => [{opacity: !layoutParams.platform.isAndroid && pressed ? 0.6 : 1},]}
            android_ripple={{color: 'lightgrey'}}
            onPress={props.onPress}
        >
            <Text style={styleCatrgory(props.selectedIndex === props.index).categoryBtnText}>
                {props.text}
            </Text>
        </Pressable>
    </View>
    {props.text !== props.data[props.index] && <View style={{width: 16}}/>}
</>);
const styleCatrgory = (selected: boolean) => StyleSheet.create({
    categoryBtnContainer: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 24,
        borderColor: 'rgb(0, 182, 240)',
        borderWidth: 1,
        backgroundColor: selected ? 'rgb(0, 182, 240)' : 'transparent',
    }, categoryBtnText: {
        padding: 18,
        paddingVertical: 12,
        fontSize: 12,
        fontFamily:  'WorkSans_500Medium',
        letterSpacing: 0.27,
        alignSelf: 'center',
        color: selected ? 'white' : 'rgb(0, 182, 240)',
    },
});
export default BrandsButton;
