import { useRoute } from "@react-navigation/native";
import { Text, View } from "../../../components/Widgets";
import { HomeRouteProp } from "../../../navigation/ScreenTypes";
import {
  Animated,
  Easing,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
} from "react-native";
import layoutParams from "../../../utils/LayoutParams";
import layout from "../../../utils/LayoutParams";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { CarItemProps } from "../../../utils/AppInterfaces";
import { sharedStyles } from "../../../utils/SharedStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { reviewArray } from "../../../utils/Data";
import { appFonts } from "../../../utils/AllConstant";
import { AirbnbRating, Avatar, Rating } from "react-native-elements";

export default function CarDetails() {
  const viewOpacity = React.useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;
  const scrollOpacity = React.useRef<Animated.Value>(
    new Animated.Value(0)
  ).current;
  const buttonTranslateX = React.useRef<Animated.Value>(
    new Animated.Value(100)
  ).current;
  const callButtonTranslateX = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );
  const [state, setState] = React.useState({
    carData: {} as CarItemProps | undefined,
    appIsReady: false,
    buttonVisible: false,
  });
  const route: any = useRoute<HomeRouteProp>();
  React.useEffect(() => {
    setState({
      ...state,
      carData: route.params.cardetails,
    });
    if ((state.carData as any) != undefined) {
      setState({
        ...state,
        appIsReady: true,
      });
    }
    Animated.parallel([
      Animated.timing(viewOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      Animated.timing(scrollOpacity, {
        toValue: 1,
        duration: 600,
        delay: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(buttonTranslateX, {
        toValue: 1,
        duration: 1000,
        delay: 0,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(callButtonTranslateX.current, {
        toValue: 1,
        duration: 600,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [route.params]);
  const onLayoutRootView = React.useCallback(async () => {
    if (state.appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [state.appIsReady]);
  React.useMemo(
    () =>
      Object.entries(route.params.cardetails).filter(() => {
        delete route.params.cardetails["id"];
        delete route.params.cardetails["imageUrl"];
        return route.params;
      }),
    [route.params.cardetails]
  );

  const setVisibile = React.useCallback(
    (visible: boolean) => {
      setState({
        ...state,
        buttonVisible: visible,
      });
    },
    [state.buttonVisible]
  );

  function carSliderImage() {
    return (
      <View
        style={{
          ...styles.carSliderView,
        }}
      >
        <Image
          source={require("../../../../assets/images/carImage.jpg")}
          resizeMethod="resize"
          style={{
            height: "85%",
            width: "95%",
            borderRadius: 10,
            marginTop: 20,
          }}
        />
      </View>
    );
  }

  const lowerSection = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      key={1}
      onScroll={() => setVisibile(false)}
      onScrollEndDrag={() => setVisibile(true)}
      onScrollToTop={() => setVisibile(true)}
      onMomentumScrollEnd={() => setVisibile(true)}
    >
      <View
        style={{
          margin: 20,
        }}
      >
        <Text
          style={{
            fontFamily: appFonts.WorkSans_600SemiBold,
            color: layoutParams.colors.primaryColor,
          }}
        >
          Vehicle Specifications
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: appFonts.WorkSans_600SemiBold,
            color: layoutParams.colors.primaryColor,
          }}
        >
          Ksh. {route.params.cardetails.price}
        </Text>
      </View>

      <Animated.View
        style={{
          flexDirection: "row",
          padding: 8,
          opacity: viewOpacity,
        }}
        renderToHardwareTextureAndroid // just to avoid UI glitch when animating view with elevation
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.entries(route.params.cardetails).map((entry: any, index) =>
            infoBox(entry[1], entry[0], index)
          )}
        </ScrollView>
      </Animated.View>
      <Animated.View
        style={{
          marginLeft: 10,
          marginTop: 10,
          opacity: scrollOpacity,
        }}
      >
        {route.params.cardetails.make && (
          <Text
            style={{
              ...styles.carDescText,
            }}
          >
            The Diesel engine is 1968 cc while the Petrol engine is 1395 cc . It
            is available with Automatic transmission. Depending upon the variant
            and fuel type the A3 has a mileage of 19.2 to 20.38 kmpl & Ground
            clearance of A3 is 165mm. The A3 is a 5 seater 4 cylinder car. Fuel
            Type: Petrol Fuel Tank Capacity: 50.0 Body Type: Sedan Engine
            Displacement (cc): 1395
          </Text>
        )}
      </Animated.View>
      {reviews()}
    </ScrollView>
  );
  const reviews = () => (
    <Animated.View
      style={{
        ...styles.reviews,
        opacity: scrollOpacity,
      }}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.textStyle, styles.timeBoxTitle, { fontSize: 18 }]}>
          Reviews
        </Text>
      </Animated.View>
      <View
        style={{
          borderBottomColor: layoutParams.colors.grey,
          marginTop: 10,
          marginBottom: 10,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      {/*Review Row*/}
      {reviewArray.map((item, index: number) => (
        <View
          key={index}
          style={{
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 10,
            backgroundColor: layoutParams.colors.visibleColorOpacity1,
          }}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              margin: 8,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Avatar
                rounded
                size="medium"
                avatarStyle={{
                  backgroundColor: layoutParams.colors.disabledButtonColor,
                }}
                title="UW"
                titleStyle={{
                  color: layoutParams.colors.black,
                }}
                icon={{ name: "home", type: "font-awesome" }}
              />
              <View
                style={{
                  marginLeft: 5,
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Text
                  style={[
                    styles.textStyle,
                    styles.timeBoxTitle,
                    { fontFamily: appFonts.WorkSans_700Bold },
                  ]}
                >
                  {item.reviewer}
                </Text>
                <AirbnbRating
                  count={5}
                  defaultRating={item.rating}
                  size={15}
                  isDisabled={true}
                  reviewSize={18}
                  showRating={false}
                  onFinishRating={(ratingValue) => {
                    ratingValue;
                  }}
                  selectedColor={layoutParams.colors.primaryColor}
                  reviewColor={layoutParams.colors.primaryColor}
                />
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 14,
                    color: layoutParams.colors.lighGrey,
                    fontFamily: appFonts.WorkSans_600SemiBold,
                  },
                ]}
              >
                {item.date}
              </Text>
            </View>
          </Animated.View>
          <Text
            style={[
              styles.textStyle,
              styles.timeBoxTitle,
              { marginLeft: 8, marginRight: 8 },
            ]}
          >
            {item.reviewSummary}
          </Text>
          <Text
            style={{
              fontFamily: appFonts.WorkSans_400Regular,
              color: layoutParams.colors.black,
              margin: 8,
            }}
          >
            {item.comment}
          </Text>
        </View>
      ))}
    </Animated.View>
  );

  const infoBox = (text1: string, text2: string, key?: number) => (
    <View style={styles.carSpecsBox} key={key}>
      <Text style={[styles.textStyle, styles.timeBoxTitle]}>{text1}</Text>
      <Text style={[styles.textStyle, { fontSize: 14 }]}>{text2}</Text>
    </View>
  );
  const callButton = () => (
    <Animated.View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          bottom: 2,
          margin: 4,
          width: "96%",
          transform: [{ scale: callButtonTranslateX.current }],
        }}
      >
        <MaterialCommunityIcons.Button
          name="phone"
          size={30}
          style={{
            padding: 12,
            alignItems: "center",
            backgroundColor: layoutParams.colors.primaryColor,
          }}
          allowFontScaling={true}
        >
          call seller
        </MaterialCommunityIcons.Button>
      </Animated.View>
    </Animated.View>
  );

  return (
    <SafeAreaView
      style={{
        ...sharedStyles.container,
        backgroundColor: layoutParams.colors.backgroundColor,
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
          }}
        >
          {carSliderImage()}
        </View>
        <View
          style={{
            ...styles.secondView,
          }}
        >
          {lowerSection()}
        </View>
      </View>
      {state.buttonVisible ? callButton() : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  carSliderView: {
    flex: 1,
    backgroundColor: layoutParams.colors.white,
    ...layoutParams.elevation,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  callerButton: {
    elevation: layout.elevation.elevation,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: layoutParams.colors.black,
    width: layout.WINDOW.width * 0.95,
    borderRadius: 10,
    padding: 6,
    height: layout.WINDOW.height * 0.07,
  },
  secondView: {
    flex: 2.5,
    backgroundColor: layoutParams.colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    ...layoutParams.elevation,
  },
  carSpecsBox: {
    backgroundColor: layoutParams.colors.listColors,
    borderRadius: 16,
    alignItems: "center",
    margin: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    ...layoutParams.elevation,
  },
  timeBoxTitle: {
    fontSize: 14,
    fontFamily: appFonts.WorkSans_600SemiBold,
    color: layoutParams.colors.primaryColor,
  },
  textStyle: {
    fontFamily: appFonts.WorkSans_500Medium,
    color: layoutParams.colors.primaryColor,
    letterSpacing: 0.27,
  },
  carDescText: {
    fontFamily: "Poppins_500Medium",
  },
  reviews: {
    flex: 1,
    margin: 10,
  },
});
