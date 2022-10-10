import {DeviceEventEmitter} from 'react-native';
import {SHOW_TOAST_MESSAGE} from "./Utils";

const toast = {
    info: (options: any) => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'info'});
    }, success: (options: any) => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'success'});
    }, danger: (options: any) => {
        DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'danger'});
    },
};

export default toast;
