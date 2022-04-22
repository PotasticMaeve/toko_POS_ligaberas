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

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']
const { width } = Dimensions.get("screen")
const Products = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const [category, setCategory] = useState([
        { key: "1", qty: 15, imgName: "beras", text: "Beras", color: "#F2E1AD" },
        { key: "2", qty: 24, imgName: "tepung", text: "Tepung", color: "#E8CFC8" },
        { key: "3", qty: 17, imgName: "daging", text: "Daging", color: "#EDDCC8" },
        { key: "4", qty: 19, imgName: "minyak", text: "Minyak", color: "#BDE2E4" },
        { key: "5", qty: 12, imgName: "susu", text: "Susu", color: "#F6D8B6" },
        { key: "6", qty: 20, imgName: "telur", text: "Telur", color: "#E0E7D7" },
        { key: "7", qty: 15, imgName: "teh", text: "Teh & Kopi", color: "#E5EFC9" },
        { key: "8", qty: 14, imgName: "bumbu", text: "Bumbu Dapur", color: "#DEE3FC" },
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
            return require("../../assets/images/wheat_bg.jpg")
        }
        if (imgName === "tepung") {
            return require("../../assets/images/flour_bg.jpg")
        }
        if (imgName === "daging") {
            return require("../../assets/images/beef_bg.jpg")
        }
        if (imgName === "minyak") {
            return require("../../assets/images/oil_bg.jpg")
        }
        if (imgName === "susu") {
            return require("../../assets/images/milk_bg.jpg")
        }
        if (imgName === "telur") {
            return require("../../assets/images/egg_bg.jpg")
        }
        if (imgName === "teh") {
            return require("../../assets/images/tea_bg.jpg")
        }
        if (imgName === "bumbu") {
            return require("../../assets/images/seasoning_bg.jpg")
        }
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
            />
        )
    }

    useEffect(() => {
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
            <ScrollView style={{ paddingVertical: 10, flex: 1, backgroundColor: "#fafafa" }} showsVerticalScrollIndicator={false}>
                <ScrollView style={styles.cardWrap} horizontal>
                    {category.length > 0 && category.map(item => (
                        <View style={{
                            flex: 1,
                            display: "flex",
                            width: 150,
                            backgroundColor: "#fff",
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
                            flexDirection: "column",
                            alignItems: "center",
                            paddingLeft: 10,
                            paddingRight: 30,
                            overflow: "hidden"
                        }}>
                            <View style={{ height: 65, width: "140%", position: "absolute", top: 0, left: 0 }}>
                                <Image
                                    source={getImage(item.imgName)}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        height: "100%",
                                        width: "100%",
                                    }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{ height: 25, width: "130%",  position: "absolute", bottom: 0, left: 0, justifyContent: "center", alignItems: "center" }}>
                                {isLoading ? (
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            height: 20,
                                            width: "30%",
                                            borderRadius: 5,
                                        }}
                                    />
                                ) : (
                                    <Text style={{ color: "#27ae60", fontFamily: "Poppins-SemiBold", textAlign: "center" }}>{item.qty}</Text>
                                )}
                            </View>
                        </View>
                    ))}
                    <View style={{ marginHorizontal: 10 }}></View>
                </ScrollView>
                <View style={{ width: "100%", flexDirection: "column", paddingHorizontal: 15, justifyContent: "space-between", paddingVertical: 5 }}>
                    <SafeAreaView style={s.input}>
                        <TextInput
                            placeholder="Cari produk"
                            style={{ marginLeft: 3, marginTop: 2, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", paddingHorizontal: 10, paddingVertical: 7, width: "90%" }}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                        <FontAwesome5 name={"search"} size={18} color='#eb8937' style={{ marginRight: 15 }} />
                    </SafeAreaView>
                </View>
                <View style={{ width: "100%", flexDirection: "column", paddingHorizontal: 15, justifyContent: "space-between", paddingVertical: 10 }}>
                    <FlatList
                        data={formatFlatList(data, 2)}
                        renderItem={renderProductCard}
                        keyExtractor={(item, i) => i.toString()}
                        numColumns={2}
                    />
                </View>
            </ScrollView>
        </>
    )
}

const s = StyleSheet.create({
    input: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 3,
        backgroundColor: "#eaeaea",
        width: "100%",
        borderRadius: 10
    }
})
export default Products