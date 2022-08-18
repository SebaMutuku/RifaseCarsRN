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
    Roboto_400Regular,
    Poppins_700Bold,
    Roboto_500Medium
} from "@expo-google-fonts/dev";

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
                    Poppins_100Thin,
                    Poppins_500Medium,
                    Poppins_400Regular,
                    Poppins_700Bold,
                    Roboto_500Medium,
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
