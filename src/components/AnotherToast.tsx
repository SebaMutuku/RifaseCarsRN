// import React, {useEffect, useRef} from 'react';
//
// import {Animated, Text, View} from 'react-native';
// import layoutParams from "../utils/LayoutParams";
//
// interface MessageProps {
//     message: string;
//     type: string
// }
//
// const Message = (props: MessageProps) => {
//     const opacity = useRef(new Animated.Value(0)).current;
//     useEffect(() => {
//         Animated.sequence([Animated.timing(opacity, {
//             toValue: 1, duration: 500, useNativeDriver: true,
//         }), Animated.delay(2000), Animated.timing(opacity, {
//             toValue: 0, duration: 500, useNativeDriver: true,
//         }),]).start(() => {
//             // props.onHide();
//         });
//     }, []);
//
//     return (<View
//         style={{
//             position: 'absolute', bottom: 45, left: 0, right: 0,
//         }}
//     >
//         <Animated.View
//             style={{
//                 opacity,
//                 transform: [{
//                     translateY: opacity.interpolate({
//                         inputRange: [0, 1], outputRange: [-20, 0],
//                     }),
//                 },],
//                 margin: 10,
//                 marginBottom: 5,
//                 backgroundColor: props.type === "success" ? layoutParams.colors.white : layoutParams.colors.red,
//                 padding: layoutParams.WINDOW.height * .015,
//                 justifyContent: 'flex-start',
//                 alignItems: "flex-start",
//                 borderRadius: 4,
//                 flexDirection: "row", ...layoutParams.elevation,
//                 shadowOpacity: 0.15,
//                 shadowRadius: 5,
//                 elevation: 6,
//             }}>
//             <View style={{
//                 justifyContent: "center", alignItems: 'flex-start'
//             }}>
//                 <Text style={{
//                     fontSize: 20,
//                     textAlign: 'center',
//                     fontFamily: "WorkSans_600SemiBold",
//                     color: props.type == "success" ? layoutParams.colors.black : layoutParams.colors.white
//                 }}>Message</Text>
//                 <Text style={{
//                     fontFamily: "Poppins_500Medium",
//                     color: props.type == "success" ? layoutParams.colors.black : layoutParams.colors.white
//                 }}>{props.message}</Text>
//             </View>
//
//         </Animated.View>
//     </View>);
// };
//
// export default Message;
import React, {useCallback, useEffect, useState} from 'react';
import {Animated, DeviceEventEmitter, Platform, Text, ToastAndroid, TouchableOpacity,} from 'react-native';
import {SHOW_TOAST_MESSAGE} from "../utils/Utils";


const colors = {
    info: '#343a40',
    success: '#28a745',
    danger: '#dc3545',
};

const Toast = () => {
    const [messageType, setMessageType] = useState(null);
    const animatedOpacity = React.useRef<Animated.Value>(new Animated.Value(1)).current;


    const [timeOutDuration, setTimeOutDuration] = useState(5000);

    const [message, setMessage] = useState(null);

    const showToast = (data: any) => {
        if (Platform.OS === 'android' && data.useNativeToast) {
            return ToastAndroid.show(data.message, ToastAndroid.LONG);
        }
        if (data.duration) {
            setTimeOutDuration(data.duration);
        }
        setMessage(data.message);
        setMessageType(data.type);
    };

    const closeToast = useCallback(() => {
        setMessage(null);
        setTimeOutDuration(5000);
        Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true
        })
        clearInterval();
    }, [animatedOpacity]);

    useEffect(() => {
        if (message) {
            setInterval(() => {
                if (timeOutDuration === 0) {
                    closeToast();
                } else {
                    setTimeOutDuration(prev => prev - 1000);
                }
            }, 2000);
        }

        return () => {
            clearInterval();
        };
    }, [closeToast, message, timeOutDuration]);

    useEffect(() => {
        if (message) {
            Animated.timing(animatedOpacity, {
                toValue: 1,
                duration: 6000,
                useNativeDriver: true
            })
        }
    }, [message, animatedOpacity]);

    useEffect(() => {
        DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, showToast);

        return () => {
            DeviceEventEmitter.removeAllListeners(SHOW_TOAST_MESSAGE);
        };
    }, []);
    return (
        <>{message &&
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        bottom: '4%',
                        left: '4%',
                        right: '4%',
                        backgroundColor: "red",
                        zIndex: 1,
                        elevation: 1,
                        borderRadius: 4,
                    },
                ]}>
                <TouchableOpacity onPress={closeToast}>
                    <Text
                        style={{
                            padding: 14,
                            color: 'white',
                            fontSize: 16,
                            textAlign: 'center',
                        }}>
                        {message}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        }
        </>
    );
};

export default Toast;
