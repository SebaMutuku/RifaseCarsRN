import {createNavigationContainerRef} from "@react-navigation/native";
import {UnauthenticatedParamList} from "./ScreenTypes";
import {Alert} from "react-native";


export const navigationRef = createNavigationContainerRef<UnauthenticatedParamList>()

export function navigate(name: keyof UnauthenticatedParamList, params: any) {
    console.log("Navigation "+ JSON.stringify(navigationRef))
    if (navigationRef.isReady()) {
        // Perform navigation if the react navigation is ready to handle actions
        navigationRef.navigate(name, params);
    } else {
        Alert.alert("Not Added", "Authentication not added")
    }
}
