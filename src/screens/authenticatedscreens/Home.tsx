import React from "react";
import {Image, Pressable, SafeAreaView, StyleSheet} from "react-native";
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Text, View} from "../../components/Components";
import {FontAwesome} from "@expo/vector-icons";
import FlatListView from "../../components/FlatListView";
import {SearchBar} from "@rneui/base";
import CircularImage from "../../components/CircularImage";
import {carBrands, PopularCarData} from "../../utils/Data";


export default function Home() {
    const [state, setState] = React.useState({
        username: "",
        searchedCar: "",
        brandSelected: 0,
        selectedId: 0,
        loading: false,
        populaCarData: PopularCarData,
    });
    const navigation = useNavigation<CombinedNavigationProps>();

    function getSelectedCar(carYom: string) {
        return state.populaCarData.find(mappedCar => mappedCar.yom === carYom);
    }
    // React.useEffect(() => loadPopularCars(), [state.populaCarData]);

    function loadPopularCars() {
        setState({
            ...state, loading: true,
        });
        //Service to get the data from the server to render
        fetch('https://aboutreact.herokuapp.com/getpost.php?offset=' + 1)
            //Sending the currect offset with get request
            .then((response) => response.json())
            .then((responseJson) => {
                setState(prevState => ({
                    ...prevState,
                    populaCarData: [...prevState.populaCarData, responseJson]
                }))
                setState({
                    ...state
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
        return (<SearchBar placeholder="Search for a car" onChangeText={(value) => setState({
            ...state,
            searchedCar: value
        })} value={state.searchedCar} inputStyle={{
            fontSize: 20,
            fontWeight: "bold",
            color: layoutParams.colors.black,
        }} containerStyle={{
            backgroundColor: layoutParams.colors.backgroundColor,
        }} inputContainerStyle={{
            backgroundColor: layoutParams.colors.backgroundColor,
            borderWidth: 0,
            elevation: layout.elevation.elevation, borderRadius: 20
        }} autoCapitalize="none" lightTheme/>);
    }

    function onPressimage() {
        navigation.navigate("Profile");
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
        const renderItem = (objectItem: any, index: number) => {
            return (<Pressable style={{
                ...homeStyles.flatview,
                backgroundColor: layoutParams.colors.white,
                elevation: state.selectedId == index ? layoutParams.elevation.elevation : 0
            }}
                               onPress={() => {
                                   setState({
                                       ...state, selectedId: index
                                   });
                                   navigation.navigate("CarDetails", {cardetails: getSelectedCar(objectItem.yom)});
                               }}>
                <Image source={require("../../../assets/images/mainCarImage.jpg")} style={{
                    width: "100%", borderRadius: 10, resizeMode: "contain",
                    height: "50%"
                }}/>
                <View style={{
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center'
                }}><Text style={{
                    textAlign: 'center',
                    fontWeight: "bold",
                    fontSize: 25,
                    fontFamily: "Poppins_600SemiBold"
                }} adjustsFontSizeToFit>{objectItem?.make}</Text>
                    <Text style={{
                        color: layoutParams.colors.lighGrey,
                        fontWeight: "bold", fontFamily: "Poppins_500Medium", textAlign: 'center', fontSize: 20
                    }} adjustsFontSizeToFit>{objectItem?.price}</Text>
                </View>
                {renderCarSpecs(objectItem.yom, objectItem.mileage, index)}
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
                        textAlign: 'center', fontFamily: "Roboto_500Medium", margin: 10
                    }} adjustsFontSizeToFit>Show more specs</Text>
                </View>
            </Pressable>);
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
        }}><FlatListView showsHorizontalScrollIndicator={false} data={state.populaCarData}
                         renderItem={({item, index}) => renderItem(item, index)}
                         ListFooterComponentStyle={null}
                         horizontal
                         showsVerticalScrollIndicator={false}
                         ListFooterComponent={() => <View style={{marginLeft: 10}}/>}
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
                        source: {uri: 'https://randomuser.me/api/portraits/men/36.jpg'},
                        size: layoutParams.WINDOW.height * .07,
                        rounded: true,
                        onPress: onPressimage
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
        borderColor: layoutParams.colors.backgroundColor,
        height: layout.WINDOW.height * .05,
        borderBottomColor: '#B3CCD3',//if we want only bottom line
        backgroundColor: layout.colors.white,
        fontSize: 20,
        borderRadius: 10,
        padding: 10,
        elevation: layout.elevation.elevation,
    }, circularImage: {
        width: 50, height: 50, borderRadius: 50 / 2
    }, flatview: {
        margin: 3, borderRadius: 10, marginBottom: 10,
        minWidth: layoutParams.WINDOW.width * .5
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
