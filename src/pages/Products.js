import React, { useContext, useEffect, useState } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, FlatList, Dimensions, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import CardItem from '../components/CardItem';
import Ripple from 'react-native-material-ripple';
import AddProduct from './AddProduct';
import Card from "../components/Card"
import Maintenance from "../components/Maintenance"

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']
const { width } = Dimensions.get("screen")

const Products = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [input, setInput] = useState("")
    const [dataDisplay, setDataDisplay] = useState([])

    const [category, setCategory] = useState([
        { key: "1", imgName: "beras", text: "Beras", color: "#fcbf49", bg: "#feebc8" },
        { key: "2", imgName: "tepung", text: "Tepung", color: "#f28482", bg: "#fbdad9" },
        { key: "3", imgName: "daging", text: "Daging", color: "#8dc7ff", bg: "#dceeff" },
        { key: "4", imgName: "minyak", text: "Minyak", color: "#83c9b6", bg: "#d9eee9" },
        { key: "5", imgName: "susu", text: "Susu", color: "#f99cab", bg: "#fde1e5" },
        { key: "6", imgName: "telur", text: "Telur", color: "#ea9f67", bg: "#f8e2d1" },
        { key: "7", imgName: "teh", text: "Teh & Kopi", color: "#9cc5a1", bg: "#e1ede2" },
        { key: "8", imgName: "bumbu", text: "Bumbu Dapur", color: "#abc4ff", bg: "#e5edff" },
    ])

    const formatFlatList = (data, numColumns) => {
        const dataList = data
        const totalRows = Math.floor(dataList.length / numColumns)
        let totalLastRow = dataList.length - (totalRows * numColumns)
        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            dataList.push({ id: "blank", empty: true })
            totalLastRow++
        }
        return dataList
    }

    const getImage = (imgName) => {
        if (imgName === "beras") {
            return require("../../assets/images/flour.png")
        }
        if (imgName === "tepung") {
            return require("../../assets/images/wheat.png")
        }
        if (imgName === "daging") {
            return require("../../assets/images/beef.png")
        }
        if (imgName === "minyak") {
            return require("../../assets/images/cooking-oil.png")
        }
        if (imgName === "susu") {
            return require("../../assets/images/milk.png")
        }
        if (imgName === "telur") {
            return require("../../assets/images/eggs.png")
        }
        if (imgName === "teh") {
            return require("../../assets/images/coffee.png")
        }
        if (imgName === "bumbu") {
            return require("../../assets/images/seasoning.png")
        }
    }

    const getCategoryData = () => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/product/`)
            .then((res) => {
                if (res.data.status === 200) {
                    setCategoryData(res.data.data);
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                toast("Gagal Memuat Data Produk", "danger")
            })
    }

    const getData = () => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/product/`)
            .then((res) => {
                if (res.data.status === 200) {
                    setData(res.data.data);
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                toast("Gagal Memuat Data Produk", "danger")
            })
    }

    const renderProductCard = ({ item }) => {
        if (item.empty) {
            return (
                <View style={[styles.cardBlank, styles.blankCard]} />
            )
        }
        return (
            <CardItem
                id={item.id}
                photo={item.photo}
                nama_barang={item.nama_barang}
                harga={item.harga}
                qty={item.qty}
                detailAdmin="true"
            />
        )
    }

    const onChangeText = (search) => {
        setInput(search)
    }

    const getRealProduct = () => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/product/?search=${input}`)
            .then(res => {
                if (res.status === 200) {
                    setDataDisplay(res.data.data);
                    setIsLoading(true)
                }
            })
    }

    useEffect(() => {
        getCategoryData()
        getData()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Produk</Text>
            </LinearGradient>
            <Maintenance />
            {/* <ScrollView style={{ paddingVertical: 10, flex: 1, backgroundColor: "#fafafa" }} showsHorizontalScrollIndicator={false}>
                <ScrollView style={styles.cardWrap} horizontal>
                    {category.length > 0 && category.map((item, i) => (
                        <View key={i} style={[s.bannerCategory, { backgroundColor: `${item.bg}` }]}>
                            <View style={[s.imgBannerWrap, { backgroundColor: `${item.color}` }]}>
                                <Image
                                    source={getImage(item.imgName)}
                                    style={s.imgBanner}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={s.areaQtyText}>
                                <Text style={s.qtyText}>{item.text}</Text>
                                <Text style={s.qtyText}>0</Text>
                            </View>
                        </View>
                    ))}
                    <View style={{ marginHorizontal: 10 }}></View>
                </ScrollView>
                <View style={s.areaInput}>
                    <SafeAreaView style={s.inputWrap}>
                        <TextInput
                            placeholder="Cari produk"
                            style={s.inputComp}
                            spellCheck={false}
                            autoCorrect={false}
                            onChangeText={onChangeText}
                            onSubmitEditing={() => getRealProduct()}
                        />
                        <FontAwesome5 name={"search"} size={18} color='#eb8937' style={{ marginRight: 15 }} onPress={() => getRealProduct()} />
                    </SafeAreaView>
                </View>
                <View style={s.productsWrap}>
                    {dataDisplay.length > 0 ? (
                        <FlatList
                            data={formatFlatList(dataDisplay, 2)}
                            renderItem={renderProductCard}
                            keyExtractor={(item, i) => i.toString()}
                            numColumns={2}
                        />
                    ) : (
                        <FlatList
                            data={formatFlatList(data, 2)}
                            renderItem={renderProductCard}
                            keyExtractor={(item, i) => i.toString()}
                            numColumns={2}
                        />
                    )}
                </View>
            </ScrollView>
            <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => Actions.AddProduct()}>
                <FontAwesome5 name={"plus"} size={14} color="#fff" />
            </Ripple> */}
        </>
    )
}

const s = StyleSheet.create({
    inputWrap: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 3,
        backgroundColor: "#eaeaea",
        width: "100%",
        borderRadius: 10
    },
    inputComp: {
        marginLeft: 3,
        marginTop: 2,
        fontSize: 14,
        color: "#595959",
        fontFamily: "Poppins-Medium",
        paddingHorizontal: 10,
        paddingVertical: 7,
        width: "90%"
    },
    productsWrap: {
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: 15,
        justifyContent: "space-between",
        paddingVertical: 10
    },
    areaInput: {
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: 15,
        justifyContent: "space-between",
        paddingVertical: 5
    },
    qtyText: {
        color: "#545454",
        fontFamily: "Poppins-SemiBold",
        textAlign: "center",
        fontSize: 11
    },
    areaQtyText: {
        height: "100%",
        width: "50%",
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    bannerCategory: {
        flex: 1,
        display: "flex",
        width: 150,
        height: width / 4,
        marginHorizontal: 5,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#eaeaea',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 3,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 30,
        overflow: "hidden"
    },
    imgBanner: {
        height: "60%",
        width: "60%",
    },
    imgBannerWrap: {
        height: 65,
        width: 65,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    buttonAmount: {
        position: "absolute",
        bottom: 20,
        right: 20,
        height: 55,
        width: 55,
        backgroundColor: "#fb8b24",
        borderRadius: 50,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
    }
})
export default Products