import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { Text, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import Space from "../components/Space"
import Ripple from 'react-native-material-ripple';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from "../context/MainContext"
import { toast } from "../Helper"
import { Actions } from 'react-native-router-flux';

const colorHeader = ['#f3a337', '#eb8937']

const Profil = (props) => {
    const [profil, setProfil] = useState({})
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)
    const [saveData, setSaveData] = useState(false)

    const detailProfil = () => {
        setIsLoading(true)
        AsyncStorage.getItem("customerUsername").then(value => {
            if (value !== null) {
                let username = JSON.parse(value)
                axios.get(`${backendURL}/api/v1/customer/?username=${username}`)
                    .then((res) => {
                        setProfil(res.data.data);
                        setIsLoading(false)
                    })
                    .catch((err) => {
                        alert("Gagal Memuat Data Profil")
                    })
            }
        })
    }

    const saveProfil = () => {
        setSaveData(true)
        let data = profil
        let payloadUpdate = {
            ...data,
            nama: profil.nama,
            gender: profil.gender,
            phone: profil.phone,
            alamat: profil.alamat
        }

        let body = JSON.stringify(payloadUpdate)
        axios
            .put(`${backendURL}/api/v1/customer/${profil.customer_id}/`, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                let nama = res.data.nama
                let gender = res.data.gender
                let phone = res.data.phone
                let alamat = res.data.alamat
                toast("Berhasil Menyimpan Profil", "success")
                setSaveData(false)
                setProfil({ ...profil, nama: nama, gender: gender, phone: phone, alamat: alamat });
                props.ResponsiveUpdateProfil && props.ResponsiveUpdateProfil()
            })
            .catch((err) => {
                toast("Gagal Menyimpan Data Profil", "danger")
            });
    }

    useEffect(() => {
        detailProfil()
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
                    <Text style={{ color: "#6b705c", fontFamily: "Poppins-SemiBold", textAlign: "center" }}>Liliana Chisa Mikusachi</Text>
                    <Text style={{ color: "#6b705c", fontFamily: "Poppins-Medium", textAlign: "center", fontSize: 12 }}>Pelanggan</Text>
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
                    onPress={() => Actions.PersonalInfo()}
                >
                    <View style={{ height: "100%", width: 40, borderRadius: 5, backgroundColor: '#f3a337', justifyContent: "center", alignItems: "center" }}>
                        <FontAwesome5 name={"user-lock"} size={18} color='#fff' />
                    </View>
                    <View style={{ height: "100%", justifyContent: "space-between", alignItems: "center", marginLeft: 15, flexDirection: 'row', width: 240 }}>
                        <Text style={{ color: "#6b705c", fontFamily: "Poppins-Medium", textAlign: "center", fontSize: 13 }}>Atur Personal Info</Text>
                        <FontAwesome5 name={"angle-right"} size={22} color='#f3a337' />
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
                    <View style={{ height: "100%", justifyContent: "space-between", alignItems: "center", marginLeft: 15, flexDirection: 'row', width: 240 }}>
                        <Text style={{ color: "#6b705c", fontFamily: "Poppins-Medium", textAlign: "center", fontSize: 13 }}>Atur Alamat Pengiriman</Text>
                        <FontAwesome5 name={"angle-right"} size={22} color='#f3a337' />
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
                    <View style={{ height: "100%", justifyContent: "space-between", alignItems: "center", marginLeft: 15, flexDirection: 'row', width: 240 }}>
                        <Text style={{ color: "#6b705c", fontFamily: "Poppins-Medium", textAlign: "center", fontSize: 13 }}>Atur Rekening Pembayaran</Text>
                        <FontAwesome5 name={"angle-right"} size={22} color='#f3a337' />
                    </View>
                </Ripple>
                <Space />
            </ScrollView>
        </>
    )
}

export default Profil