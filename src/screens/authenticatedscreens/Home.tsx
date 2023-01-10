import React from "react";
import {
  Alert,
  Animated,
  Easing,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import { useNavigation } from "@react-navigation/native";
import { CombinedNavigationProps } from "../../navigation/ScreenTypes";
import {
  KeyboardAvoidingComponent,
  Text,
  View,
} from "../../components/Widgets";
import { FontAwesome } from "@expo/vector-icons";
import FlatListView from "../../components/FlatListView";
import CircularImage from "../../components/CircularImage";
import { carBrands, PopularCarData } from "../../utils/Data";
import { sharedStyles } from "../../utils/SharedStyles";
import PopularCarsList from "../../flatlist/PopularCarsList";
import { CarItemProps } from "../../utils/AppInterfaces";
import RenderCarsBrandsList from "../../flatlist/RenderCarsBrandsList";
import utils from "../../utils/Utils";
import RenderSingleItem from "../../flatlist/RenderSingleItem";
import { appFonts } from "../../utils/AllConstant";
import TextInputComponent from "../../components/TextInputComponent";

export default function Home() {
  const [state, setState] = React.useState({
    username: "",
    searchedCar: "",
    brandSelected: 0,
    selectedId: 0,
    loading: false,
    populaCarData: PopularCarData,
    recentViews: [] as any,
    loggedInUser: "",
  });
  const navigation = useNavigation<CombinedNavigationProps>();
  const translateX = React.useRef<Animated.Value>(
    new Animated.Value(50)
  ).current;
  const recentViewOpacity = React.useRef<Animated.Value>(
    new Animated.Value(0.1)
  ).current;
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const getSelectedCar = React.useCallback((carYom: string) => {
    return state.populaCarData.find((mappedCar) => mappedCar.yom === carYom);
  }, []);
  const getSearchedCar = state.populaCarData.filter((car) => {
    return car.make?.toLowerCase().includes(state.searchedCar.toLowerCase());
  });
  const loadLoggedInUser = () => {
    utils.getValue("username").then((user) => {
      if (typeof user === "string") {
        setState({
          ...state,
          loggedInUser: JSON.parse(user),
        });
      }
    });
  };

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(recentViewOpacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
    loadLoggedInUser();
  }, []);
  const addCarToViewedState = React.useCallback(
    (selectedIndex: number) => {
      setState((prevState) => ({
        ...prevState,
        recentViews: [
          ...prevState.recentViews,
          state.populaCarData[selectedIndex],
        ],
      }));
    },
    [state.populaCarData, state.selectedId]
  );

  function loadPopularCars() {
    setState({
      ...state,
      loading: true,
    });
    //Service to get the data from the server to render
    fetch("https://aboutreact.herokuapp.com/getpost.php?offset=" + 1)
      //Sending the currect offset with get request
      .then((response) => response.json())
      .then((responseJson) => {
        setState((prevState) => ({
          ...prevState,
          populaCarData: [...prevState.populaCarData, responseJson],
        }));
        setState({
          ...state,
        });
        setState({
          ...state,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function searchInput() {
    return (
      <TextInputComponent
        placeholder="Search for a car"
        onChange={(carMake) =>
          setState({
            ...state,
            searchedCar: carMake,
          })
        }
        secureEntry={false}
        containerStyles={sharedStyles.searchInputMainContainer}
        inputView={[sharedStyles.searchInputContainer, { padding: 8 }]}
        searchInput={sharedStyles.searchInput}
        autoCapitalize="none"
        keyboardType="default"
        value={state.searchedCar}
        iconSize={25}
        underlineColorAndroid="transparent"
        blurOnSubmit={true}
        icon="search"
        iconType="evilicon"
      />
    );
  }

  const onPressSingleFlatList = (objectItem: CarItemProps) => {
    navigation.navigate("CarDetails", {
      cardetails: getSelectedCar(objectItem.yom),
    });
  };

  const onPressPopularCar = React.useCallback(
    (index: number, objectItem: CarItemProps) => {
      setState({
        ...state,
        selectedId: index,
      });
      addCarToViewedState(index);
      onPressSingleFlatList(objectItem);
    },
    []
  );

  function onPressimage() {
    navigation.navigate("Profile");
  }

  function carBrandFlatList() {
    const onBrandPress = React.useCallback(
      (index: number) =>
        setState({
          ...state,
          brandSelected: index,
        }),
      []
    );

    return (
      <FlatListView
        showsHorizontalScrollIndicator={false}
        data={carBrands}
        horizontal
        renderItem={({ item, index }: any) => (
          <RenderCarsBrandsList
            index={index}
            item={item}
            onPress={() => onBrandPress(index)}
            populaCarData={state.populaCarData}
            brandSelected={state.brandSelected}
          />
        )}
        ListFooterComponentStyle={null}
        ListFooterComponent={() => <View style={null} />}
        keyExtractor={(item: any, index) => item + index}
        key={"_"}
        extraData={state.brandSelected}
        contentContainerStyle={null}
        numColumns={1}
      />
    );
  }

  function renderCarSpecs(
    yom: string,
    mileage: string,
    model: string,
    index: number,
    make?: string
  ) {
    return (
      <View
        style={{
          marginLeft: 5,
        }}
        key={index}
      >
        <Text
          style={{
            textDecorationLine: "underline",
            fontFamily: appFonts.WorkSans_600SemiBold,
            color: layoutParams.colors.primaryColor,
          }}
        >
          Car Description
        </Text>
        <Text style={{ fontFamily: appFonts.WorkSans_500Medium }}>
          Red {make} {model}, {"\n"}Mileage {mileage}, {"\n"}year of
          manuafacturing {yom}
        </Text>
      </View>
    );
  }

  const renderCarItem = (item: string, key: string) => (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontFamily: appFonts.WorkSans_600SemiBold,
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

  function renderPopularCars() {
    return (
      <View
        style={{
          flex: 1.7,
        }}
      >
        {getSearchedCar.length > 1 ? (
          <FlatListView
            showsHorizontalScrollIndicator={false}
            data={getSearchedCar}
            renderItem={({ item, index }: any) => (
              <PopularCarsList
                index={index}
                objectItem={item}
                renderCarSpecs={renderCarSpecs(
                  item?.yom,
                  item?.mileage,
                  item?.model,
                  index,
                  item?.make
                )}
                selectedId={state.selectedId}
                onPress={() => onPressPopularCar(index, item)}
              />
            )}
            ListFooterComponentStyle={null}
            horizontal
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <View style={{ marginLeft: 10 }} />}
            keyExtractor={(item: any, index) => item.make + index}
            key={"_"}
            extraData={state.selectedId}
            contentContainerStyle={{ margin: 5 }}
          />
        ) : (
          <RenderSingleItem
            carObject={getSearchedCar}
            scale={recentViewOpacity}
            translatedX={translateX}
            onPress={() =>
              onPressSingleFlatList(
                JSON.parse(JSON.stringify(getSearchedCar))[0]
              )
            }
          />
        )}
      </View>
    );
  }

  const renderRecentlyViewed = () => {
    let viewedCars: any = JSON.parse(JSON.stringify(state.recentViews));
    return (
      <>
        {viewedCars.length > 0 ? (
          <AnimatedPressable
            style={{
              ...homeStyles.homeFooter,
              padding: 5,
              translateX,
              transform: [{ scale: recentViewOpacity }],
            }}
            onPress={() =>
              onPressSingleFlatList(
                JSON.parse(JSON.stringify(getSearchedCar))[0]
              )
            }
          >
            {/*Image at the start*/}
            <Image
              source={require("../../../assets/images/carImage.jpg")}
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
                  fontFamily: appFonts.WorkSans_600SemiBold,
                  color: layout.colors.primaryColor,
                }}
              >
                {viewedCars[viewedCars.length - 1].make} {""}
                {viewedCars[viewedCars.length - 1].model},
                {viewedCars[viewedCars.length - 1].yom}
              </Text>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontFamily: appFonts.WorkSans_600SemiBold,
                  color: layoutParams.colors.primaryColor,
                }}
              >
                Car Description
              </Text>
              <Text style={{ fontFamily: appFonts.WorkSans_500Medium }}>
                Red {viewedCars[viewedCars.length - 1].make}
                {viewedCars[viewedCars.length - 1].model}, {"\n"}Mileage
                {viewedCars[viewedCars.length - 1].mileage}, {"\n"}year of
                manuafacturing {viewedCars[viewedCars.length - 1].yom}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 5,
                  color: layoutParams.colors.primaryColor,
                  fontFamily: "WorkSans_700Bold",
                  fontSize: 16,
                }}
                adjustsFontSizeToFit
              >
                Price Ksh. {viewedCars[viewedCars.length - 1].price}
              </Text>
            </View>
          </AnimatedPressable>
        ) : (
          <AnimatedPressable
            style={{
              ...homeStyles.homeFooter,
              justifyContent: "center",
              alignItems: "center",
              translateX,
              transform: [{ scale: recentViewOpacity }],
            }}
            onPress={() =>
              Alert.alert(
                "Message",
                "Please view vehicles to add them to the recently viewed list"
              )
            }
          >
            <Text
              style={{
                fontFamily: appFonts.WorkSans_600SemiBold,
              }}
            >
              No Recently view cars
            </Text>
          </AnimatedPressable>
        )}
      </>
    );
  };

  const topSection = () => (
    <View
      style={{
        justifyContent: "space-between",
        margin: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {CircularImage({
            source: { uri: "https://randomuser.me/api/portraits/men/36.jpg" },
            size: layoutParams.WINDOW.height * 0.05,
            rounded: true,
            onPress: onPressimage,
          })}
          {state.loggedInUser && (
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                fontFamily: "Poppins_500Medium",
              }}
            >
              {state.loggedInUser}
            </Text>
          )}
        </View>
        <FontAwesome
          name="bell-o"
          size={24}
          style={{ marginRight: 10 }}
          color={layoutParams.colors.black}
        />
      </View>
      <Text style={homeStyles.headerTextBold}>Let's find the</Text>
      <Text style={homeStyles.headerTextBold}>Ideal car for you</Text>
    </View>
  );

  return (
    <KeyboardAvoidingComponent>
      <SafeAreaView
        style={{
          ...sharedStyles.container,
        }}
      >
        <View style={sharedStyles.container}>
          {/*top view with avatar*/}
          {topSection()}
          {searchInput()}
          <View
            style={{
              margin: 5,
            }}
          >
            {/*<Text style={{*/}
            {/*    fontSize: 22, fontWeight: "normal", fontFamily: appFonts.WorkSans_600SemiBold, margin: 8*/}
            {/*}}>View by  brand</Text>*/}
            {/*brandsFlatList*/}
            {carBrandFlatList()}
            <View
              style={{
                margin: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: appFonts.WorkSans_600SemiBold,
                }}
              >
                Popular Cars
              </Text>
            </View>
          </View>
          {/*All Car Brands*/}
          {renderPopularCars()}
          <View
            style={{
              marginRight: 10,
              marginLeft: 10,
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: appFonts.WorkSans_600SemiBold,
              }}
            >
              Recently Viewed
            </Text>
          </View>
          {renderRecentlyViewed()}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingComponent>
  );
}
const homeStyles = StyleSheet.create({
  textInput: {
    width: layout.WINDOW.width * 0.95,
    borderColor: layoutParams.colors.backgroundColor,
    height: layout.WINDOW.height * 0.05,
    borderBottomColor: "#B3CCD3", //if we want only bottom line
    backgroundColor: layout.colors.white,
    fontSize: 20,
    borderRadius: 10,
    padding: 10,
    elevation: layout.elevation.elevation,
  },
  circularImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  footerText: {
    fontFamily: appFonts.WorkSans_600SemiBold,
    textAlign: "center",
  },
  carDetailsText: {
    fontSize: 15,
    // fontWeight:"bold",
    fontFamily: "Roboto_500Medium",
  },
  headerTextNormal: {
    color: "grey",
    fontFamily: appFonts.WorkSans_600SemiBold,
    letterSpacing: 0.2,
    fontSize: 15,
  },
  headerTextBold: {
    fontSize: 18,
    fontFamily: appFonts.Poppins_600SemiBold,
    letterSpacing: 0.25,
  },
  homeFooter: {
    flex: 0.7,
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: layoutParams.colors.visibleColorOpacity1,
    ...layoutParams.elevation,
  },
});
