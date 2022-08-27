import React from "react";
import {Image, Pressable, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Text, TextInput, View} from "../../components/Themed";
import {FontAwesome} from "@expo/vector-icons";
import CircularImage from "../../components/CircularImage";
import FlatListView from "../../components/FlatListView";


export default function Home() {
    const DATA: any[] = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba", make: "Honda Fit", mileage: "20000", yom: "1999", price: "900k"
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63", make: "Audi A3", mileage: "21000", yom: "2000", price: "951k"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72", make: "Suzuki Swift", mileage: "22000", yom: "2001", price: "550k"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d73", make: "BMW I320", mileage: "23000", yom: "2002", price: "2.1M"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d74", make: "Toyota Mark X", mileage: "24000", yom: "2003", price: "2,3M"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d75", make: "Lexus C5", mileage: "25000", yom: "2004", price: "2.8M"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d76", make: "Mazda C6", mileage: "26000", yom: "2005", price: "760k"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d77", make: "Mercedes E5", mileage: "27000", yom: "2006", price: "2.7M"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d78", make: "RangeRover L2", mileage: "28000", yom: "2007", price: "4.5M"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d79", make: "Nissan Murano", mileage: "20000", yom: "2010", price: "940k"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d80", make: "Volvo V1", mileage: "29000", yom: "2008", price: "1.4M"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d81",
        make: "Subaru Impreza",
        mileage: "30000",
        yom: "2009",
        price: "1.41M"
    }];
    const carBrands: any [] = ["audi", "bmw", "honda", "lexus", "mazda", "mercedes", "nissan", "rangerover", "subaru", "suzuki", "toyota", "volvo"];
    const [state, setState] = React.useState({
        username: "",
        searchedCar: "",
        brandSelected: 0,
        selectedId: 0,
        loading: false,
        populaCarData: [],
        selectedCar: ""
    });
    const navigation = useNavigation<CombinedNavigationProps>();
    const seletedCarJson = React.useMemo(() => DATA.find(selectedCar => selectedCar.yom === state.selectedCar), [DATA, state.selectedCar]);
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
        return (<FlatListView showsHorizontalScrollIndicator={false} data={carBrands} horizontal
                              renderItem={({item, index}: any) => <Pressable style={{
                                  elevation: state.brandSelected == index ? 1 : 0,
                                  alignItems: 'center',
                                  justifyContent: "center",
                                  minWidth: 70,
                                  padding: state.brandSelected == index ? 12 : 6,
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
                                  }}
                                        adjustsFontSizeToFit>{item.charAt(0).toString().toUpperCase() + item.substring(1, item.length)}</Text>
                              </Pressable>} ListFooterComponentStyle={null}
                              ListFooterComponent={() => <View style={null}/>}
                              keyExtractor={(item: any, index) => item + index}
                              key={'_'}
                              extraData={state.brandSelected} contentContainerStyle={null} numColumns={1}/>);
    }

    function renderCarSpecs(yom: number, mileage: number, index: number) {
        return (<View style={{
            marginLeft: 10
        }} key={index}>
            <View style={{
                flexDirection: "row", alignItems: 'center'
            }}>
                <Text style={{
                    fontWeight: "bold", textAlign: 'center', fontSize: 14
                }}>Y.O.M:</Text>
                <Text style={{
                    fontWeight: "bold",
                    textAlign: 'center',
                    margin: 3,
                    color: layoutParams.colors.lighGrey,
                    fontSize: 15
                }} adjustsFontSizeToFit>{yom}</Text>
            </View>
            <View style={{
                flexDirection: "row", alignItems: 'center'
            }}>
                <Text style={{
                    fontWeight: "bold", textAlign: 'center', margin: 3, fontSize: 15
                }}>Mileage:</Text>
                <Text style={{
                    textAlign: 'center', margin: 3, color: layoutParams.colors.lighGrey, fontWeight: "bold"
                }} adjustsFontSizeToFit>{mileage} kms</Text>
            </View>
        </View>);
    }

    function popularCars() {
        function renderItem(item: any, index: number) {
            const backgroundColor = index === state.selectedId ? layoutParams.colors.white : layoutParams.colors.grey;
            return (<TouchableOpacity style={{
                ...homeStyles.flatview, backgroundColor: backgroundColor, ...layoutParams.elevation
            }}
                                      onPress={() => {
                                          setState({
                                              ...state, selectedId: index, selectedCar: item.yom
                                          });
                                          navigation.navigate("CarDetails", {cardetails: seletedCarJson});
                                      }}>
                <Image source={require("../../../assets/images/mainCarImage.jpg")} style={{
                    flex: 1, width: layoutParams.WINDOW.width * .5, borderRadius: 10, resizeMode: "contain",
                }}/>
                <View style={{
                    marginLeft: 10, marginRight: 10, flexDirection: "row", justifyContent: "space-between"
                }}><Text style={{
                    textAlign: 'center', fontWeight: "bold",
                    fontSize: 25,
                    fontFamily: "Poppins_600SemiBold"
                }} adjustsFontSizeToFit>{item?.make}</Text>
                    <Text style={{
                        color: layoutParams.colors.lighGrey,
                        fontWeight: "bold", fontFamily: "Poppins_500Medium", textAlign: 'center', fontSize: 20
                    }} adjustsFontSizeToFit>{item?.price}</Text>
                </View>
                {renderCarSpecs(item.yom, item.mileage, index)}
                {/*Horizontal line*/}
                <View style={{
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <View style={{
                        margin: 5, borderBottomWidth: StyleSheet.hairlineWidth, width: "85%"
                    }}/>
                </View>
                <View>
                    <Text style={{
                        textAlign: 'center', fontFamily: "Poppins_700Bold", margin: 10
                    }} adjustsFontSizeToFit>Show more details</Text>
                </View>
            </TouchableOpacity>);
        }

        // const renderPopularCarsFooter = () => {
        //     return (<View style={homeStyles.footer}>
        //         <TouchableOpacity
        //             style={{
        //                 alignItems: "center",
        //                 justifyContent: 'center',
        //                 backgroundColor: layoutParams.colors.deepBlue,
        //                 elevation: 2,
        //                 padding: 8,
        //                 borderRadius: 10
        //             }}
        //             onPress={loadPopularCars}
        //         >
        //             <Text style={{fontSize: 20, fontWeight: "bold", color: layout.colors.white}}>Load More</Text>
        //         </TouchableOpacity>
        //     </View>);
        // };
        return <View style={{
            flex: 2
        }}><FlatListView showsHorizontalScrollIndicator={false} data={DATA}
                         renderItem={({item, index}) => renderItem(item, index)}
                         ListFooterComponentStyle={null}
                         horizontal
                         showsVerticalScrollIndicator={false}
                         ListFooterComponent={null}
                         keyExtractor={(item: any, index) => item.make + index}
                         key={'_'} extraData={state.selectedId} contentContainerStyle={{margin: 5}}/>
        </View>;
    }

    function renderRecentlyViewed() {
        return (
            <View style={{...homeStyles.homeFooter}}>
                <View style={{
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        ...homeStyles.footerText,
                        fontWeight: "bold"
                    }}>
                        Recently Added
                    </Text>
                    <Text style={{
                        ...homeStyles.footerText,
                        color: layoutParams.colors.deepBlue,
                        textDecorationLine: "underline"
                    }}>
                        View All
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    margin: 5,
                    borderRadius: 10,
                    flexDirection: "row",
                    backgroundColor: layoutParams.colors.white,
                    ...layoutParams.elevation
                }}>
                    {/*Image at the start*/}
                    <Image source={require("../../../assets/images/mainCarImage.jpg")} style={{
                        justifyContent: "flex-start",
                        height: "100%",
                        width: layoutParams.WINDOW.width * .4,
                        borderRadius: 10,
                        resizeMode: "contain",
                    }}/>
                    <View style={{
                        flex: 1,
                        marginLeft: 5
                    }}><Text style={{...homeStyles.footerText, fontSize: 30}}>Audi</Text>
                        <Text style={{...homeStyles.carDetailsText, fontSize: 15}}> Price : 951k</Text>
                        <Text style={{...homeStyles.carDetailsText, fontSize: 15}}> Year Of Manufacturing :2021</Text>
                        <Text style={{...homeStyles.carDetailsText, fontSize: 15}}> Mileage : 5000kms</Text>
                    </View>
                </View>
            </View>)
    }

    return (<SafeAreaView style={{
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

                        <Text style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: layoutParams.colors.deepBlue,
                            fontFamily: "Poppins_400Regular",
                            textDecorationLine: "underline"
                        }}>View All</Text>
                </View>
                <View style={{
                    marginTop: 10
                }}/>
            </View>
            {/*All Car Brands*/}
            {popularCars()}
            {renderRecentlyViewed()}
        </View>
    </SafeAreaView>);

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
        margin: 3, borderRadius: 10, marginBottom: 10,
    }, itemKeytext: {
        fontSize: 15, fontWeight: "bold", fontFamily: "Roboto_400Regular", color: layoutParams.colors.disabledTextColor
    }, itemValueText: {
        fontSize: 15, fontWeight: "bold", fontFamily: "Roboto_400Regular"
    }, footer: {
        padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
    },
    homeFooter: {
        flex: 1, marginRight: 5, marginLeft: 5,
        ...layoutParams.elevation, backgroundColor: layoutParams.colors.backgroundColor,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    footerText: {
        fontFamily: "Poppins_500Medium", textAlign: 'center'
    },
    carDetailsText: {
        fontSize: 15,
        // fontWeight:"bold",
        fontFamily: "Roboto_500Medium"
    }
})
