import * as SecureStore from 'expo-secure-store';

export const appBaseUrl = "https://heroku";
export const checkValidMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export async function saveValue(key: string, value: any) {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (e) {
        console.log(e)
    }
}

export async function getValue(key: string) {
    try {
        let value = await SecureStore.getItemAsync(key);
        return value ?? null;
    } catch (e) {
        console.log(e)
        return null;
    }
}

export async function removeValue(key: string) {
    try {
        await SecureStore.deleteItemAsync(key);
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

const utils = {
    saveValue, getValue, removeValue, appUrl: appBaseUrl,checkValidMail
}

export default utils;
