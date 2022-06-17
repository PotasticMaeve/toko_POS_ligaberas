import React, { useContext, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, Dimensions, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icons from 'react-native-vector-icons/Ionicons'
import styles from '../stylesheets/Main'
import axios from 'axios';
import { MainContext } from "../context/MainContext"
import Card from "./Card"
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native';
import Space from "../components/Space"
import ShimmerCard from './ShimmerCard';

const colorHeader = ['#f3a337', '#eb8937']
const { height } = Dimensions.get("screen")
const Search = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [input, setInput] = useState("")
    const [dataDisplay, setDataDisplay] = useState([])
    const [editing, setEditing] = useState(false)
    const [showEmpty, setShowEmpty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newcome, setNewcome] = useState(true)

    const onChangeText = (search) => {
        if (search !== "") {
            setEditing(true)
            setInput(search)
        } else {
            setInput("")
            setEditing(false)
        }
    }

    const getRealProduct = () => {
        setIsLoading(true)
        if (input !== "") {
            setNewcome(false)
            axios.get(`${backendURL}/api/v1/product/?search=${input}`)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.data.length > 0) {
                            setDataDisplay(res.data.data);
                            setShowEmpty(false)
                            setIsLoading(false)
                        } else {
                            setShowEmpty(true)
                        }
                    }
                })
        }
    }

    const clearMode = () => {
        setInput("")
        setEditing(false)
    }

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 90, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()} style={{ marginBottom: 5 }}>
                    <FontAwesome5 name={"angle-left"} size={28} color='#fff' />
                </TouchableOpacity>
                <TouchableWithoutFeedback style={{ flexDirection: "column", width: "100%" }}>
                    <View style={s.areaInput}>
                        <SafeAreaView style={s.inputWrap}>
                            <FontAwesome5 name={"search"} size={16} color='#eb8937' style={{ marginLeft: 8 }} onPress={() => getRealProduct()} />
                            <TextInput
                                placeholder="Cari produk"
                                style={s.inputComp}
                                spellCheck={false}
                                value={input}
                                autoCorrect={false}
                                onChangeText={onChangeText}
                                onSubmitEditing={() => getRealProduct()}
                            />
                            {editing && (
                                <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8 }} onPress={() => clearMode()} />
                            )}
                        </SafeAreaView>
                    </View>
                </TouchableWithoutFeedback>
            </LinearGradient>
            {/* <View style={{ flex: 1, width: "100%" }}>
                {(dataDisplay.length < 1) ? (
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            let nama_barang = item.nama_barang
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        borderBottomColor: "#ddd",
                                        backgroundColor: "#fff",
                                        borderBottomWidth: 0.5,
                                        flexDirection: "row",
                                        padding: 15,
                                        alignItems: "center",
                                    }}
                                    onPress={() => { getRealProduct(nama_barang) }}
                                >
                                    <Text>{nama_barang}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                ) : (
                    )}
                </View> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {newcome ? (
                    <>
                        <LottieView
                            source={require('../animations/empty-product.json')}
                            autoPlay
                            loop={false}
                            style={{
                                marginTop: 80,
                                height: height / 3.5,
                                alignSelf: 'center'
                            }}
                        />
                        <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: 50 }}>Pencarian Produk</Text>
                        <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Ayo cari produk yang kamu sukai</Text>
                    </>
                ) : (
                    showEmpty ? (
                        <>
                            <LottieView
                                source={require('../animations/empty-search.json')}
                                autoPlay
                                loop
                                style={{
                                    marginTop: 80,
                                    height: height / 3.5,
                                    alignSelf: 'center'
                                }}
                            />
                            <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: 35 }}>Produk Tidak Ditemukan</Text>
                            <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Produk untuk pencarian tidak tersedia</Text>
                        </>
                    ) : (
                        isLoading ? (
                            <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <ShimmerCard />
                                    <ShimmerCard />
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <ShimmerCard />
                                    <ShimmerCard />
                                </View>
                            </View>
                        ) : (
                            <>
                                <Card data={dataDisplay} />
                                <Space height={80} />
                            </>
                        )
                    )
                )}
            </ScrollView>
        </>
    )
}

const s = StyleSheet.create({
    inputWrap: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 3,
        backgroundColor: "#fafafa",
        width: "100%",
        borderRadius: 10
    },
    inputComp: {
        marginRight: 2,
        marginTop: 2,
        fontSize: 14,
        color: "#595959",
        paddingVertical: 6,
        fontFamily: "Poppins-Medium",
        paddingHorizontal: 10,
        width: "83%"
    },
    areaInput: {
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: 15,
        justifyContent: "space-between",
    },
})

export default Search