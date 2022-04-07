import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import Ripple from 'react-native-material-ripple';
import Icon from "react-native-vector-icons/Ionicons"
import { MainContext } from "../context/MainContext"
import { Image } from 'react-native';
import { convertToIDR } from '../Helper';
import Space from '../components/Space';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { CreditCardInput } from "react-native-credit-card-input";

const colorGradient = ['#f3a337', '#eb8937']

const Checkout = () => {
    const { data_cart } = useContext(MainContext)
    const [cart] = data_cart
    const [totalBarang, setTotalBarang] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [creditData, setCreditData] = useState({})
    const [showBottom, setShowBottom] = useState(false)
    const bs = useRef(null)
    const fall = new Animated.Value(1)

    const getImage = (imgName) => {
        if (imgName === "kecap") {
            return require("../../assets/images/kecap.jpg")
        }
        if (imgName === "gula") {
            return require("../../assets/images/gula.jpg")
        }
        if (imgName === "susu") {
            return require("../../assets/images/susu.jpeg")
        }
    }

    useEffect(() => {
        displayTotalBarang()
    }, [])

    const displayTotalBarang = () => {
        let total = 0
        cart.map((el) => {
            total += el.total
        })
        setTotalBarang(total)
        setGrandTotal(total + 30000)
    }

    const _onChange = form => setCreditData(form);

    const renderInner = () => {
        if (showBottom) {
            return (
                <View style={{
                    height: "100%",
                    padding: 20,
                    backgroundColor: '#fff',
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
                    >
                        <Text style={{ fontFamily: "Poppins-SemiBold", color: "#fff", textTransform: "capitalize", fontSize: 13.5, marginTop: 5 }}>Bayar Sekarang</Text>
                    </Ripple>
                </View>
            )
        }
    }

    const renderHeader = () => {
        return (
            <View style={{
                backgroundColor: '#fff',
                paddingTop: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopColor: "#eaeaea",
                borderLeftColor: "#eaeaea",
                borderRightColor: "#eaeaea",
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1
            }}>
                <View style={{
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: 40,
                        height: 4,
                        borderRadius: 4,
                        backgroundColor: '#00000040',
                        marginBottom: 10,
                    }}></View>
                </View>
            </View>
        )
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
                        <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: '#aaa', fontFamily: "Poppins-Medium", textTransform: "capitalize" }}>claudia felicia permatasari</Text>
                        <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: '#aaa', fontFamily: "Poppins-Medium" }}>+62 8123-4567-8910</Text>
                        <View style={{ marginTop: 10 }}>
                            <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: '#aaa', fontFamily: "Poppins-Medium" }}>Jl Wijaya Kusuma No. 17 </Text>
                            <Text numberOfLines={1} style={{ width: 230, fontSize: 12, color: '#aaa', fontFamily: "Poppins-Medium" }}>Kranggan Permai, Jatisampurna</Text>
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
                    {cart.map((el, i) => (
                        <View key={i} style={{ flexDirection: "row", justifyContent: "flex-start", marginVertical: 5, padding: 5 }}>
                            <View style={{ height: 60, width: 60 }} >
                                <Image
                                    source={getImage(el.nama)}
                                    style={{ height: 60, width: "auto" }}
                                />
                            </View>
                            <View style={{ marginLeft: 10, flexDirection: "column" }}>
                                <Text numberOfLines={1} style={{ width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12 }}>{el.title}</Text>
                                <Text numberOfLines={1} style={{ marginTop: 2, width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 13, color: '#60a3bc' }}>{convertToIDR(el.price)}</Text>
                            </View>
                            <View style={{ height: 60, width: 60, justifyContent: "center", alignItems: "center" }} >
                                <Text style={{ fontFamily: "Poppins-Medium", fontSize: 13, color: "#27ae60" }}>x {el.qty}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <Space />
                <View style={{ height: 100 }}></View>
            </ScrollView>
            <View style={{ position: "absolute", left: 0, bottom: 30, paddingTop: 10, paddingBottom: 10, width: "100%", paddingHorizontal: 15, backgroundColor: "#fafafa" }}>
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
                <Ripple rippleColor="#fff" style={{ height: 40, width: "100%", marginTop: 10, borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center" }} onPress={() => { bs.current.snapTo(0); setShowBottom(true) }}>
                    <Text style={{ fontSize: 14, color: '#fff', fontFamily: "Poppins-SemiBold" }}>Lanjutkan Pembayaran</Text>
                </Ripple>
            </View>
            <BottomSheet
                ref={bs}
                snapPoints={[650, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
        </>
    )
}

const s = StyleSheet.create({

})

export default Checkout