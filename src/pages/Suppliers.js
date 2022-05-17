import React, { useContext, useEffect, useState, useRef } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import Icons from 'react-native-vector-icons/Ionicons'
import * as OpenAnything from "react-native-openanything"
import Ripple from 'react-native-material-ripple';
import Space from '../components/Space';
import { toast } from "../Helper"
import BottomSheet from "react-native-gesture-bottom-sheet";
import ShimmerSupplier from '../components/ShimmerSupplier';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']
const Suppliers = () => {
    const bs = useRef(null)
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState([])
    const [dataDisplay, setDataDisplay] = useState([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingForm, setIsLoadingForm] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [singleData, setSingleData] = useState({})

    const getData = () => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/supplier/`)
            .then((res) => {
                setData(res.data.data);
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
        getData()
    }

    const getSearchSupplier = () => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/supplier/?search=${input}`)
            .then(res => {
                if (res.status === 200) {
                    setDataDisplay(res.data.data);
                    setIsLoading(false)
                }
            })
    }

    const getDataById = (id) => {
        setIsLoadingForm(true)
        axios.get(`${backendURL}/api/v1/supplier/${id}/`)
            .then((res) => {
                if (res.status === 200) {
                    setSingleData(res.data);
                    setIsLoadingForm(false)
                }
            })
            .catch((err) => {
                toast("Gagal Memuat Data Supplier", "danger")
            })
    }

    const showDetailSupplier = (id) => {
        bs.current.show()
        getDataById(id)
    }

    const saveSupplier = () => {
        setIsLoading(true)
        let data = singleData
        let payloadUpdate = {
            ...data,
            nama: singleData.nama,
            phone: singleData.phone,
            alamat: singleData.alamat
        }
        if (singleData.nama === "" || singleData.phone === "" || singleData.alamat === "") {
            toast("Data Supplier Harus Diisi", "danger")
            getDataById(singleData.id)
            setEditForm(false)
        } else {
            let body = JSON.stringify(payloadUpdate)
            axios
                .put(`${backendURL}/api/v1/supplier/${singleData.id}/`, body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    let nama = res.data.nama
                    let phone = res.data.phone
                    let alamat = res.data.alamat
                    toast("Berhasil Menyimpan Data Supplier", "success")
                    setIsLoading(false)
                    setEditForm(false)
                    setSingleData({ ...singleData, nama: nama, phone: phone, alamat: alamat });
                    getData()
                    bs.current.close()
                })
                .catch((err) => {
                    console.log(err);
                    toast("Gagal Menyimpan Data Supplier", "danger")
                });
        }
    }

    const getAfterAdd = () => {
        getData()
    }

    const print = () => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                axios.get(`${backendURL}/report/supplier_download`, key)
                .then(res => {
                    if(res.status === 200){
                        let path = res.data.url
                        OpenAnything.Pdf(path)
                    }
                })
                .catch(err => {
                    toast("Gagal Mencetak Data Supplier", "danger")
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
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Supplier</Text>
            </LinearGradient>
            <ScrollView style={{ paddingVertical: 10, height: "100%", backgroundColor: "#fafafa" }} showsVerticalScrollIndicator={false}>
                <View style={s.areaInput}>
                    <SafeAreaView style={s.inputWrap}>
                        <FontAwesome5 name={"search"} size={16} color='#eb8937' style={{ marginLeft: 8 }} onPress={() => getSearchProduct()} />
                        <TextInput
                            placeholder="Cari supplier"
                            style={s.inputComp}
                            spellCheck={false}
                            value={input}
                            autoCorrect={false}
                            onChangeText={onChangeText}
                            onSubmitEditing={() => getSearchSupplier()}
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
                {isLoading ? (
                    <>
                        <ShimmerSupplier />
                        <ShimmerSupplier />
                        <ShimmerSupplier />
                    </>
                ) : (
                    <View style={s.productsWrap}>
                        {dataDisplay.length > 0 ? dataDisplay.map((el, i) => (
                            <TouchableOpacity
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
                                onPress={() => showDetailSupplier(el.id)}
                            >
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                    <View style={{ height: 50, width: 50, backgroundColor: "#FCE6C6", borderRadius: 100, justifyContent: "center", alignItems: "center" }} >
                                        <FontAwesome5 name={"store"} size={22} color='#eb8937' />
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around', width: "80%" }}>
                                        <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{el.nama}</Text>
                                        <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{el.phone}</Text>
                                        <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>{el.alamat}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )) : (
                            data.length > 0 && data.map((el, i) => (
                                <TouchableOpacity
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
                                    onPress={() => showDetailSupplier(el.id)}
                                >
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                        <View style={{ height: 50, width: 50, backgroundColor: "#FCE6C6", borderRadius: 100, justifyContent: "center", alignItems: "center" }} >
                                            <FontAwesome5 name={"store"} size={22} color='#eb8937' />
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around', width: "80%" }}>
                                            <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{el.nama}</Text>
                                            <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{el.phone}</Text>
                                            <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>{el.alamat}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
                        <Space height={50} />
                    </View>
                )}
            </ScrollView>
            <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => Actions.AddSupplier({ getAfterAdd: getAfterAdd })}>
                <FontAwesome5 name={"plus"} size={14} color="#fff" />
            </Ripple>
            <SafeAreaView style={s.container}>
                <BottomSheet hasDraggableIcon ref={bs} height={380}>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{ fontSize: 15, color: "#000", textAlign: "center", fontFamily: "Poppins-SemiBold", marginVertical: 10 }}>Detail Supplier</Text>
                        <View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nama Supplier</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
                                    {isLoadingForm ? (
                                        <ShimmerPlaceHolder
                                            shimmerColors={colorShimmer}
                                            style={{
                                                height: 20,
                                                width: "50%",
                                                marginLeft: 20,
                                                marginVertical: 14
                                            }}
                                        />
                                    ) : (
                                        <TextInput
                                            placeholder="John Doe"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            value={singleData.nama}
                                            onChangeText={text => setSingleData({ ...singleData, nama: text })}
                                            editable={editForm}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nomor Telepon</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
                                    {isLoadingForm ? (
                                        <ShimmerPlaceHolder
                                            shimmerColors={colorShimmer}
                                            style={{
                                                height: 20,
                                                width: "50%",
                                                marginLeft: 20,
                                                marginVertical: 14
                                            }}
                                        />
                                    ) : (
                                        <TextInput
                                            placeholder="082118776231"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            value={singleData.phone}
                                            autoCorrect={false}
                                            editable={editForm}
                                            onChangeText={text => setSingleData({ ...singleData, phone: text })}
                                            keyboardType={'phone-pad'}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Alamat</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
                                    {isLoadingForm ? (
                                        <ShimmerPlaceHolder
                                            shimmerColors={colorShimmer}
                                            style={{
                                                height: 20,
                                                width: "50%",
                                                marginLeft: 20,
                                                marginVertical: 14
                                            }}
                                        />
                                    ) : (
                                        <TextInput
                                            placeholder="alamat"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            editable={editForm}
                                            onChangeText={text => setSingleData({ ...singleData, alamat: text })}
                                            value={singleData.alamat}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            {editForm ? (
                                <View style={{ width: "100%", marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                    <Ripple
                                        rippleColor="#fff"
                                        style={{ height: 40, width: "48%", borderRadius: 10, borderColor: '#eb8937', borderWidth: 1, justifyContent: "center", alignItems: "center" }}
                                        onPress={() => setEditForm(false)}
                                    >
                                        <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>Tutup</Text>
                                    </Ripple>
                                    <Ripple
                                        rippleColor="#fff"
                                        style={{ height: 40, width: "48%", borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center" }}
                                        onPress={() => saveSupplier()}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator color="#fff" />
                                        ) : (
                                            <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Simpan</Text>
                                        )}
                                    </Ripple>
                                </View>
                            ) : (
                                <Ripple
                                    rippleColor="#fff"
                                    style={{ height: 40, width: "100%", borderRadius: 10, borderColor: '#eb8937', borderWidth: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}
                                    onPress={() => setEditForm(true)}
                                >
                                    <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>Ubah Data</Text>
                                </Ripple>
                            )}
                        </View>
                    </View>
                </BottomSheet>
            </SafeAreaView>
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
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Suppliers