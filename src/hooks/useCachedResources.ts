import {FontAwesome} from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import {
    Bangers_400Regular,
    OpenSans_400Regular,
    Poppins_100Thin,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_400Regular
} from "@expo-google-fonts/dev";

SplashScreen.preventAutoHideAsync();
export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    ...FontAwesome.font,
                    Roboto_400Regular,
                    Bangers_400Regular,
                    OpenSans_400Regular,
                    WorkSans_600SemiBold,
                    WorkSans_500Medium,
                    WorkSans_400Regular,
                    WorkSans_700Bold,
                    Poppins_100Thin,
                    Poppins_500Medium,
                    Poppins_400Regular,
                    Poppins_700Bold,
                    Roboto_500Medium,
                    Poppins_600SemiBold,
                    'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                await SplashScreen.hideAsync();
            }
        }
        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
