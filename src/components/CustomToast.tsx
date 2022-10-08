import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Animated, Platform, StyleSheet, Text, ToastAndroid, useWindowDimensions, View,} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import layoutParams from "../utils/LayoutParams";

interface Props {
}

export const DURATION = {
    LENGTH_SHORT: 2000,
    FOREVER: 0,
};

const CustomToast: React.FC<Props> = React.forwardRef((_props, ref) => {
    const {height} = useWindowDimensions();

    const [isShow, setShow] = useState<boolean>(false);
    const [toastText, setToastText] = useState<string>('');
    const opacityValue = useRef<Animated.Value>(new Animated.Value(1)).current;
    let animation: Animated.CompositeAnimation | null = null;
    let timer: NodeJS.Timeout | null = null;
    let isShowing: boolean = false;

    useEffect(() => {
        return () => {
            animation && animation.stop();
            timer && clearTimeout(timer);
        };
    }, [animation, timer]);

    useImperativeHandle(ref, () => ({
        show: (text: string) => {
            Platform.OS === 'android'
                ? ToastAndroid.show(text, ToastAndroid.SHORT)
                : show(text);
        },
    }));

    const show = (text: string) => {
        setShow(true);
        setToastText(text);

        animation = Animated.timing(opacityValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        });
        animation.start(() => {
            isShowing = true;
            close();
        });
    };

    const close = () => {
        let delay = DURATION.LENGTH_SHORT;

        if (!isShowing && !isShow) {
            return;
        }
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            animation = Animated.timing(opacityValue, {
                toValue: 0.0,
                duration: 500,
                useNativeDriver: true,
            });
            animation.start(() => {
                setShow(false);
                isShowing = false;
            });
        }, delay);
    };

    return (
        <>
            {isShow && Platform.OS !== 'android' && (
                <View
                    style={[styles.container, {top: height - 120}]}
                    pointerEvents="none"
                >
                    <Animated.View style={[styles.content, {opacity: opacityValue}]}>
                        <AntDesign name="checkcircle" size={24} color={layoutParams.colors.white}/>
                        <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <Text style={styles.text}>{toastText}</Text>
                        </View>

                    </Animated.View>
                </View>
            )}
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 1,
        alignItems: 'center',
        zIndex: 10000,
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: layoutParams.colors.lighGrey,
        borderRadius: 18,
        padding: 15,
        bottom: 64,
        margin: 10,
    },
    text: {
        fontSize: 15,
        color: '#f8f8f8',
        textAlign: 'center',
        fontFamily: "WorkSans_600SemiBold",
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
});

export default CustomToast;
