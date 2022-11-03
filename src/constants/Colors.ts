import layoutParams from "../utils/LayoutParams";

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000', background: layoutParams.colors.backgroundColor, tint: tintColorLight
  }, dark: {
    text: '#fff', background: '#000', tint: tintColorDark
  },
};
