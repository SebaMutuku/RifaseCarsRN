import React from "react";
import {Modal, StatusBar, StyleSheet} from "react-native";
import {View} from "./Widgets";
import {sharedStyles} from "../utils/SharedStyles";
import layoutParams from "../utils/LayoutParams";
import {BottomSheetComponentProps} from "../utils/AppInterfaces";

export default function CustomModal({...props}: BottomSheetComponentProps) {
    return (<View style={modalStyles(props.height).container}>
        <StatusBar translucent backgroundColor="black" animated={true}/>
        <Modal style={modalStyles(props.height).modalView} visible={props.visible} animated={true}
               animationType="slide">
            {props.children}
        </Modal>
    </View>);
}
const modalStyles = (height: number) => StyleSheet.create({
    container: {
        ...sharedStyles.container, height: height
    }, modalView: {
        margin: 20, borderRadius: 20, padding: 35, alignItems: 'center', ...layoutParams.elevation
    }
});
