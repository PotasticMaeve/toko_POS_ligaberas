import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import Ripple from 'react-native-material-ripple';
import Icon from "react-native-vector-icons/Ionicons"
import { MainContext } from "../context/MainContext"
import { Image } from 'react-native';
import { convertToIDR, toast } from '../Helper';
import Space from '../components/Space';
import { CreditCardInput } from "react-native-credit-card-input";
import BottomSheet from "react-native-gesture-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { setStorage, setRefreshToken } from '../Helper'
import ShimmerCheckout from "../components/ShimmerCheckout"

const colorGradient = ['#f3a337', '#eb8937']

const Checkout = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState([])
    const [totalBarang, setTotalBarang] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [creditData, setCreditData] = useState({})
    const [profil, setProfil] = useState({})
    const bs = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const displayProfil = () => {
        setIsLoading(true)
        AsyncStorage.getItem("tokenAccess").then(data => {
            if (data !== null) {
                let tokenAccess = JSON.parse(data)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                AsyncStorage.getItem("customerUsername").then(result => {
                    let username = JSON.parse(result)
                    if (username !== null) {
                        axios.get(`${backendURL}/api/v1/customer/?username=${username}`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    setProfil(res.data.data);
                                    setIsLoading(false)
                                } else {
                                    console.log("no customer ID [checkout]");
                                }
                            })
                    } else {
                        console.log("no customer username [checkout]");
                    }
                })
            } else {
                console.log("no access [checkout]");
            }
        })
    }

    useEffect(() => {
        displayProfil()
        displayTotalBarang()
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [])

    const displayTotalBarang = () => {
        let total = 0
        AsyncStorage.getItem("tokenAccess").then(data => {
            if (data !== null) {
                let tokenAccess = JSON.parse(data)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                AsyncStorage.getItem("customerUsername").then(result => {
                    let username = JSON.parse(result)
                    if (username !== null) {
                        axios.get(`${backendURL}/api/v1/customer/?username=${username}`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    let customer_id = res.data.data.customer_id
                                    setStorage("customerID", customer_id)
                                    axios.get(`${backendURL}/api/v1/cart_item/?customer_id=${customer_id}`, key)
                                        .then((res) => {
                                            if (res.status === 200) {
                                                let cart_item_data = res.data.data
                                                setData(cart_item_data);
                                                cart_item_data.map((el) => {
                                                    total += el.total
                                                })
                                                setTotalBarang(total)
                                                setGrandTotal(total + 30000)
                                                setIsLoading(false)
                                            } else {
                                                setRefreshToken()
                                            }
                                        })
                                } else {
                                    console.log("no customer ID [checkout]");
                                }
                            })
                    } else {
                        console.log("no customer username [checkout]");
                    }
                })
            } else {
                console.log("no access [checkout]");
            }
        })
    }

    const _onChange = form => setCreditData(form);

    const submitPembayaran = () => {
        let { values } = creditData
        if(values.cvc.length !== 3 && values.expiry !== 4){
            bs.current.close()
            toast("Data Pembayaran Tidak Valid", "danger")
        }else{
            bs.current.close()
            toast("Berhasil Melakukan Pembayaran", "success")
        }
    }

    if (isLoading) {
        return (
            <ShimmerCheckout />
        )
    } else {
        return (
            <>
                <LinearGradient colors={colorGradient} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                    </TouchableOpacity>
                    <View style={{ justifyContent: "center", marginTop: 5 }}>
                        <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold" }}>Checkout</Text>
                    </View>
                </LinearGradient>
                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff", paddingHorizontal: 15 }}>
                    <View style={{ paddingVertical: 10, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 15.5, fontFamily: "Poppins-SemiBold" }}>Alamat Pengiriman</Text>
                        <Ripple rippleColor="#fff" style={{ padding: 10, backgroundColor: "#FCE6C6", borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={() => Actions.DetailPengiriman()}>
                            <FontAwesome5 name={"pen"} size={15} color='#eb8937' />
                        </Ripple>
                    </View>
                    <View style={{ justifyContent: "flex-start", width: "100%", flexDirection: "row" }}>
                        <View style={{ height: 45, width: 45, backgroundColor: "#FCE6C6", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                            <Icon name="location" size={24} color='#eb8937' />
                        </View>
                        <View style={{ marginLeft: 20, flexDirection: "column", justifyContent: "space-around" }}>
                            <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "#6b705c", fontFamily: "Poppins-Medium", textTransform: "capitalize" }}>{profil ? profil.nama : "nama pelanggan belum diperbarui"}</Text>
                            <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "#6b705c", fontFamily: "Poppins-Medium" }}>{profil ? profil.phone : "no HP tujuan belum diperbarui"}</Text>
                            <View style={{ marginTop: 10 }}>
                                <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "#6b705c", fontFamily: "Poppins-Medium", textTransform: "capitalize" }}>{profil ? profil.email : "email belum diperbarui"} </Text>
                                <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "#6b705c", fontFamily: "Poppins-Medium", textTransform: "capitalize" }}>{profil ? profil.alamat : "alamat belum diperbarui"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingTop: 20, paddingBottom: 10, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 15.5, fontFamily: "Poppins-SemiBold" }}>Konfirmasi Pesanan</Text>
                        <Ripple rippleColor="#fff" style={{ padding: 10, backgroundColor: "#FCE6C6", borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={() => Actions.Keranjang()}>
                            <FontAwesome5 name={"pen"} size={15} color='#eb8937' />
                        </Ripple>
                    </View>
                    <View style={{ width: "100%" }}>
                        {data.map((el, i) => {
                            return (
                                <View key={i} style={{ flexDirection: "row", justifyContent: "flex-start", marginVertical: 5, padding: 5 }}>
                                    <View style={{ height: 60, width: 60 }} >
                                        <Image
                                            source={{ uri: el.product.photo }}
                                            style={{ height: 60, width: "auto" }}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 10, flexDirection: "column" }}>
                                        <Text numberOfLines={1} style={{ width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12 }}>{el.product.nama}</Text>
                                        <Text numberOfLines={1} style={{ marginTop: 2, width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 13, color: '#60a3bc' }}>{convertToIDR(el.product.harga)}</Text>
                                    </View>
                                    <View style={{ height: 60, width: 60, justifyContent: "center", alignItems: "center" }} >
                                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13, color: "#27ae60" }}>x {el.qty}</Text>
                                    </View>
                                </View>
                            )
                        }
                        )}
                    </View>
                    <Space />
                    <View style={{ height: 100 }}></View>
                </ScrollView>
                <View style={{ position: "absolute", left: 0, bottom: 0, height: 180, paddingTop: 10, paddingBottom: 10, width: "100%", paddingHorizontal: 15, backgroundColor: "#fafafa" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13.5, color: '#60a3bc' }}>Total Harga Barang</Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 13.5, color: '#60a3bc' }}>{convertToIDR(totalBarang)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13.5, color: '#60a3bc' }}>Biaya Kirim</Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 13.5, color: '#60a3bc' }}>{convertToIDR(30000)}</Text>
                    </View>
                    <View style={{ borderTopWidth: 1, borderTopColor: "#ccc", height: 10, width: "100%", marginVertical: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 13.5, color: "#27ae60" }}>Total Bayar</Text>
                        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 13.5, color: "#27ae60" }}>{convertToIDR(grandTotal)}</Text>
                    </View>
                    <Ripple rippleColor="#fff" style={{ height: 40, width: "100%", marginTop: 10, borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center" }} onPress={() => bs.current.show()}>
                        <Text style={{ fontSize: 14, color: '#fff', fontFamily: "Poppins-SemiBold" }}>Lanjutkan Pembayaran</Text>
                    </Ripple>
                </View>
                <SafeAreaView style={s.container}>
                    <BottomSheet hasDraggableIcon ref={bs} height={450}>
                        <View style={{
                            padding: 20,
                            paddingTop: 20,
                        }}>
                            <Text style={{ fontSize: 16, color: "#000", textAlign: "center", fontFamily: "Poppins-SemiBold", marginBottom: 10 }}>Detail Pembayaran</Text>
                            <CreditCardInput
                                autoFocus
                                requiresName
                                requiresCVC
                                placeholderColor="#bbb"
                                onChange={_onChange}
                                validColor="#27ae60"
                                placeholderColor="#ccc"
                                placeholders={{ number: "2222 2222 2222 2222", expiry: "MM/YY", cvc: "CVV", name: "Nama Lengkap" }}
                                labels={{ number: "Nomor Kartu", expiry: "EXPIRY", cvc: "kode CVV", name: "Nama CardHolders" }}
                                labelStyle={{ fontFamily: "Poppins-SemiBold", textTransform: "uppercase" }}
                            />
                            <Ripple
                                rippleColor="#fff"
                                style={{
                                    marginTop: 20,
                                    height: 40,
                                    borderRadius: 10,
                                    backgroundColor: '#eb8937',
                                    overflow: 'hidden',
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: 'center',
                                }}
                                onPress={() => submitPembayaran()}
                            >
                                <Text style={{ fontFamily: "Poppins-SemiBold", color: "#fff", textTransform: "capitalize", fontSize: 13.5, marginTop: 5 }}>Bayar Sekarang</Text>
                            </Ripple>
                        </View>
                    </BottomSheet>
                </SafeAreaView>
            </>
        )
    }
}

const s = StyleSheet.create({
    button: {
        height: 50,
        width: 150,
        backgroundColor: "#140078",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowColor: "#8559da",
        shadowOpacity: 0.7,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        elevation: 6,
    },
    text: {
        color: "white",
        fontWeight: "600",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Checkout