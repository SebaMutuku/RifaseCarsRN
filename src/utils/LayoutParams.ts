import {Dimensions, Platform} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    WINDOW: {
        width, height,
    }, isSmallDevice: width < 375,
    elevation: {
        shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 2, elevation: 2,
    },
    colors: {
        lighGrey: "#566573",
        backgroundColor: "#FFFFFF",
        white: "#FFFFFF",
        buttonColors: "#273746",
        deepBlue: "#185EA4",
        black: "#17202A",
        disabledButtonColor: "#D5D8DC",
        disabledTextColor: "#AEB6BF",
        textInputColor: "#E5E7E9",
        grey: "#D7E1E7",
        selectedColor: "#8cb2c9",
        loadMore: "#C0392B",
        red: "#DE3163",
        messageColor: "#DCF8C5",
        searchInput: "#F8FAFB"
    }, platform: {
        isAndroid: Platform.OS === 'android', isiOS: Platform.OS == 'ios'
    }

};
