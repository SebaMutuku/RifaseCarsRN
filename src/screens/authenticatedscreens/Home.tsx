import React from "react";
import {Image, Pressable, SafeAreaView, StyleSheet, TextInput} from "react-native";
import layoutParams from "../../utils/LayoutParams";
import layout from "../../utils/LayoutParams";
import {useNavigation} from "@react-navigation/native";
import {CombinedNavigationProps} from "../../navigation/ScreenTypes";
import {Text, View} from "../../components/Widgets";
import {FontAwesome} from "@expo/vector-icons";
import FlatListView from "../../components/FlatListView";
import CircularImage from "../../components/CircularImage";
import {carBrands, PopularCarData} from "../../utils/Data";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {sharedStyles} from "../../utils/SharedStyles";


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
        return (
            <View style={[homeStyles.searchInputMainContainer]}>
                <View style={homeStyles.searchInputContainer}>
                    <TextInput
                        style={[
                            homeStyles.searchInput,
                            !layoutParams.platform.isAndroid && {paddingVertical: 16},
                        ]}
                        autoCapitalize="none"
                        selectionColor="dodgerblue"
                        placeholderTextColor="#B9BABC"
                        placeholder="Search for a car"
                    />
                    <Icon name="search" size={30} color="#B9BABC"/>
                </View>
            </View>);
    }

    function onPressimage() {
        navigation.navigate("Profile");
    }

    function carBrandFlatList() {
        const renderButton = (index: number, item: any) => (
            <Pressable style={{
            elevation: state.brandSelected == index ? 1 : 0,
            alignItems: 'center',
            justifyContent: "center",
            minWidth: layoutParams.WINDOW.width * .2,
            padding: state.brandSelected == index ? 10 : 6,
            backgroundColor: state.brandSelected == index ? layout.colors.deepBlue : layout.colors.white,
            borderColor: state.brandSelected == index ? layout.colors.deepBlue : layout.colors.deepBlue,
            borderWidth: 0.2,
            margin: 3,
            borderRadius: 24
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
        </Pressable>)
        return (<FlatListView showsHorizontalScrollIndicator={false} data={carBrands} horizontal
                              renderItem={({item, index}: any) => renderButton(index, item)}
                              ListFooterComponentStyle={null}
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

    function renderPopularCars() {
        const renderItem = (objectItem: any, index: number) => {
            return (<Pressable style={{
                ...homeStyles.popularCars,
                backgroundColor: layoutParams.colors.listColors,
                elevation: state.selectedId == index ? layoutParams.elevation.elevation : 0
            }}
                               onPress={() => {
                                   setState({
                                       ...state, selectedId: index
                                   });
                                   navigation.navigate("CarDetails", {cardetails: getSelectedCar(objectItem.yom)});
                               }}>
                <Image source={require("../../../assets/images/mainCarImage.jpg")} style={{
                    width: "100%",
                    borderRadius: 10, resizeMode: "contain",
                    height: "40%"
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
        return <View style={{
            flex: 1.7
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
                    flex: 1,
                    margin: 5,
                    borderRadius: 10,
                    flexDirection: "row",
                    backgroundColor: layoutParams.colors.searchInput,
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
                    }}><Text style={{
                        fontSize: 22,
                        fontFamily: 'WorkSans_500Medium'
                    }}>Audi</Text>
                        <Text style={{...homeStyles.carDetailsText, fontSize: 15}}> Price : 951k</Text>
                        <Text style={{...homeStyles.carDetailsText, fontSize: 15}}> Year Of Manufacturing :2021</Text>
                        <Text style={{...homeStyles.carDetailsText, fontSize: 15}}> Mileage : 5000kms</Text>
                    </View>
                </View>
            </View>)
    }

    return (<SafeAreaView style={{
        ...sharedStyles.container
    }}>
        <View style={sharedStyles.container}>
            {/*top view with avatar*/}
            <View style={{
                flexDirection: "row", justifyContent: "space-between", margin: 5
            }}>
                <View style={{flex: 1}}>
                    <Text style={homeStyles.headerTextNormal}>Let's find the</Text>
                    <Text style={homeStyles.headerTextBold}>Ideal car for you</Text>
                </View>

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
                    fontSize: 22, fontWeight: "normal", fontFamily: "WorkSans_600SemiBold", margin: 8
                }}>Choose a brand</Text>
                {/*brandsFlatList*/}
                {carBrandFlatList()}
                <View style={{
                    justifyContent: "space-between", flexDirection: "row", alignItems: 'center', margin: 5
                }}>
                    <Text style={{
                        fontSize: 22, fontWeight: "normal", fontFamily: "WorkSans_600SemiBold"
                    }}>Popular Cars</Text>

                        <Text style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: layoutParams.colors.deepBlue,
                            fontFamily: "WorkSans_700Bold",
                            textDecorationLine: "underline"
                        }}>View All</Text>
                </View>
                <View style={{
                    marginTop: 10
                }}/>
            </View>
            {/*All Car Brands*/}
            {renderPopularCars()}
            <View style={{
                marginRight: 10,
                marginLeft: 10,
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "WorkSans_600SemiBold"
                }}>
                    Recently Added
                </Text>
                <Text style={{
                    fontSize: 15,
                    ...homeStyles.footerText,
                    color: layoutParams.colors.deepBlue,
                    textDecorationLine: "underline"
                }}>
                    View All
                </Text>
            </View>
            {renderRecentlyViewed()}

        </View>
    </SafeAreaView>);

}
const homeStyles = StyleSheet.create({
    textInput: {
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
    }, popularCars: {
        flex: 1,
        margin: 3, borderRadius: 10, marginBottom: 30,
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
        fontFamily: "WorkSans_600SemiBold", textAlign: 'center'
    },
    carDetailsText: {
        fontSize: 15,
        // fontWeight:"bold",
        fontFamily: "Roboto_500Medium"
    },
    headerTextNormal: {
        color: 'grey',
        fontFamily: 'WorkSans_600SemiBold',
        letterSpacing: 0.2,
        fontSize: 15
    },
    headerTextBold: {
        fontSize: 25,
        fontFamily: 'WorkSans_600SemiBold'
    },
    searchInputMainContainer: {
        margin: 10
    },
    searchInputContainer: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: layoutParams.colors.searchInput,
        borderRadius: 13,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: layoutParams.colors.black,
    },
})
