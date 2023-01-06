import { Animated, Image, Pressable, StyleSheet } from "react-native";
import layoutParams from "../utils/LayoutParams";
import { Text, View } from "../components/Widgets";
import React, { memo } from "react";
import { appFonts } from "../utils/AllConstant";

export interface SingleCarProps {
  carObject: any;
  translatedX: Animated.Value;
  scale: Animated.Value;
  onPress: () => void;
}

const RenderSingleItem = ({ ...props }: SingleCarProps) => {
  const [state, setState] = React.useState({
    carItem: {} as any,
  });
  const getCarItem = React.useCallback(() => {
    if (props.carObject.length === 1) {
      setState({
        ...state,
        carItem: JSON.parse(JSON.stringify(props.carObject))[0],
      });
    }
  }, [props.carObject]);
  React.useEffect(() => {
    getCarItem();
  }, []);
  // console.log(state.carItem)

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const renderCarItem = (item: string, key: string) => (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: "WorkSans_600SemiBold",
          color: layoutParams.colors.lighGrey,
        }}
        adjustsFontSizeToFit
      >
        {item}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: appFonts.WorkSans_500Medium,
        }}
      >
        {key}
      </Text>
    </View>
  );
  return (
    <>
      {props.carObject.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: appFonts.WorkSans_500Medium,
            }}
          >
            No matching car was found
          </Text>
        </View>
      ) : (
        <AnimatedPressable
          style={{
            ...singleItemStyles.container,
            padding: 5,
            translateX: props.translatedX,
            transform: [{ scale: props.scale }],
          }}
          onPress={() => props.onPress()}
        >
          {/*Image at the start*/}
          <Image
            source={require("../../assets/images/mainCarImage.jpg")}
            style={{
              justifyContent: "flex-start",
              height: "100%",
              width: layoutParams.WINDOW.width * 0.4,
              borderRadius: 10,
              resizeMode: "contain",
            }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 5,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginTop: 5,
                fontFamily: "WorkSans_600SemiBold",
              }}
            >
              {state.carItem.make}
            </Text>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {renderCarItem("Model : ", state.carItem.model)}
              {renderCarItem("Year Of Manufacturing : ", state.carItem.yom)}
              {renderCarItem("Mileage : ", state.carItem.mileage + " kms")}
              {renderCarItem("Price : ", "ksh. " + state.carItem.price)}
            </View>
          </View>
        </AnimatedPressable>
      )}
    </>
  );
};
export default memo(RenderSingleItem);
const singleItemStyles = StyleSheet.create({
  container: {
    flex: 0.6,
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: layoutParams.colors.searchInput,
    ...layoutParams.elevation,
  },
});
