import Toast from "react-native-toast-message";

interface ToastInterface {
    type: string,
    message: string,
    position: any

}

export default function CustomToast({...props}: ToastInterface) {
    return <Toast{...props} autoHide={true} visibilityTime={4000} bottomOffset={10}/>

}
