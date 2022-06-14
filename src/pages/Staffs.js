import React, { useContext, useEffect, useState, useRef } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import Icons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as OpenAnything from "react-native-openanything"
import Space from '../components/Space';
import { toast, setRefreshToken } from "../Helper"
import LottieView from 'lottie-react-native';
import ShimmerSupplier from '../components/ShimmerSupplier';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colorHeader = ['#f3a337', '#eb8937']
const { height } = Dimensions.get("screen")
const Customers = () => {
    const bs = useRef(null)
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState([])
    const [dataDisplay, setDataDisplay] = useState([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const [showEmpty, setShowEmpty] = useState(false)

    const getData = () => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/customer/?is_admin=true`)
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false)
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setRefreshToken()
                }
                toast("Gagal Memuat Data Staff", "danger")
                setIsLoading(false)
            })
    }

    const onChangeText = (search) => {
        if (search !== "") {
            setEditing(true)
            setInput(search)
        } else {
            setInput("")
            setEditing(false)
        }
    }

    const clearMode = () => {
        setInput("")
        setEditing(false)
        setDataDisplay([])
        setShowEmpty(false)
        getData()
    }

    const getSearchStaff = () => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/customer/?search=${input}&is_admin=true`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.data.length > 0) {
                        setDataDisplay(res.data.data);
                        setShowEmpty(false)
                    } else {
                        setShowEmpty(true)
                    }
                    setIsLoading(false)
                }
            })
    }

    const print = () => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                axios.get(`${backendURL}/report/staff_download`, key)
                    .then(res => {
                        if (res.status === 200) {
                            let path = res.data.url
                            OpenAnything.Pdf(path)
                        }
                    })
                    .catch(err => {
                        toast("Gagal Mencetak Data Staff", "danger")
                    })
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
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Staff</Text>
            </LinearGradient>
            <ScrollView style={{ paddingVertical: 10, height: "100%", backgroundColor: "#fafafa" }} showsVerticalScrollIndicator={false}>
                <View style={s.areaInput}>
                    <SafeAreaView style={s.inputWrap}>
                        <FontAwesome5 name={"search"} size={16} color='#eb8937' style={{ marginLeft: 8 }} onPress={() => getSearchStaff()} />
                        <TextInput
                            placeholder="Cari Staff"
                            style={s.inputComp}
                            spellCheck={false}
                            value={input}
                            autoCorrect={false}
                            onChangeText={onChangeText}
                            onSubmitEditing={() => getSearchStaff()}
                        />
                        {editing && (
                            <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8 }} onPress={() => clearMode()} />
                        )}
                    </SafeAreaView>
                </View>
                <View style={{ paddingTop: 10, paddingHorizontal: 20, justifyContent: "center", alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ height: 30, width: 60, borderColor: "#f5576c", borderWidth: 1, justifyContent: "center", alignItems: "center" }} onPress={() => print()}>
                        <Text style={{ fontSize: 12, color: "#f5576c", textTransform: "uppercase", fontFamily: "Poppins-SemiBold" }}>cetak</Text>
                    </TouchableOpacity>
                </View>
                {showEmpty ? (
                    <>
                        <LottieView
                            source={require('../animations/empty-search.json')}
                            autoPlay
                            loop
                            style={{
                                marginTop: 50,
                                height: height / 3.5,
                                alignSelf: 'center'
                            }}
                        />
                        <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: 10 }}>Staff Tidak Ditemukan</Text>
                        <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Staff untuk pencarian tidak tersedia</Text>
                    </>
                ) : (
                    isLoading ? (
                        <>
                            <ShimmerSupplier />
                            <ShimmerSupplier />
                            <ShimmerSupplier />
                        </>
                    ) : (
                        <View style={s.productsWrap}>
                            {dataDisplay.length > 0 ? dataDisplay.map((el, i) => (
                                <View
                                    style={[styles.cardItemWrap, {
                                        flexDirection: 'column',
                                        height: "auto",
                                        width: "100%",
                                        borderRadius: 5,
                                        backgroundColor: '#fff',
                                        marginHorizontal: 0,
                                        marginVertical: 5,
                                        padding: 10,
                                        borderRadius: 5
                                    }]}
                                    key={i}
                                >
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                        <View style={{ height: 50, width: 50, backgroundColor: "#FCE6C6", borderRadius: 100, justifyContent: "center", alignItems: "center" }} >
                                            <FontAwesome5 name={"user-lock"} size={22} color='#eb8937' />
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around', width: "80%" }}>
                                            <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{el.nama}</Text>
                                            {el.phone ? (
                                                <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{el.phone}</Text>
                                            ) : (
                                                <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'red' }}>No hp belum ditambahkan</Text>
                                            )}
                                            {el.alamat ? (
                                                <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>{el.alamat}</Text>
                                            ) : (
                                                <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'red' }}>Alamat belum ditambahkan</Text>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            )) : (
                                data.length > 0 && data.map((el, i) => (
                                    <View
                                        style={[styles.cardItemWrap, {
                                            flexDirection: 'column',
                                            height: "auto",
                                            width: "100%",
                                            borderRadius: 5,
                                            backgroundColor: '#fff',
                                            marginHorizontal: 0,
                                            marginVertical: 5,
                                            padding: 10,
                                            borderRadius: 5
                                        }]}
                                        key={i}
                                    >
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                            <View style={{ height: 50, width: 50, backgroundColor: "#FCE6C6", borderRadius: 100, justifyContent: "center", alignItems: "center" }} >
                                                <FontAwesome5 name={"user-lock"} size={22} color='#eb8937' />
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around', width: "80%" }}>
                                                <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{el.nama}</Text>
                                                {el.phone ? (
                                                    <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{el.phone}</Text>
                                                ) : (
                                                    <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'red' }}>No hp belum ditambahkan</Text>
                                                )}
                                                {el.alamat ? (
                                                    <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>{el.alamat}</Text>
                                                ) : (
                                                    <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'red' }}>Alamat belum ditambahkan</Text>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                ))
                            )}
                            <Space height={50} />
                        </View>
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
        backgroundColor: "#eaeaea",
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
    productsWrap: {
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    areaInput: {
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: 15,
        justifyContent: "space-between",
        paddingVertical: 5
    },
    areaInputDetail: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 5
    }
})

export default Customers