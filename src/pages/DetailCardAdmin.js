import React, { useContext, useEffect, useState } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import { setRefreshToken } from "../Helper"

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]
const colorHeader = ['#f3a337', '#eb8937']
const { width } = Dimensions.get("screen")

const DetailCardAdmin = (props) => {
    const { backend_url, authorized } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState({})

    const getData = () => {
        axios.get(`${backendURL}/api/v1/product/${props.id}/`)
            .then((res) => {
                if (res.status == 200) {
                    setData(res.data.data[0]);
                } else {
                    setRefreshToken()
                }
            })
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
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Detail Produk</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 5, backgroundColor: "#fafafa", height: "100%" }}>
                <View style={s.areaInput}>
                    <Text style={{ color: "#545454", fontFamily: "Poppins-SemiBold", marginBottom: 5, marginLeft: 5 }}>Nama Supplier</Text>
                    <SafeAreaView style={s.inputWrap}>
                        <TextInput
                            placeholder="Supplier"
                            style={s.inputComp}
                            spellCheck={false}
                            autoCorrect={false}
                            value={data.supplier && data.supplier.nama}
                        />
                    </SafeAreaView>
                </View>
                <View style={s.areaInput}>
                    <Text style={{ color: "#545454", fontFamily: "Poppins-SemiBold", marginBottom: 5, marginLeft: 5 }}>Kategori Produk</Text>
                    <SafeAreaView style={s.inputWrap}>
                        <TextInput
                            placeholder="Kategori"
                            style={s.inputComp}
                            spellCheck={false}
                            autoCorrect={false}
                            value={data.kategori && data.kategori.nama}
                        />
                    </SafeAreaView>
                </View>
                <View style={s.areaInput}>
                    <Text style={{ color: "#545454", fontFamily: "Poppins-SemiBold", marginBottom: 5, marginLeft: 5 }}>Nama Produk</Text>
                    <SafeAreaView style={s.inputWrap}>
                        <TextInput
                            placeholder="Nama"
                            style={s.inputComp}
                            spellCheck={false}
                            autoCorrect={false}
                            value={data.nama_barang}
                        />
                    </SafeAreaView>
                </View>
                <View style={s.areaInput}>
                    <Text style={{ color: "#545454", fontFamily: "Poppins-SemiBold", marginBottom: 5, marginLeft: 5 }}>Harga Produk</Text>
                    <SafeAreaView style={s.inputWrap}>
                        <TextInput
                            placeholder="Harga"
                            style={s.inputComp}
                            spellCheck={false}
                            autoCorrect={false}
                            value={`${data.harga}`}
                        />
                    </SafeAreaView>
                </View>
                <View style={s.areaInput}>
                    <Text style={{ color: "#545454", fontFamily: "Poppins-SemiBold", marginBottom: 5, marginLeft: 5 }}>Jumlah Produk</Text>
                    <SafeAreaView style={s.inputWrap}>
                        <TextInput
                            placeholder="Jumlah"
                            style={s.inputComp}
                            spellCheck={false}
                            autoCorrect={false}
                            value={`${data.qty}`}
                        />
                    </SafeAreaView>
                </View>
                <View style={s.areaInput}>
                    <Text style={{ color: "#545454", fontFamily: "Poppins-SemiBold", marginBottom: 5, marginLeft: 5 }}>Deskripsi Produk</Text>
                    <SafeAreaView style={s.inputWrap}>
                        <TextInput
                            placeholder="Deskripsi"
                            style={s.inputComp}
                            spellCheck={false}
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={4}
                            value={data.deskripsi}
                        />
                    </SafeAreaView>
                </View>
                <View style={s.areaInput}>
                    <Text style={{ color: "#545454", fontFamily: "Poppins-SemiBold", marginBottom: 5, marginLeft: 5 }}>Foto Produk</Text>
                </View>
            </ScrollView>
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
    areaInput: {
        marginTop: 5,
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: 15,
        justifyContent: "space-between",
        paddingVertical: 5
    },
})

export default DetailCardAdmin