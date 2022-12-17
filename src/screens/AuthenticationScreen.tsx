import React, {useEffect} from "react";
import {CombinedNavigationProps} from "../navigation/ScreenTypes";
import utils from "../utils/Utils";
import useCachedResources from "../hooks/useCachedResources";
import useColorScheme from "../hooks/useColorScheme";
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {navigate} from "../navigation/RootNavigation";


export default function AuthenticationScreen() {
    const navigation = useNavigation<CombinedNavigationProps>();
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const [state, setState] = React.useState({
        token: null
    });
    const fetchToken = async () => {
        await utils.saveValue("token", "yayyayayyaass");
        let savedToken = await utils.getValue("token");
        console.log("Saved token ....", savedToken);
        if (savedToken != undefined || savedToken != null) {
            navigation.navigate("HomeScreen")
        } else {
            navigation.navigate("Login")
        }
    }
    useEffect(() => {
        console.table("Executing function ", state.token);
        fetchToken();
    }, [])

    return (isLoadingComplete ? <View style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    }}><Text style={{fontWeight: "bold", fontSize: 25}}>Loading ...</Text></View> : null);

}
