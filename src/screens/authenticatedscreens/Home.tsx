import React from "react";
import {Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Avatar} from "react-native-paper";
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";

const DATA = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba", title: "First Item",
}, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63", title: "Second Item",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72", title: "Third Item",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d73", title: "Fourth Item",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d74", title: "Fifth Item",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d75", title: "Six Item",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d76", title: "Seventh Item",
}, {
    id: "58694a0f-3da1-471f-bd96-145571e29d77", title: "Eighth Item",
},];
export default function Home() {
    const [state, setState] = React.useState({
        username: "", searchedCar: "", brandSelected: 0
    });
    const navigation = useNavigation<CombinedNavigationProps>();

    function searchInput() {
        return <TextInput placeholder="Search for a car"
                          autoCapitalize="none"
                          blurOnSubmit={true}
                          keyboardType="default"
                          style={{...homeStyles.textInput}}
                          inlineImageLeft="magnifying-glass"
                          underlineColorAndroid="transparent"
                          onChangeText={(text) => setState({...state, searchedCar: text})}
                          value={state.searchedCar}/>;
    }

    function carBrandFlatList() {
        return (<ScrollView style={{
            flexDirection: "row",
        }} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
            justifyContent: 'space-between'
        }}>{DATA.map((item, index) => <Pressable style={{
            elevation: state.brandSelected == index ? 1 : 0,
            alignItems: 'center',
            padding: 8,
            backgroundColor: state.brandSelected == index ? layout.colors.deepBlue : layout.colors.white,
            margin: 3,
            borderRadius: 10
        }} onPress={() => {
            setState({
                ...state, brandSelected: index
            })
        }}>
            <Text style={{
                fontSize: 15, fontWeight: "600", fontFamily: "Roboto_500Medium"
            }}>{item.title}</Text>
        </Pressable>)}</ScrollView>);
    }

    return (<SafeAreaProvider>
        <View style={homeStyles.container}>
            {/*top view with avatar*/}
            <View style={{
                flexDirection: "row", justifyContent: "space-between", margin: 5
            }}>
                <Text style={{
                    fontSize: 25, fontFamily: "Poppins_500Medium"
                }}>Let's find the Ideal {'\n'}Car for you</Text>
                <Avatar.Image size={70} source={require('../../../assets/images/human-male.jpg')}
                              onTouchStart={() => Alert.alert("Tap", "tapped")} style={{
                    justifyContent: "center", alignItems: 'center'
                }}/>
            </View>
            {searchInput()}
            <View style={{
                margin: 5
            }}>
                <Text style={{
                    fontSize: 20, fontWeight: "normal", fontFamily: "Poppins_400Regular"
                }}>Brands</Text>
                {/*brandsFlatList*/}
                {carBrandFlatList()}
            </View>
        </View>
    </SafeAreaProvider>);
}
const homeStyles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: layoutParams.colors.backgroundColor
    }, textInput: {
        width: layout.WINDOW.width * .95,
        height: layout.WINDOW.height * .05,
        borderBottomColor: '#B3CCD3',//if we want only bottom line
        backgroundColor: layout.colors.white,
        fontSize: 20,
        borderRadius: 10,
        margin: 5,
        padding: 10,
        elevation: layout.elevation.elevation
    },
})
