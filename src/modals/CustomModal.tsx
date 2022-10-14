import {Text, View} from "../components/Widgets";
import {Modal, StyleSheet} from "react-native";
import React from "react";
import layoutParams from "../utils/LayoutParams";

interface CloseAccountProps {
    visible: boolean;
    modalHeading: string;
    children: React.ReactNode;
}

export default function CustomModal({...props}: CloseAccountProps) {
    const [modalVisible, setModalVisible] = React.useState(props.visible);

    return (<View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{
                        ...styles.modalText
                    }}>Message</Text>
                    <Text style={[styles.modalText, {
                        fontSize: 16
                    }]}>{props.modalHeading}</Text>
                    {props.children}
                </View>
            </View>
        </Modal>
    </View>)
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1, marginTop: 22, justifyContent: "center"
    }, modalView: {
        margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, ...layoutParams.elevation
    }, button: {
        borderRadius: 20, padding: 10, elevation: 2,
    }, buttonOpen: {
        backgroundColor: '#F194FF',
    }, buttonClose: {
        backgroundColor: '#2196F3',
    }, modalText: {
        textAlign: "center", fontSize: 20, fontFamily: "Poppins_400Regular"
    },
});
