import React from "react";
import {Image, Pressable, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Text, TextInput, View} from "../../components/Themed";
import {FontAwesome} from "@expo/vector-icons";
import CircularImage from "../../components/CircularImage";
import FlatListView from "../../components/FlatListView";

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
}, , {
    id: "58694a0f-3da1-471f-bd96-145571e29d78", title: "Eighth Item",
}, , {
    id: "58694a0f-3da1-471f-bd96-145571e29d79", title: "Eighth Item",
}, , {
    id: "58694a0f-3da1-471f-bd96-145571e29d80", title: "Eighth Item",
}, , {
    id: "58694a0f-3da1-471f-bd96-145571e29d81", title: "Eighth Item",
}];
export default function Home() {
    const [state, setState] = React.useState({
        username: "", searchedCar: "", brandSelected: 0, selectedId: 0, loading: false, populaCarData: []
    });
    const navigation = useNavigation<CombinedNavigationProps>();

    // React.useEffect(() => loadPopularCars(), [state.populaCarData]);

    function loadPopularCars() {
        setState({
            ...state, loading: true
        });
        //Service to get the data from the server to render
        fetch('https://aboutreact.herokuapp.com/getpost.php?offset=' + 1)
            //Sending the currect offset with get request
            .then((response) => response.json())
            .then((responseJson) => {
                setState({
                    ...state, populaCarData: DATA as any
                });
                setState({
                    ...state, loading: false
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    // const addIdToData = (data: any) => {
    //     let dataWithId = [];
    //     for (let i = 0; i < data.length; i++) {
    //         dataWithId.push(i, data[i]);
    //     }
    //     return dataWithId;
    // }

    function searchInput() {
        return (<View style={{
            alignItems: "center"
        }}>
            <TextInput placeholder="Search for a car"
                       autoCapitalize="none"
                       blurOnSubmit={true}
                       keyboardType="default"
                       style={{...homeStyles.textInput}}
                       inlineImageLeft="magnifying-glass"
                       underlineColorAndroid="transparent"
                       onChangeText={(text) => setState({...state, searchedCar: text})}
                       value={state.searchedCar}/>
        </View>);
    }

    function onPressimage() {
        console.log("Pressed")
        navigation.navigate("Profile")

    }

    function carBrandFlatList() {
        return (<ScrollView style={{
            flexDirection: "row",
        }} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
            justifyContent: 'space-between'
        }}>{DATA.map((item, index) => <Pressable style={{
            elevation: state.brandSelected == index ? 1 : 0,
            alignItems: 'center',
            justifyContent: "center",
            padding: state.brandSelected == index ? 12 : 8,
            backgroundColor: state.brandSelected == index ? layout.colors.deepBlue : layout.colors.white,
            margin: 3,
            borderRadius: 10
        }} onPress={() => {
            setState({
                ...state, brandSelected: index
            })
        }} key={index}>
            <Text style={{
                fontSize: 15,
                fontWeight: "600",
                fontFamily: "Roboto_500Medium",
                color: state.brandSelected === index ? layoutParams.colors.white : layout.colors.black
            }}>{item?.title}</Text>
        </Pressable>)}</ScrollView>);
    }

    function renderCarSpecs(itemKey: string, itemValue: any) {
        return (<View style={{
            flexDirection: "row", justifyContent: "space-between",
        }}>
            <Text style={homeStyles.itemKeytext}>{itemKey}</Text>
            <Text style={homeStyles.itemValueText}>{itemValue}</Text>
        </View>);
    }

    function popularCars() {
        function renderItem(item: any, index: number) {
            const backgroundColor = index === state.selectedId ? layoutParams.colors.selectedColor : layoutParams.colors.white;
            return (<TouchableOpacity style={{
                ...homeStyles.flatview, backgroundColor: backgroundColor, elevation: index == state.selectedId ? 2 : 0,
            }}
                                      onPress={() => {
                                          setState({
                                              ...state, selectedId: index
                                          });
                                      }}>
                <Image source={require("../../../assets/images/mainCarImage.jpg")} style={{
                    width: "100%", height: 100, borderRadius: 10, resizeMode: "contain",
                }}/>
                <View style={{
                    margin: 5
                }}><Text style={{
                    fontSize: 17, fontFamily: "Poppins_700Bold", textAlign: 'center'
                }}>{item?.title}</Text>
                    {renderCarSpecs("Mileage", item!.title)}
                    {renderCarSpecs("Mileage", item.title)}
                    {renderCarSpecs("Mileage", item!.title)}
                    {renderCarSpecs("Mileage", item!.title)}
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: "Poppins_700Bold",
                        fontSize: 14,
                        margin: 10,
                        color: layoutParams.colors.deepBlue
                    }}>Show
                        more details</Text>
                </View>
            </TouchableOpacity>);
        }

        const renderPopularCarsFooter = () => {
            return (//Footer View with Load More button
                <View style={homeStyles.footer}>
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: 'center',
                            backgroundColor: layoutParams.colors.deepBlue,
                            elevation: 2,
                            padding: 8,
                            borderRadius: 10
                        }}
                        onPress={loadPopularCars}
                    >
                        <Text style={{fontSize: 20, fontWeight: "bold", color: layout.colors.white}}>Load More</Text>
                    </TouchableOpacity>
                </View>);
        };

        return <FlatListView showsHorizontallIndicator={false} data={DATA}
                             renderItem={({item, index}) => renderItem(item, index)}
                             ListFooterComponentStyle={{marginBottom: 0}}
                             horizontal={false}
                             showsVerticalScrollIndicator={false}
                             ListFooterComponent={renderPopularCarsFooter()} keyExtractor={(item, index) => item!.title + index}
                             key={'_'} extraData={state.selectedId} contentContainerStyle={{margin: 5}}
                             numColumns={2} pagingEnabled={true}/>;
    }

    return (<SafeAreaProvider style={{
        ...homeStyles.container
    }}>
        <View style={homeStyles.container}>
            {/*top view with avatar*/}
            <View style={{
                flexDirection: "row", justifyContent: "space-between", margin: 5
            }}>
                <Text style={{
                    fontSize: 25, fontFamily: "Poppins_500Medium"
                }}>Let's find the Ideal {'\n'}Car for you</Text>
                <View style={{
                    flexDirection: "row", justifyContent: "space-between", alignItems: 'center'
                }}>
                    <FontAwesome name="bell" size={30} color={layoutParams.colors.deepBlue}
                                 style={{marginRight: 20}}/>
                    {/*<Avatar.Image size={50} source={require('../../../assets/images/human-male.jpg')}*/}
                    {/*              onTouchStart={() => Alert.alert("Tap", "tapped")} style={{*/}
                    {/*    justifyContent: "center", alignItems: 'center'*/}
                    {/*}}/>*/}
                    {CircularImage({
                        source: require('../../../assets/images/human-male.jpg'),
                        style: {...homeStyles.circularImage},
                        onPress: () => onPressimage
                    })}
                </View>
            </View>
            {searchInput()}
            <View style={{
                margin: 5
            }}>
                <Text style={{
                    fontSize: 20, fontWeight: "normal", fontFamily: "Poppins_400Regular", margin: 8
                }}>Choose a brand</Text>
                {/*brandsFlatList*/}
                {carBrandFlatList()}
                <View style={{
                    justifyContent: "space-between", flexDirection: "row", alignItems: 'center', margin: 5
                }}>
                    <Text style={{
                        fontSize: 20, fontWeight: "normal", fontFamily: "Poppins_400Regular"
                    }}>Popular Cars</Text>
                    <TouchableOpacity style={{
                        padding: 10, backgroundColor: layoutParams.colors.deepBlue, borderRadius: 50
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            fontFamily: "Poppins_400Regular",
                            color: layout.colors.white
                        }}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 10
                }}/>
            </View>
            {/*All Car Brands*/}
            {popularCars()}
        </View>
    </SafeAreaProvider>);

}
const homeStyles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: layoutParams.colors.backgroundColor,
    }, textInput: {
        width: layout.WINDOW.width * .95,
        height: layout.WINDOW.height * .05,
        borderBottomColor: '#B3CCD3',//if we want only bottom line
        backgroundColor: layout.colors.white,
        fontSize: 20,
        borderRadius: 10,
        padding: 10,
        elevation: layout.elevation.elevation
    }, circularImage: {
        width: 50, height: 50, borderRadius: 50 / 2
    }, flatview: {
        flex: 1, margin: 3, borderRadius: 10,
    }, itemKeytext: {
        fontSize: 15, fontWeight: "bold", fontFamily: "Roboto_400Regular", color: layoutParams.colors.grey
    }, itemValueText: {
        fontSize: 15, fontWeight: "bold", fontFamily: "Roboto_400Regular"
    }, footer: {
        padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
    },
})
