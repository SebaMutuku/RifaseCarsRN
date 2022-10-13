import layoutParams from "./LayoutParams";
import layout from "./LayoutParams";
import {StatusBar, StyleSheet} from "react-native";


export const sharedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: layoutParams.colors.backgroundColor,
    },
    searchInputMainContainer: {
        margin: 10,

    }, searchInputContainer: {
        padding: 15,
        flexDirection: 'row',
        backgroundColor: layoutParams.colors.searchInput,
        borderRadius: 13,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: layoutParams.colors.grey,
        ...layoutParams.elevation

    }, searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'WorkSans_500Medium',
        color: layoutParams.colors.black,
    },
    appTitle: {
        fontFamily: "WorkSans_600SemiBold", fontSize: StatusBar.currentHeight, textAlign: "center",
    }
});
export const buttonStyle = (validatedInput: boolean) => StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 14,
        backgroundColor: validatedInput ? layout.colors.black : layout.colors.grey,
        borderWidth: 0.5,
        borderColor: layoutParams.colors.grey,
        margin: 10,
        borderRadius: 10
    }
});
