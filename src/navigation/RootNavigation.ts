import {createNavigationContainerRef} from "@react-navigation/native";
import {UnauthenticatedParamList} from "./ScreenTypes";
import {Alert} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";


export const navigationRef = createNavigationContainerRef<UnauthenticatedParamList>()

export function navigate(name: keyof UnauthenticatedParamList, params: any) {
    if (navigationRef.isReady()) {
        // Perform navigation if the react navigation is ready to handle actions
        navigationRef.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: name})],
            })
        );
    } else {
        Alert.alert("Not Added", "Authentication not added")
    }
}
