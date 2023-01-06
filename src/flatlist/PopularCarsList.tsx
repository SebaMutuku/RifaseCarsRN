import layoutParams from "../utils/LayoutParams";
import { Animated, Easing, Image, Pressable, StyleSheet } from "react-native";
import { Text } from "../components/Widgets";
import React, { memo } from "react";
import { PopularCarListProps } from "../utils/AppInterfaces";
import { appFonts } from "../utils/AllConstant";

const PopularCarsList = ({ ...props }: PopularCarListProps) => {
  const popularCarOpacity = React.useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;
  const translateY = React.useRef<Animated.Value>(
    new Animated.Value(50)
  ).current;
  const favIconScale = React.useRef<Animated.Value>(new Animated.Value(0.1));
  const PressableView = Animated.createAnimatedComponent(Pressable);
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: props.index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(popularCarOpacity, {
        toValue: 1,
        duration: 500,
        delay: props.index * 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(favIconScale.current, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [props.index]);

  return (
    <PressableView
      style={{
        ...popularCarStyles.popularCars,
        opacity: popularCarOpacity,
        translateY,
      }}
      onPress={() => props.onPress()}
    >
      <Image
        source={require("../../assets/images/mainCarImage.jpg")}
        style={{
          width: "100%",
          borderRadius: 10,
          padding: 10,
          resizeMode: "contain",
          height: "40%",
        }}
      />
      <Text
        style={{
          margin: 5,
          fontSize: 18,
          fontFamily: appFonts.WorkSans_600SemiBold,
          color: layoutParams.colors.primaryColor,
        }}
        adjustsFontSizeToFit
      >
        {props.objectItem?.make} {""}
        {props.objectItem?.model}, {props.objectItem?.yom}
      </Text>
      {props.renderCarSpecs}
      <Text
        style={{
          textAlign: "left",
          margin: 5,
          color: layoutParams.colors.primaryColor,
          fontFamily: "WorkSans_700Bold",
          fontSize: 16,
        }}
        adjustsFontSizeToFit
      >
        Price ksh. {props.objectItem?.price}
      </Text>
    </PressableView>
  );
};
export default memo(PopularCarsList);

const popularCarStyles = StyleSheet.create({
  popularCars: {
    margin: 3,
    borderRadius: 10,
    marginBottom: 20,
    minWidth: layoutParams.WINDOW.width * 0.5,
  },
  favoriteIcon: {
    left: 10,
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "rgb(0, 182, 240)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 18,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
});
