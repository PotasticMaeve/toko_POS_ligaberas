import React, { useContext, useEffect, useState, useRef } from 'react'
import { View } from 'react-native';
import { Text, ScrollView, StyleSheet, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import styles from '../stylesheets/Main'
import Ripple from 'react-native-material-ripple';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LottieView from 'lottie-react-native';
import axios from 'axios';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { CreditCardInput } from "react-native-credit-card-input";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from "../context/MainContext"
import { toast } from "../Helper"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { Actions } from 'react-native-router-flux';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']
const { height } = Dimensions.get("screen")
const Pembayaran = (props) => {
    const bs = useRef(null)
    const bs2 = useRef(null)
    const [data, setData] = useState([])
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingForm, setIsLoadingForm] = useState(false)
    const [creditData, setCreditData] = useState({})
    const [validatePembayaran, setValidatePembayaran] = useState(false)
    const [emptyData, setEmptyData] = useState(false)
    const [singleCardData, setSingleCardData] = useState({})
    const [edit, setEdit] = useState(false)
    const [paymentID, setPaymentID] = useState(0)

    const detailPembayaran = () => {
        setIsLoading(true)
        AsyncStorage.getItem("customerID").then(value => {
            let customer_id = JSON.parse(value)
            if (customer_id !== null) {
                axios.get(`${backendURL}/api/v1/paymentinfo/?customer_id=${customer_id}`)
                    .then((res) => {
                        if (res.data.data.length > 0) {
                            setData(res.data.data)
                        } else {
                            setEmptyData(true)
                        }
                        setIsLoading(false)
                    })
                    .catch((err) => {
                        toast("Gagal Memuat Data Pembayaran", "danger")
                    })
            }
        })
    }

    const saveCard = () => {
        setValidatePembayaran(true)
        if (creditData.values) {
            let number = creditData.values.number.split(" ")
            let expiry = creditData.values.expiry.split("/")
            let data_number = number.join('')
            let data_expiry = expiry.join('')
            if (data_number.split("").length === 12) {
                AsyncStorage.getItem("customerID").then(res => {
                    let customer_id = JSON.parse(res)
                    if (customer_id !== null) {
                        axios
                            .post(`${backendURL}/api/v1/paymentinfo/`, {
                                profile: customer_id,
                                nama_kartu: "mastercard",
                                no_kartu: data_number,
                                nama_nasabah: creditData.values.name,
                                expiry: data_expiry,
                                cvv: creditData.values.cvc
                            })
                            .then((res) => {
                                setValidatePembayaran(false)
                                bs.current.close()
                                toast("Berhasil Menyimpan Kartu", "success")
                                setCreditData({})
                            })
                            .catch((err) => {
                                bs.current.close()
                                setValidatePembayaran(false)
                                toast("Gagal Menyimpan Kartu", "danger")
                            });
                    }
                })
            } else {
                setValidatePembayaran(false)
                bs.current.close()
                setCreditData({})
                toast("Data Kartu Tidak Valid", "danger")
            }
        } else {
            setValidatePembayaran(false)
            bs.current.close()
            setCreditData({})
            toast("Data Kartu Harus Diisi", "danger")
        }
    }

    const _onChange = form => setCreditData(form);

    const displayNoKartu = (number) => {
        let data_num = number.split("")
        return <Text numberOfLines={1} style={{ width: 200, fontFamily: "Poppins-SemiBold", textTransform: "capitalize", fontSize: 12 }}>&#x2022; &#x2022; &#x2022; &#x2022;  &#x2022; &#x2022; &#x2022; &#x2022;  {data_num[8]} {data_num[9]} {data_num[10]} {data_num[11]}</Text>
    }

    const openDetailCard = (payment_id) => {
        bs2.current.show()
        setPaymentID(payment_id)
        setIsLoadingForm(true)
        axios.get(`${backendURL}/api/v1/paymentinfo/${payment_id}/`)
            .then(res => {
                setSingleCardData(res.data);
                setIsLoadingForm(false)
            })
    }

    const updateSingleCard = () => {
        setIsLoading(true)
        let data = singleCardData
        let payloadUpdate = {
            ...data,
            nama_kartu: singleCardData.nama_kartu,
            no_kartu: singleCardData.no_kartu,
            nama_nasabah: singleCardData.nama_nasabah,
            expiry: singleCardData.expiry,
            cvv: singleCardData.cvv
        }
        if (singleCardData.nama_kartu === "" || singleCardData.no_kartu === "" || singleCardData.nama_nasabah === "" || singleCardData.expiry === "" || singleCardData.cvv === "") {
            toast("Data Kartu Harus Diisi", "danger")
            detailPembayaran()
            setEdit(false)
        } else {
            let body = JSON.stringify(payloadUpdate)
            axios
                .put(`${backendURL}/api/v1/paymentinfo/${paymentID}/`, body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    setSingleCardData(res.data);
                    setIsLoading(false)
                    bs2.current.close()
                    toast("Berhasil Merubah Data Kartu", "success")
                    setEdit(false)
                    detailPembayaran()
                })
                .catch((err) => {
                    toast("Gagal Merubah Data Kartu", "danger")
                });
        }
    }

    useEffect(() => {
        detailPembayaran()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Daftar Kartu</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 15, backgroundColor: "#fafafa", height: "100%" }} showsVerticalScrollIndicator={false}>
                {emptyData ? (
                    <>
                        <LottieView
                            source={require('../animations/empty-card.json')}
                            autoPlay
                            loop
                            style={{
                                marginTop: 80,
                                height: height / 2.6,
                                flex: 1,
                                alignSelf: "center"
                            }}
                        />
                        <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: "-3%" }}>Belum Ada Kartu Terdaftar</Text>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Ripple
                                rippleColor="#fff"
                                style={{ height: 40, width: "60%", borderRadius: 10, backgroundColor: "#eb8937", justifyContent: "center", alignItems: "center", marginTop: 10 }}
                                onPress={() => bs.current.show()}
                            >
                                <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Tambah Kartu</Text>
                            </Ripple>
                        </View>
                    </>
                ) : (
                    <>
                        {isLoading ? (
                            <>
                                <View style={{ marginTop: 1, marginHorizontal: 10 }}>
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderColor: "#bbb", borderWidth: .5, borderRadius: 10 }}>
                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", paddingVertical: 7 }} onPress={() => openDetailCard(el.payment_id)}>
                                            <ShimmerPlaceHolder
                                                shimmerColors={colorShimmer}
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                }}
                                            />
                                            <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                                <ShimmerPlaceHolder
                                                    shimmerColors={colorShimmer}
                                                    style={{
                                                        width: "35%",
                                                    }}
                                                />
                                                <ShimmerPlaceHolder
                                                    shimmerColors={colorShimmer}
                                                    style={{
                                                        width: "70%",
                                                        marginTop: 10,
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        ) : (
                            data.map((el, i) => (
                                <View style={{ marginTop: 1, marginHorizontal: 10 }} key={i}>
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderColor: "#bbb", borderWidth: .5, borderRadius: 10 }}>
                                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", paddingVertical: 7 }} onPress={() => openDetailCard(el.payment_id)}>
                                            <Image
                                                source={require("../../assets/images/mastercard-logo.png")}
                                                style={{ height: 50, width: 50 }}
                                                resizeMode="contain"
                                            />
                                            <View style={{ marginLeft: 15, flexDirection: "column" }}>
                                                <Text numberOfLines={1} style={{ width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12, textTransform: "capitalize" }}>{el.nama_kartu}</Text>
                                                <Text numberOfLines={1} style={{ width: 200, fontFamily: "Poppins-Medium", textTransform: "capitalize", fontSize: 12, textTransform: "capitalize" }}>{displayNoKartu(el.no_kartu)}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )}
                    </>
                )}
            </ScrollView>
            <SafeAreaView style={s.container}>
                <BottomSheet hasDraggableIcon ref={bs} height={450}>
                    <View style={{
                        padding: 20,
                        paddingTop: 20,
                    }}>
                        <Text style={{ fontSize: 16, color: "#000", textAlign: "center", fontFamily: "Poppins-SemiBold", marginBottom: 10 }}>Detail Kartu</Text>
                        <CreditCardInput
                            autoFocus
                            requiresName
                            requiresCVC
                            placeholderColor="#bbb"
                            onChange={_onChange}
                            validColor="#27ae60"
                            placeholderColor="#ccc"
                            placeholders={{ number: "2145 0943 2176", expiry: "04/23", cvc: "542", name: "John Doe" }}
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
                            onPress={() => saveCard()}
                        >
                            {validatePembayaran ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={{ fontFamily: "Poppins-SemiBold", color: "#fff", textTransform: "capitalize", fontSize: 13.5, marginTop: 5 }}>Simpan</Text>
                            )}
                        </Ripple>
                    </View>
                </BottomSheet>
            </SafeAreaView>
            <SafeAreaView style={s.container}>
                <BottomSheet hasDraggableIcon ref={bs2} height={500}>
                    <View style={{
                        padding: 20,
                    }}>
                        <Text style={{ fontSize: 16, color: "#000", textAlign: "center", fontFamily: "Poppins-SemiBold", marginBottom: 10 }}>Detail Kartu</Text>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold" }}>Nama Nasabah</Text>
                            <View style={s.areaInput}>
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
                                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                            spellCheck={false}
                                            value={singleCardData.nama_nasabah}
                                            onChangeText={new_text => setSingleCardData({ ...singleCardData, nama_nasabah: new_text })}
                                            autoCorrect={false}
                                            editable={edit}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold" }}>Nomor Kartu</Text>
                            <View style={s.areaInput}>
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
                                            placeholder="214434210021"
                                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                            spellCheck={false}
                                            value={singleCardData.no_kartu}
                                            onChangeText={new_text => setSingleCardData({ ...singleCardData, no_kartu: new_text })}
                                            autoCorrect={false}
                                            editable={edit}
                                            keyboardType={'phone-pad'}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold" }}>Expiry</Text>
                            <View style={s.areaInput}>
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
                                            placeholder="0423"
                                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                            spellCheck={false}
                                            value={singleCardData.expiry}
                                            onChangeText={new_text => setSingleCardData({ ...singleCardData, expiry: new_text })}
                                            autoCorrect={false}
                                            editable={edit}
                                            keyboardType={'phone-pad'}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold" }}>CVV</Text>
                            <View style={s.areaInput}>
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
                                            placeholder="452"
                                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                            spellCheck={false}
                                            value={singleCardData.cvv}
                                            onChangeText={new_text => setSingleCardData({ ...singleCardData, cvv: new_text })}
                                            autoCorrect={false}
                                            editable={edit}
                                            keyboardType={'phone-pad'}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            {edit ? (
                                <View style={{ width: "100%", marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                    <Ripple
                                        rippleColor="#fff"
                                        style={{ height: 40, width: "48%", borderRadius: 10, borderColor: '#eb8937', borderWidth: 1, justifyContent: "center", alignItems: "center" }}
                                        onPress={() => setEdit(false)}
                                    >
                                        <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>Tutup</Text>
                                    </Ripple>
                                    <Ripple
                                        rippleColor="#fff"
                                        style={{ height: 40, width: "48%", borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center" }}
                                        onPress={() => updateSingleCard()}
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
                                    onPress={() => setEdit(true)}
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputWrap: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 3,
        backgroundColor: "#eaeaea",
        width: "100%",
        borderRadius: 10,
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
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 7
    },
})



export default Pembayaran