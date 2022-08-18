import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    WINDOW: {
        width, height,
    }, isSmallDevice: width < 375, elevation: {
        shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.5, shadowRadius: 2, elevation: 2,
    }, colors: {
        backgroundColor: "#D8DEE0",
        white: "#E5E8E8",
        buttonColors: "#273746",
        deepBlue: "#185EA4",
        black: "#17202A",
        disabledButtonColor: "#D5D8DC",
        disabledTextColor: "#AEB6BF",
        textInputColor: "#E5E7E9",
        greyColor: "#8cb2c9"
    }
};
