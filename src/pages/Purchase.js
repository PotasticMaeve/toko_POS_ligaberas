import React, { useContext, useEffect, useState, useRef } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import * as OpenAnything from "react-native-openanything"
import DatePicker from 'react-native-datepicker';
import Modal from "react-native-modal";
import Ripple from 'react-native-material-ripple';
import Space from '../components/Space';
import { toast, setRefreshToken, convertToIDR } from "../Helper"
import BottomSheet from "react-native-gesture-bottom-sheet";
import ShimmerSupplier from '../components/ShimmerSupplier';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SliderCard from '../components/SliderCard';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]
const colorHeader = ['#f3a337', '#eb8937']

const { height } = Dimensions.get("screen")
const Purchase = () => {
    const bs = useRef(null)
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState([])
    const [dataDisplay, setDataDisplay] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingForm, setIsLoadingForm] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [singleData, setSingleData] = useState({})
    const [beginDate, setBeginDate] = useState("")
    const [lastDate, setLastDate] = useState("")

    const getData = () => {
        setIsLoading(true)
        AsyncStorage.getItem("tokenAccess").then(token => {
            let tokenAccess = JSON.parse(token)
            if (tokenAccess !== null) {
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                axios.get(`${backendURL}/api/v1/purchase_detail/`, key)
                    .then((res) => {
                        setData(res.data.data);
                        setIsLoading(false)
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            setRefreshToken()
                        }
                        toast("Gagal Memuat Data Pemesanan", "danger")
                        setIsLoading(false)
                    })
            }
        })
    }

    const getDataById = (id) => {
        setIsLoadingForm(true)
        AsyncStorage.getItem("tokenAccess").then(token => {
            let tokenAccess = JSON.parse(token)
            if (tokenAccess !== null) {
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                axios.get(`${backendURL}/api/v1/purchase_detail/${id}/`, key)
                    .then((res) => {
                        if (res.status === 200) {
                            setSingleData(res.data);
                            setIsLoadingForm(false)
                        }
                    })
                    .catch((err) => {
                        toast("Gagal Memuat Data Pesanan", "danger")
                    })
            }
        })
    }

    const showDetailPesanan = (id) => {
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
                    setDataDisplay([])
                    getData()
                    bs.current.close()
                })
                .catch((err) => {
                    toast("Gagal Menyimpan Data Supplier", "danger")
                    setIsLoading(false)
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
                if (beginDate !== "" || lastDate !== "") {
                    axios.get(`${backendURL}/report/po_download`, key)
                        .then(res => {
                            if (res.status === 200) {
                                let path = res.data.url
                                OpenAnything.Pdf(path)
                            }
                            setModalShow(false)
                            setBeginDate("")
                            setLastDate("")
                        })
                        .catch(err => {
                            toast("Gagal Mencetak Data Pemesanan", "danger")
                        })
                } else {
                    axios.get(`${backendURL}/report/po_download`, key)
                        .then(res => {
                            if (res.status === 200) {
                                let path = res.data.url
                                OpenAnything.Pdf(path)
                            }
                            setModalShow(false)
                            setBeginDate("")
                            setLastDate("")
                        })
                        .catch(err => {
                            toast("Gagal Mencetak Data Pemesanan", "danger")
                        })
                }
            }
        })
    }

    const receivePurchase = (id) => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                axios.post(`${backendURL}/api/v1/receive_po/`, {
                    id_detail_po: id
                }, key)
                    .then(res => {
                        getData()
                        toast("Pesanan Selesai", "success")
                    })
                    .catch((err) => {
                        toast("Gagal Menyelesaikan Pesanan", "danger")
                        setIsLoading(false)
                    })

            }
        })
    }

    const deletePurchase = (id) => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                axios.delete(`${backendURL}/api/v1/purchase_detail/${id}/`, key)
                    .then(res => {
                        toast("Pesanan Berhasil Dihapus", "success")
                        getData()
                    })
                    .catch((err) => {
                        toast("Gagal Menghapus Pesanan", "danger")
                        setIsLoading(false)
                    })

            }
        })
    }

    const filterDate = () => {
        setModalShow(true)
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
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Pemesanan</Text>
            </LinearGradient>
            <ScrollView style={{ paddingVertical: 10, height: "100%", backgroundColor: "#fafafa" }} showsVerticalScrollIndicator={false}>
                <SliderCard />
                <View style={{ paddingTop: 10, paddingHorizontal: 20, justifyContent: "center", alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ height: 30, width: 60, borderColor: "#f5576c", borderWidth: 1, justifyContent: "center", alignItems: "center" }} onPress={() => filterDate()}>
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
                            `${el.is_lunas}` === "false" && (
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
                                    onPress={() => showDetailPesanan(el.id)}
                                >
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                        <View style={{ height: 50, width: 50, backgroundColor: "#FCE6C6", borderRadius: 100, justifyContent: "center", alignItems: "center" }} >
                                            <FontAwesome5 name={"archive"} size={22} color='#eb8937' />
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around', width: "80%" }}>
                                            <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "uppercase" }}>{el.nopo}</Text>
                                            <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{el.barang}</Text>
                                            <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>Total: {convertToIDR(el.total)}</Text>
                                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly" }}>
                                                <Ripple
                                                    rippleColor="red"
                                                    onPress={() => deletePurchase(el.id)}
                                                    style={{ width: 100, height: 30, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "red", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'red' }}>Batalkan</Text>
                                                </Ripple>
                                                <Ripple
                                                    rippleColor="#27ae60"
                                                    onPress={() => receivePurchase(el.id)}
                                                    style={{ width: 100, height: 30, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "#27ae60", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>Terima</Text>
                                                </Ripple>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        )) : (
                            data.length > 0 && data.map((el, i) => (
                                `${el.is_lunas}` === "false" && (
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
                                        onPress={() => showDetailPesanan(el.id)}
                                    >
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                            <View style={{ height: 50, width: 50, backgroundColor: "#FCE6C6", borderRadius: 100, justifyContent: "center", alignItems: "center" }} >
                                                <FontAwesome5 name={"archive"} size={22} color='#eb8937' />
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around', width: "80%" }}>
                                                <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "uppercase" }}>{el.nopo}</Text>
                                                <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{el.barang}</Text>
                                                <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>Total: {convertToIDR(el.total)}</Text>
                                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly" }}>
                                                    <Ripple
                                                        rippleColor="red"
                                                        onPress={() => deletePurchase(el.id)}
                                                        style={{ width: 100, height: 30, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "red", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                        <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'red' }}>Batalkan</Text>
                                                    </Ripple>
                                                    <Ripple
                                                        rippleColor="#27ae60"
                                                        onPress={() => receivePurchase(el.id)}
                                                        style={{ width: 100, height: 30, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "#27ae60", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                        <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>Terima</Text>
                                                    </Ripple>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            ))
                        )}
                        <Space height={50} />
                    </View>
                )}
            </ScrollView>
            <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => Actions.AddPurchase({ getAfterAdd: getAfterAdd })}>
                <FontAwesome5 name={"plus"} size={14} color="#fff" />
            </Ripple>
            <SafeAreaView style={s.container}>
                <BottomSheet hasDraggableIcon ref={bs} height={450}>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{ fontSize: 15, color: "#000", textAlign: "center", fontFamily: "Poppins-SemiBold", marginVertical: 10 }}>Detail Pesanan</Text>
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
                                            value={singleData.supplier}
                                            onChangeText={text => setSingleData({ ...singleData, supplier: text })}
                                            editable={editForm}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nama Barang</Text>
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
                                            placeholder="Telur Omega"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            value={singleData.barang}
                                            autoCorrect={false}
                                            editable={editForm}
                                            onChangeText={text => setSingleData({ ...singleData, barang: text })}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Harga Beli</Text>
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
                                            placeholder="10000"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            editable={editForm}
                                            onChangeText={text => setSingleData({ ...singleData, harga_beli: text })}
                                            value={`${singleData.harga_beli}`}
                                            keyboardType={'phone-pad'}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Jumlah</Text>
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
                                            placeholder="10000"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            editable={editForm}
                                            onChangeText={text => setSingleData({ ...singleData, qty: text })}
                                            value={`${singleData.qty}`}
                                            keyboardType={'phone-pad'}
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
            {modalShow && (
                <Modal
                    isVisible={modalShow} style={{ justifyContent: "center", alignItems: "center" }}>
                    <View
                        style={{
                            backgroundColor: "#fafafa",
                            height: 270,
                            width: 300,
                            borderRadius: 10,
                        }}>
                        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
                            <Text style={{ fontFamily: "Poppins-SemiBold" }}>Tentukan Tanggal</Text>
                        </View>
                        <View style={{ height: "100%", width: "100%", paddingHorizontal: 20 }}>
                            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13, marginTop: 10 }}>Tanggal Awal</Text>
                            <DatePicker
                                style={{ width: "100%" }}
                                date={beginDate}
                                mode="date"
                                placeholder="Pilih Tanggal"
                                format="YYYY-MM-DD"
                                minDate="2016-05-01"
                                maxDate="2022-06-30"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingHorizontal: 3,
                                        backgroundColor: "#eaeaea",
                                        width: "100%",
                                        fontFamily: "Poppins-Medium",
                                        borderRadius: 10
                                    }
                                }}
                                onDateChange={(date) => setBeginDate(date)}
                            />
                            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13, marginTop: 10 }}>Tanggal Akhir</Text>
                            <DatePicker
                                style={{ width: "100%" }}
                                mode="date"
                                date={lastDate}
                                placeholder="Pilih Tanggal"
                                format="YYYY-MM-DD"
                                minDate="2012-05-01"
                                maxDate="2022-06-30"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingHorizontal: 3,
                                        backgroundColor: "#eaeaea",
                                        width: "100%",
                                        fontFamily: "Poppins-Medium",
                                        borderRadius: 10
                                    }
                                }}
                                onDateChange={(date) => setLastDate(date)}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            position: "absolute",
                            width: "100%",
                            height: 50,
                            bottom: 0
                        }}>
                            <TouchableOpacity
                                style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#ddd", justifyContent: "center", alignItems: "center" }}
                                onPress={() => setModalShow(false)}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Poppins-Medium" }}>Batal</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#eb8937", justifyContent: "center", alignItems: "center" }}
                                onPress={() => print()}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Poppins-Medium" }}>Cetak</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
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

export default Purchase