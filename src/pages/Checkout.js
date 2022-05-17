import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import Ripple from 'react-native-material-ripple';
import Icon from "react-native-vector-icons/Ionicons"
import Icons from "react-native-vector-icons/FontAwesome"
import { MainContext } from "../context/MainContext"
import { Image } from 'react-native';
import { convertToIDR, toast } from '../Helper';
import Space from '../components/Space';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]
const colorGradient = ['#f3a337', '#eb8937']

const Checkout = (props) => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState([])
    const [totalBarang, setTotalBarang] = useState(0)
    const [shippingCost, setShippingCost] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [profil, setProfil] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [noKartu, setNoKartu] = useState([])
    const [validatePembayaran, setValidatePembayaran] = useState(false)
    const [paymentId, setPaymentId] = useState(0)
    const [customerId, setCustomerId] = useState(0)
    const [activePayment, setActivePayment] = useState(false)
    const [activeButtonPayment, setActiveButtonPayment] = useState(false)
    const [loadBarang, setLoadBarang] = useState(false)
    const [phoneNull, setPhoneNull] = useState(false)
    const [alamatNull, setAlamatNull] = useState(false)

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
                                    if (res.data.data.phone === null) {
                                        setPhoneNull(true)
                                    }
                                    if (res.data.data.alamat === null) {
                                        setAlamatNull(true)
                                    }
                                    setProfil(res.data.data);
                                    setIsLoading(false)
                                }
                            })
                    }
                })
            }
        })
    }

    useEffect(() => {
        displayProfil()
        displayTotalBarang()
        displayPayment()
    }, [])

    const displayTotalBarang = () => {
        setLoadBarang(true)
        AsyncStorage.getItem("tokenAccess").then(data => {
            if (data !== null) {
                let tokenAccess = JSON.parse(data)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                AsyncStorage.getItem("customerID").then(result => {
                    let customer_id = JSON.parse(result)
                    if (customer_id !== null) {
                        axios.get(`${backendURL}/api/v1/cart/?customer_id=${customer_id}`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    setData(res.data.data.cart_data);
                                    props.responsiveProductCheckout && props.responsiveProductCheckout()
                                    setTotalBarang(res.data.data.grandtotal);
                                    setShippingCost(res.data.data.shipping_cost)
                                    setGrandTotal(res.data.data.grandtotal_after_shipping)
                                    setLoadBarang(false)
                                }
                            })
                    }
                })
            }
        })
    }

    const submitPembayaran = () => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                if (activeButtonPayment) {
                    setValidatePembayaran(true)
                    setTimeout(() => {
                        axios.post(`${backendURL}/api/v1/sales_order/`, {
                            "customer_id": customerId,
                            "payment_id": paymentId
                        }, key)
                            .then(res => {
                                if (res.status === 200) {
                                    setValidatePembayaran(false)
                                    Actions.Transaksi({ backToShopping: true })
                                } else {
                                    toast("Gagal Memproses Pesanan", "danger")
                                }
                            })
                    }, 2000);
                    Actions.DelayTransaksi()
                } else {
                    return false;
                }
            }
        })
    }

    const ResponsiveCalculateKeranjang = () => {
        displayTotalBarang()
    }

    const ResponsiveRemoveKeranjang = () => {
        displayTotalBarang()
        props.responsiveDeleteKeranjangFromCheckout && props.responsiveDeleteKeranjangFromCheckout()
    }

    const ResponsiveUpdateProfil = () => {
        displayProfil()
    }

    const selectMethod = () => {
        if (activePayment) {
            return (
                <View style={{ width: "100%", marginTop: 1 }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderColor: "#eb8937", borderWidth: 1.3, borderRadius: 10 }}>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", paddingVertical: 7 }} onPress={() => unselectPayment()}>
                            <Image
                                source={require("../../assets/images/mastercard-logo.png")}
                                style={{ height: 50, width: 50 }}
                                resizeMode="contain"
                            />
                            <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                <Text numberOfLines={1} style={{ width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12, textTransform: "capitalize" }}>Kartu Kredit</Text>
                                <Text numberOfLines={1} style={{ width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12 }}>&#x2022; &#x2022; &#x2022; &#x2022;  &#x2022; &#x2022; &#x2022; &#x2022;  {noKartu[0]} {noKartu[1]} {noKartu[2]} {noKartu[3]}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ width: "100%", marginTop: 1 }} >
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderColor: "#ddd", borderWidth: .5, borderRadius: 10 }}>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", paddingVertical: 7 }} onPress={() => selectPayment()}>
                            <Image
                                source={require("../../assets/images/mastercard-logo.png")}
                                style={{ height: 50, width: 50 }}
                                resizeMode="contain"
                            />
                            <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                <Text numberOfLines={1} style={{ width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12, textTransform: "capitalize" }}>Kartu Kredit</Text>
                                <Text numberOfLines={1} style={{ width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12 }}>&#x2022; &#x2022; &#x2022; &#x2022;  &#x2022; &#x2022; &#x2022; &#x2022;  {noKartu[0]} {noKartu[1]} {noKartu[2]} {noKartu[3]}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    const selectPayment = () => {
        setActivePayment(true)
        if (profil.nama !== null && profil.phone !== null && profil.alamat !== null) {
            setActiveButtonPayment(true)
        } else {
            setActiveButtonPayment(false)
        }
    }

    const unselectPayment = () => {
        setActivePayment(false)
        setActiveButtonPayment(false)
    }

    const displayPayment = () => {
        setIsLoading(true)
        AsyncStorage.getItem("tokenAccess").then(data => {
            if (data !== null) {
                let tokenAccess = JSON.parse(data)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                AsyncStorage.getItem("customerID").then(res => {
                    let customer_id = JSON.parse(res)
                    if (customer_id !== null) {
                        setCustomerId(customer_id)
                        axios.get(`${backendURL}/api/v1/paymentinfo/`, key)
                            .then((res) => {
                                if (res.status === 200) {
                                    let payment_list = res.data.data
                                    let temp = []
                                    if (payment_list.length > 0) {
                                        payment_list.map(el => {
                                            if (el.customer_id === customer_id) {
                                                setPaymentId(el.payment_id)
                                                let number = el.no_kartu.split("")
                                                temp.push(number[8])
                                                temp.push(number[9])
                                                temp.push(number[10])
                                                temp.push(number[11])
                                            }
                                        })
                                    }
                                    setNoKartu(temp)
                                    setIsLoading(false)
                                }
                            })
                    }
                })
            }
        })
    }

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
                    <Text style={{ fontSize: 15.5, fontFamily: "Poppins-SemiBold" }}>Personal Info</Text>
                    <Ripple rippleColor="#fff" style={{ padding: 10, backgroundColor: "#FCE6C6", borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={() => Actions.PersonalInfo({ ResponsiveUpdateProfil: ResponsiveUpdateProfil })}>
                        <FontAwesome5 name={"pen"} size={15} color='#eb8937' />
                    </Ripple>
                </View>
                <View style={{ justifyContent: "flex-start", width: "100%", flexDirection: "row" }}>
                    <View style={{ height: 45, width: 45, backgroundColor: "#FCE6C6", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                        <Icons name="user" size={22} color='#eb8937' />
                    </View>
                    <View style={{ marginLeft: 20, flexDirection: "column", justifyContent: "space-around" }}>
                        {isLoading ? (
                            <>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        width: "60%",
                                        borderRadius: 5,
                                    }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 7,
                                        width: "30%",
                                        borderRadius: 5,
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "#6b705c", fontFamily: "Poppins-Medium", textTransform: "capitalize" }}>{profil.nama}</Text>
                                {phoneNull ? (
                                    <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "red", fontFamily: "Poppins-Medium" }}>no HP tujuan belum diperbarui</Text>
                                ) : (
                                    <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "#6b705c", fontFamily: "Poppins-Medium" }}>{profil.phone}</Text>

                                )}
                            </>
                        )}
                    </View>
                </View>
                <View style={{ paddingTop: 20, paddingBottom: 10, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 15.5, fontFamily: "Poppins-SemiBold" }}>Alamat Pengiriman</Text>
                    <Ripple rippleColor="#fff" style={{ padding: 10, backgroundColor: "#FCE6C6", borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={() => Actions.AlamatPengiriman({ ResponsiveUpdateProfil: ResponsiveUpdateProfil })}>
                        <FontAwesome5 name={"pen"} size={15} color='#eb8937' />
                    </Ripple>
                </View>
                <View style={{ justifyContent: "flex-start", width: "100%", flexDirection: "row" }}>
                    <View style={{ height: 45, width: 45, backgroundColor: "#FCE6C6", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                        <Icon name="location" size={24} color='#eb8937' />
                    </View>
                    <View style={{ marginLeft: 20, flexDirection: "column", justifyContent: "space-around" }}>
                        {isLoading ? (
                            <>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        width: "60%",
                                        borderRadius: 5,
                                    }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 7,
                                        width: "30%",
                                        borderRadius: 5,
                                    }}
                                />
                                <View style={{ marginTop: 10 }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            marginTop: 7,
                                            width: "90%",
                                            borderRadius: 5,
                                        }}
                                    />
                                </View>
                            </>
                        ) : (
                            <>
                                <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: `${profil.nama ? "#6b705c" : "red"}`, fontFamily: "Poppins-Medium", textTransform: "capitalize" }}>{profil.nama && profil.nama}</Text>
                                {phoneNull ? (
                                    <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "red", fontFamily: "Poppins-Medium" }}>no HP tujuan belum diperbarui</Text>
                                ) : (
                                    <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "#6b705c", fontFamily: "Poppins-Medium" }}>{profil.phone}</Text>

                                )}
                                <View style={{ marginTop: 10 }}>
                                    {alamatNull ? (
                                        <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "red", fontFamily: "Poppins-Medium" }}>alamat belum diperbarui</Text>
                                    ) : (
                                        <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: "#6b705c", fontFamily: "Poppins-Medium" }}>{profil.alamat}</Text>
                                    )}
                                </View>
                            </>
                        )}
                    </View>
                </View>
                <View style={{ paddingTop: 20, paddingBottom: 10, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 15.5, fontFamily: "Poppins-SemiBold" }}>Konfirmasi Pesanan</Text>
                    <Ripple rippleColor="#fff" style={{ padding: 10, backgroundColor: "#FCE6C6", borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={() => Actions.ConfirmKeranjang({ ResponsiveCalculateKeranjang: ResponsiveCalculateKeranjang, ResponsiveRemoveKeranjang: ResponsiveRemoveKeranjang })}>
                        <FontAwesome5 name={"pen"} size={15} color='#eb8937' />
                    </Ripple>
                </View>
                <View style={{ width: "100%" }}>
                    {loadBarang ? (
                        <>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", marginVertical: 5, padding: 5 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        width: 60,
                                        borderRadius: 5,
                                        height: 60
                                    }}
                                />
                                <View style={{ marginLeft: 10, flexDirection: "column" }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            width: "60%",
                                            borderRadius: 5,
                                        }}
                                    />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            marginTop: 7,
                                            width: "35%",
                                            borderRadius: 5,
                                        }}
                                    />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            marginTop: 7,
                                            width: "45%",
                                            borderRadius: 5,
                                        }}
                                    />
                                </View>
                                <View style={{ height: 60, width: 40, justifyContent: "center", alignItems: "center", position: "absolute", top: 0, right: 0 }} >
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            width: 30,
                                            borderRadius: 5,
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", marginVertical: 5, padding: 5 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        width: 60,
                                        borderRadius: 5,
                                        height: 60
                                    }}
                                />
                                <View style={{ marginLeft: 10, flexDirection: "column" }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            width: "60%",
                                            borderRadius: 5,
                                        }}
                                    />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            marginTop: 7,
                                            width: "40%",
                                            borderRadius: 5,
                                        }}
                                    />
                                </View>
                                <View style={{ height: 60, width: 40, justifyContent: "center", alignItems: "center", position: "absolute", top: 0, right: 0 }} >
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            width: 30,
                                            borderRadius: 5,
                                        }}
                                    />
                                </View>
                            </View>
                        </>
                    ) : (
                        data.map((el, i) => {
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
                                        <Text numberOfLines={1} style={{ marginTop: 2, width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12, color: '#60a3bc' }}>Satuan : {convertToIDR(el.product.harga)}</Text>
                                        <Text numberOfLines={1} style={{ marginTop: 2, width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12, color: '#c1121f' }}>Subtotal : {convertToIDR(el.subtotal)}</Text>
                                    </View>
                                    <View style={{ height: 60, width: 40, justifyContent: "center", alignItems: "center", position: "absolute", top: 0, right: 0 }} >
                                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13, color: "#27ae60" }}>x {el.qty}</Text>
                                    </View>
                                </View>
                            )
                        })
                    )}
                </View>
                <View style={{ paddingTop: 20, paddingBottom: 10, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 15.5, fontFamily: "Poppins-SemiBold" }}>Metode Pembayaran</Text>
                    <Ripple rippleColor="#fff" style={{ padding: 10, backgroundColor: "#FCE6C6", borderRadius: 10, justifyContent: "center", alignItems: "center" }} onPress={() => Actions.Pembayaran()}>
                        <FontAwesome5 name={"pen"} size={15} color='#eb8937' />
                    </Ripple>
                </View>
                {noKartu.length > 0 ? (
                    selectMethod()
                ) : (
                    <Text style={{ fontSize: 12, fontFamily: "Poppins-Medium", color: 'red' }}>Belum ada kartu terdaftar</Text>
                )}
                <Space height={200} />
            </ScrollView >
            <View style={{ position: "absolute", left: 0, bottom: 0, height: 180, paddingTop: 10, paddingBottom: 10, width: "100%", paddingHorizontal: 15, backgroundColor: "#fafafa" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13.5, color: '#60a3bc' }}>Total Harga Barang</Text>
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
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 13.5, color: '#60a3bc' }}>{convertToIDR(totalBarang)}</Text>
                    )}
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13.5, color: '#60a3bc' }}>Biaya Kirim</Text>
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
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 13.5, color: '#60a3bc' }}>{convertToIDR(shippingCost)}</Text>
                    )}
                </View>
                <View style={{ borderTopWidth: 1, borderTopColor: "#ccc", height: 10, width: "100%", marginVertical: 5 }}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: "Poppins-Bold", fontSize: 13.5, color: "#27ae60" }}>Total Bayar</Text>
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
                        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 13.5, color: "#27ae60" }}>{convertToIDR(grandTotal)}</Text>
                    )}
                </View>
                <Ripple rippleColor={activeButtonPayment && "#fff"} style={{ height: 40, width: "100%", marginTop: 10, borderRadius: 10, backgroundColor: `${activeButtonPayment ? "#eb8937" : "#ccc"}`, justifyContent: "center", alignItems: "center" }} onPress={() => submitPembayaran()}>
                    {validatePembayaran ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={{ fontSize: 14, color: '#fff', fontFamily: "Poppins-SemiBold" }}>Lanjutkan Pembayaran</Text>
                    )}
                </Ripple>
            </View>
        </>
    )
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