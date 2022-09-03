import React from "react";
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import layoutParams from "../../../utils/LayoutParams";
import {Text} from "../../../components/Themed";

export default function Messages() {
    return (<SafeAreaView style={{
        ...messageStyles.container
    }}>
        <ScrollView>
            <Text>Scrolling.....</Text>
        </ScrollView>
    </SafeAreaView>)
}
const messageStyles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: layoutParams.colors.backgroundColor
    }
})
