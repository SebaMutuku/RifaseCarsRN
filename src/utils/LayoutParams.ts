import {Dimensions, Platform} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default {

    WINDOW: {
        width, height,
    }, isSmallDevice: width < 375,
    elevation: {
        elevation: 10,
        shadowColor: 'grey',
        shadowOffset: {width: 1.1, height: 1.1},
        shadowOpacity: 0.22,
        shadowRadius: 8.0,
    },
    colors: {
        lighGrey: "#566573",
        backgroundColor: "#FFFFFF",
        white: "#FFFFFF",
        buttonColors: "#273746",
        deepBlue: "#185EA4",
        primaryColor:"#0085FF",
        black: "#17202A",
        disabledButtonColor: "#D5D8DC",
        disabledTextColor: "#AEB6BF",
        textInputColor: "#E5E7E9",
        grey: "#D7E1E7",
        selectedColor: "#8cb2c9",
        loadMore: "#C0392B",
        red: "#DE3163",
        messageColor: "#DCF8C5",
        searchInput: "#F8FAFB",
        listColors: "#F5F9FD",
        textLightColor: "#9DA2A7"
    }, platform: {
        isAndroid: Platform.OS === 'android', isiOS: Platform.OS == 'ios'
    }

};
