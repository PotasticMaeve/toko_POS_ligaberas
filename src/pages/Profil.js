import React, { useEffect, useContext, useState } from 'react'
import { View } from 'react-native';
import { Text, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import Space from "../components/Space"
import Ripple from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']

const Profil = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [customerNama, setCustomerNama] = useState("")
    const [role, setRole] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const displayNama = () => {
        setIsLoading(true)
        AsyncStorage.getItem("customerUsername").then(res => {
            let username = JSON.parse(res)
            if (username !== null) {
                axios.get(`${backendURL}/api/v1/customer/?username=${username}`)
                    .then(res => {
                        if (res.data.data.is_admin) {
                            setCustomerNama(res.data.data.username)
                            setRole("Pegawai")
                        } else {
                            setCustomerNama(res.data.data.nama);
                            setRole("Pelanggan")
                        }
                        setIsLoading(false)
                    })
            }
        })
    }

    const updateNama = () => {
        displayNama()
    }

    useEffect(() => {
        displayNama()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }}>Profil</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 15, backgroundColor: "#fafafa" }} showsVerticalScrollIndicator={false}>
                <View style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: '#eaeaea',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: .5,
                    shadowRadius: 1,
                    elevation: 3,
                }}>
                    <View style={{ height: 80, width: 80, borderRadius: 100, overflow: "hidden" }}>
                        <Image source={require("../../assets/images/profile.png")} resizeMode="cover" style={{ height: "100%", width: "100%" }} />
                    </View>
                </View>
                <View style={{ paddingVertical: 10, marginBottom: 20 }}>
                    {isLoading ? (
                        <>
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 5,
                                    width: "40%",
                                    height: 15,
                                    alignSelf: "center",
                                    borderRadius: 5
                                }}
                            />
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 7,
                                    width: "25%",
                                    height: 15,
                                    alignSelf: "center",
                                    borderRadius: 5
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={{ color: "#6b705c", fontFamily: "Poppins-SemiBold", textAlign: "center", textTransform: "capitalize" }}>{customerNama}</Text>
                            <Text style={{ color: "#6b705c", fontFamily: "Poppins-Medium", textAlign: "center", fontSize: 12 }}>{role}</Text>
                        </>
                    )}
                </View>
                <Ripple
                    rippleColor="#fff"
                    style={{
                        width: "90%",
                        height: 60,
                        backgroundColor: "#fafafa",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        paddingHorizontal: 10,
                        shadowColor: '#eaeaea',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                        elevation: 2,
                        paddingVertical: 10,
                        marginHorizontal: 15,
                        flexDirection: "row"
                    }}
                    onPress={() => Actions.PersonalInfo({ updateNama: updateNama })}
                >
                    <View style={{ height: "100%", width: 40, borderRadius: 5, backgroundColor: '#f3a337', justifyContent: "center", alignItems: "center" }}>
                        <FontAwesome5 name={"user-lock"} size={18} color='#fff' />
                    </View>
                    <View style={{ height: "100%", alignItems: "center", marginLeft: 15, flexDirection: 'row', width: 240 }}>
                        <Text style={{ color: "#6b705c", fontFamily: "Poppins-Medium", textAlign: "center", fontSize: 13 }}>Atur Personal Info</Text>
                        <FontAwesome5 name={"angle-right"} size={22} color='#f3a337' style={{ position: "absolute", right: 0, bottom: 10 }} />
                    </View>
                </Ripple>
                <Ripple
                    rippleColor="#fff"
                    style={{
                        width: "90%",
                        height: 60,
                        backgroundColor: "#fafafa",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        paddingHorizontal: 10,
                        shadowColor: '#eaeaea',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                        elevation: 2,
                        paddingVertical: 10,
                        marginHorizontal: 15,
                        flexDirection: "row"
                    }}
                    onPress={() => Actions.AlamatPengiriman()}
                >
                    <View style={{ height: "100%", width: 40, borderRadius: 5, backgroundColor: '#f3a337', justifyContent: "center", alignItems: "center" }}>
                        <FontAwesome5 name={"truck"} size={18} color='#fff' />
                    </View>
                    <View style={{ height: "100%", alignItems: "center", marginLeft: 15, flexDirection: 'row', width: 240 }}>
                        <Text style={{ color: "#6b705c", fontFamily: "Poppins-Medium", textAlign: "center", fontSize: 13 }}>Atur Alamat Pengiriman</Text>
                        <FontAwesome5 name={"angle-right"} size={22} color='#f3a337' style={{ position: "absolute", right: 0, bottom: 10 }} />
                    </View>
                </Ripple>
                <Ripple
                    rippleColor="#fff"
                    style={{
                        width: "90%",
                        height: 60,
                        backgroundColor: "#fafafa",
                        borderRadius: 10,
                        marginTop: 10,
                        alignItems: "center",
                        paddingHorizontal: 10,
                        shadowColor: '#eaeaea',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                        elevation: 2,
                        paddingVertical: 10,
                        marginHorizontal: 15,
                        flexDirection: "row"
                    }}
                    onPress={() => Actions.Pembayaran()}
                >
                    <View style={{ height: "100%", width: 40, borderRadius: 5, backgroundColor: '#f3a337', justifyContent: "center", alignItems: "center" }}>
                        <FontAwesome5 name={"credit-card"} size={18} color='#fff' />
                    </View>
                    <View style={{ height: "100%", alignItems: "center", marginLeft: 15, flexDirection: 'row', width: 240 }}>
                        <Text style={{ color: "#6b705c", fontFamily: "Poppins-Medium", textAlign: "center", fontSize: 13 }}>Atur Rekening Pembayaran</Text>
                        <FontAwesome5 name={"angle-right"} size={22} color='#f3a337' style={{ position: "absolute", right: 0, bottom: 10 }} />
                    </View>
                </Ripple>
                <Space />
            </ScrollView >
        </>
    )
}

export default Profil