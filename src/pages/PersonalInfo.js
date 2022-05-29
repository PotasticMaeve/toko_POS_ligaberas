import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { Text, ScrollView, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Feather'
import Icons from 'react-native-vector-icons/FontAwesome'
import styles from '../stylesheets/Main'
import SelectDropdown from 'react-native-select-dropdown'
import Ripple from 'react-native-material-ripple';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from "../context/MainContext"
import { toast } from "../Helper"
import { ActivityIndicator } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { Actions } from 'react-native-router-flux';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']

const PersonalInfo = (props) => {
    const [profil, setProfil] = useState({})
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [role, setRole] = useState("")
    const gender = ["Pria", "Wanita"]

    const detailProfil = () => {
        setIsLoading(true)
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                AsyncStorage.getItem("customerUsername").then(value => {
                    if (value !== null) {
                        let username = JSON.parse(value)
                        axios.get(`${backendURL}/api/v1/customer/?username=${username}`, key)
                            .then((res) => {
                                if (res.data.data.is_admin) {
                                    setRole("Pegawai")
                                } else {
                                    setRole("Pelanggan")
                                }
                                setProfil(res.data.data);
                                setIsLoading(false)
                            })
                            .catch((err) => {
                                toast("Gagal Memuat Data Profil", "danger")
                            })
                    }
                })
            }
        })
    }

    const saveProfil = () => {
        setIsLoading(true)
        let data = profil
        let payloadUpdate = {
            ...data,
            nama: profil.nama,
            gender: profil.gender,
            phone: profil.phone
        }
        if (profil.nama === "" || profil.gender === "" || profil.phone === "") {
            toast("Data Profil Harus Diisi", "danger")
            detailProfil()
            setEdit(false)
        } else {
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
                    toast("Berhasil Menyimpan Profil", "success")
                    setIsLoading(false)
                    setEdit(false)
                    setProfil({ ...profil, nama: nama, gender: gender, phone: phone });
                    props.ResponsiveUpdateProfil && props.ResponsiveUpdateProfil()
                    props.updateNama && props.updateNama()
                })
                .catch((err) => {
                    toast("Gagal Menyimpan Data Profil", "danger")
                });
        }
    }

    useEffect(() => {
        detailProfil()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Personal Info</Text>
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
                <View style={{ paddingTop: 20, paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <FontAwesome5 name={"user"} size={20} color='#eb8937' />
                                </View>
                                {isLoading ? (
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
                                        placeholder="Nama Lengkap"
                                        style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                        spellCheck={false}
                                        value={profil && profil.nama}
                                        onChangeText={new_text => setProfil({ ...profil, nama: new_text })}
                                        editable={edit}
                                        autoCorrect={false}
                                    />
                                )}
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <Icon name={"smile"} size={20} color='#eb8937' />
                                </View>
                                {isLoading ? (
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            height: 20,
                                            width: "30%",
                                            marginLeft: 20,
                                            marginVertical: 14
                                        }}
                                    />
                                ) : (
                                    <TextInput
                                        placeholder="Username"
                                        style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                        spellCheck={false}
                                        editable={false}
                                        selectTextOnFocus={false}
                                        value={profil && profil.username}
                                        autoCorrect={false}
                                    />
                                )}
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <FontAwesome5 name={"envelope"} size={20} color='#eb8937' />
                                </View>
                                {isLoading ? (
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
                                        placeholder="Email"
                                        style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                        spellCheck={false}
                                        editable={false}
                                        selectTextOnFocus={false}
                                        value={profil && profil.email}
                                        autoCorrect={false}
                                    />
                                )}
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <Icon name={"phone"} size={20} color='#eb8937' />
                                </View>
                                {isLoading ? (
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            height: 20,
                                            width: "40%",
                                            marginLeft: 20,
                                            marginVertical: 14
                                        }}
                                    />
                                ) : (
                                    <TextInput
                                        placeholder="No Telp"
                                        style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                        spellCheck={false}
                                        value={profil && profil.phone}
                                        onChangeText={new_text => setProfil({ ...profil, phone: new_text })}
                                        autoCorrect={false}
                                        editable={edit}
                                        keyboardType={'phone-pad'}
                                    />
                                )}
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <Icons name={"venus-mars"} size={20} color='#eb8937' />
                                </View>
                                {isLoading ? (
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            height: 20,
                                            width: "25%",
                                            marginLeft: 20,
                                            marginVertical: 14
                                        }}
                                    />
                                ) : (
                                    <SelectDropdown
                                        data={gender}
                                        onSelect={(selectedItem, index) => {
                                            setProfil({ ...profil, gender: selectedItem })
                                        }}
                                        defaultButtonText={profil.gender ? profil.gender : "-- Pilih Jenis Kelamin --"}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            return item
                                        }}
                                        buttonStyle={{
                                            width: "82%",
                                            backgroundColor: "#eaeaea"
                                        }}
                                        rowTextStyle={{
                                            fontSize: 14,
                                            color: "#595959",
                                            fontFamily: "Poppins-Medium",
                                        }}
                                        buttonTextStyle={{
                                            fontSize: 14,
                                            color: "#595959",
                                            fontFamily: "Poppins-Medium",
                                            textAlign: "left"
                                        }}
                                        disabled={!edit}
                                    />
                                )}
                            </SafeAreaView>
                        </View>
                    </View>
                    {role === "Pegawai" && (
                        <View style={{ flexDirection: "row" }}>
                            <View style={s.areaInput}>
                                <SafeAreaView style={s.inputWrap}>
                                    <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                        <Icon name={"home"} size={20} color='#eb8937' />
                                    </View>
                                    {isLoading ? (
                                        <ShimmerPlaceHolder
                                            shimmerColors={colorShimmer}
                                            style={{
                                                height: 20,
                                                width: "70%",
                                                marginLeft: 20,
                                                marginVertical: 14
                                            }}
                                        />
                                    ) : (
                                        <TextInput
                                            placeholder="Alamat"
                                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                            spellCheck={false}
                                            value={profil && profil.alamat}
                                            onChangeText={new_text => setProfil({ ...profil, alamat: new_text })}
                                            autoCorrect={false}
                                            editable={edit}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                        </View>
                    )}
                    {edit ? (
                        <View style={{ width: "100%", marginTop: 30, flexDirection: "row", justifyContent: "space-between" }}>
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
                                onPress={() => saveProfil()}
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
                            style={{ height: 40, width: "100%", borderRadius: 10, borderColor: '#eb8937', borderWidth: 1, justifyContent: "center", alignItems: "center", marginTop: 30 }}
                            onPress={() => setEdit(true)}
                        >
                            <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>Ubah Data</Text>
                        </Ripple>
                    )}
                </View>
                <View style={{ height: 50 }} />
            </ScrollView>
        </>
    )
}

const s = StyleSheet.create({
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

export default PersonalInfo