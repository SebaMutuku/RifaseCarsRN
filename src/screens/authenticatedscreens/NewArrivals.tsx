import { showToast, Text, View } from "../../components/Widgets";
import { Animated, SafeAreaView, StyleSheet } from "react-native";
import { sharedStyles } from "../../utils/SharedStyles";
import React from "react";
import { carData } from "../../utils/AppInterfaces";
import utils from "../../utils/Utils";
import { PopularCarData } from "../../utils/Data";
import FlatListView from "../../components/FlatListView";
import NewCarsList from "../../flatlist/NewCars";
import layoutParams from "../../utils/LayoutParams";
import { appFonts } from "../../utils/AllConstant";

export default function NewArrivals() {
  const [state, setState] = React.useState({
    viewedCars: PopularCarData,
  });
  React.useEffect(() => {
    fetchViewedCars();
  }, []);

  const fetchViewedCars = () => {
    fetch(utils.appUrl + "url", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((response) =>
        setState({
          ...state,
          viewedCars: response.data,
        })
      )
      .catch((error) => showToast(error.message));
  };

  const renderSingleCarItem = (carItem: carData[]) => {
    return (
      <FlatListView
        showsHorizontalScrollIndicator={false}
        data={carItem}
        renderItem={({ item, index }: any) => (
          <NewCarsList carData={item} index={index} />
        )}
        ListFooterComponentStyle={null}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{ marginLeft: 10 }} />}
        keyExtractor={(item: any, index) => item.make + index}
        key={"_"}
        contentContainerStyle={{ margin: 5 }}
      />
    );
  };
  return (
    <SafeAreaView
      style={{
        ...sharedStyles.container,
        backgroundColor:layoutParams.colors.backgroundColor
      }}
    >
      {state.viewedCars.length > 0 ? (
        renderSingleCarItem(state.viewedCars)
      ) : (
        <Animated.View
          style={{
            padding: 10,
            ...recentViewsStyles.noRecentViews,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: appFonts.WorkSans_500Medium,
              fontSize: 18,
            }}
          >
            New batch coming soon
          </Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
const recentViewsStyles = StyleSheet.create({
  noRecentViews: {
    margin: 10,
    borderRadius: 10,
    minHeight: layoutParams.WINDOW.height * 0.15,
    flexDirection: "row",
    backgroundColor: layoutParams.colors.visibleColorOpacity1,
    ...layoutParams.elevation,
  },
});
