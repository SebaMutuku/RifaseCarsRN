import { CarViewProps } from "../utils/AppInterfaces";
import {
  Animated,
  Easing,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import layoutParams from "../utils/LayoutParams";
import { Text, View } from "../components/Widgets";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CombinedNavigationProps } from "../navigation/ScreenTypes";
import { PopularCarData } from "../utils/Data";
import { appFonts } from "../utils/AllConstant";
import { AirbnbRating, Image } from "react-native-elements";

const NewCarsList = ({ ...props }: CarViewProps) => {
  const PressableView = Animated.createAnimatedComponent(Pressable);
  const opacity = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const translateY = React.useRef<Animated.Value>(
    new Animated.Value(50)
  ).current;
  const navigation = useNavigation<CombinedNavigationProps>();

  function getSelectedCar(carYom: string) {
    return PopularCarData.find((mappedCar) => mappedCar.yom === carYom);
  }

  const [state, setState] = React.useState({
    selectedId: 0,
  });

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: props.index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: props.index * 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  }, [props.index]);
  const carRowItems = (item: string, key: string) => (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontFamily: appFonts.WorkSans_500Medium,
          color: layoutParams.colors.lighGrey,
        }}
        adjustsFontSizeToFit
      >
        {item}
      </Text>
      <Text
        style={{
          fontFamily: appFonts.WorkSans_500Medium,
        }}
      >
        {key}
      </Text>
    </View>
  );
  return (
    <PressableView
      style={{
        ...viewedCarStyles.list,
        opacity,
        translateY,
      }}
      key={props.index}
      onPress={() => {
        setState({
          ...state,
          selectedId: props.index,
        });
        navigation.navigate("CarDetails", {
          cardetails: getSelectedCar(props.carData.yom),
        });
      }}
    >
      {/*Car Items at the start*/}
      <Image
        source={require("../../assets/images/carImage.jpg")}
        style={{
          justifyContent: "flex-start",
          minHeight: layoutParams.WINDOW.height * 0.15,
          width: layoutParams.WINDOW.width * 0.3,
          borderRadius: 10,
          resizeMode: "cover",
        }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <View
          style={{
            marginLeft: 5,
          }}
        >
          <Text
            style={{
              fontFamily: appFonts.WorkSans_600SemiBold,
              color: layoutParams.colors.primaryColor,
            }}
            adjustsFontSizeToFit
          >
            {props.carData?.make} {""}
            {props.carData?.model}, {props.carData?.yom}
          </Text>
          {carRowItems("Model : ", props.carData.model as string)}
          {carRowItems("Year Of Manufacturing : ", props.carData.yom)}
          {carRowItems("Mileage : ", props.carData.mileage + " kms")}
          <Text
            style={{
              textAlign: "left",
              color: layoutParams.colors.primaryColor,
              fontFamily: appFonts.WorkSans_400Regular,
              // fontSize: 16,
            }}
            adjustsFontSizeToFit
          >
            Price ksh. {props.carData?.price}
          </Text>
        </View>
        <AirbnbRating
          count={5}
          defaultRating={3}
          size={14}
          isDisabled={true}
          showRating={false}
          onFinishRating={(ratingValue) => {
            ratingValue;
          }}
          starContainerStyle={{
            alignSelf: "flex-start",
          }}
          selectedColor={layoutParams.colors.primaryColor}
          reviewColor={layoutParams.colors.primaryColor}
        />
      </View>
    </PressableView>
  );
};

export default React.memo(NewCarsList);

const viewedCarStyles = StyleSheet.create({
  list: {
    margin: 10,
    borderRadius: 10,
    minHeight: layoutParams.WINDOW.height * 0.15,
    flexDirection: "row",
    // backgroundColor: layoutParams.colors.visibleColorOpacity1,
  },
});
