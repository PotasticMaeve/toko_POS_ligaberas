import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { Text, Image, TextInput, ActivityIndicator, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Feather'
import Icons from 'react-native-vector-icons/Fontisto'
import styles from '../stylesheets/Main'
import Space from "../components/Space"
import Ripple from 'react-native-material-ripple';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from "../context/MainContext"
import { toast } from "../Helper"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

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
                alert("Gagal Menyimpan Data Profil")
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
                <View style={{ paddingTop: 20, paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <FontAwesome5 name={"user"} size={20} color='#eb8937' />
                                </View>
                                <TextInput
                                    placeholder="Nama Lengkap"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                    spellCheck={false}
                                    value={profil && profil.nama}
                                    onChangeText={new_text => setProfil({ ...profil, nama: new_text })}
                                    autoCorrect={false}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <Icon name={"smile"} size={20} color='#eb8937' />
                                </View>
                                <TextInput
                                    placeholder="Username"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                    spellCheck={false}
                                    editable={false}
                                    selectTextOnFocus={false}
                                    value={profil && profil.username}
                                    autoCorrect={false}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <FontAwesome5 name={"envelope"} size={20} color='#eb8937' />
                                </View>
                                <TextInput
                                    placeholder="Email"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                    spellCheck={false}
                                    editable={false}
                                    selectTextOnFocus={false}
                                    value={profil && profil.email}
                                    autoCorrect={false}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <Icon name={"phone"} size={20} color='#eb8937' />
                                </View>
                                <TextInput
                                    placeholder="No Telp"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                    spellCheck={false}
                                    value={profil && profil.phone}
                                    onChangeText={new_text => setProfil({ ...profil, phone: new_text })}
                                    autoCorrect={false}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <Icons name={"venus-mars"} size={20} color='#eb8937' />
                                </View>
                                <TextInput
                                    placeholder="Jenis Kelamin"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                    spellCheck={false}
                                    value={profil && profil.gender}
                                    onChangeText={new_text => setProfil({ ...profil, gender: new_text })}
                                    autoCorrect={false}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={s.areaInput}>
                            <SafeAreaView style={s.inputWrap}>
                                <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <Icon name={"home"} size={20} color='#eb8937' />
                                </View>
                                <TextInput
                                    placeholder="Alamat"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "82%" }}
                                    spellCheck={false}
                                    value={profil && profil.alamat}
                                    onChangeText={new_text => setProfil({ ...profil, alamat: new_text })}
                                    autoCorrect={false}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                    {isLoading ? (
                        <></>
                    ) : (
                        <Ripple
                            rippleColor="#fff"
                            style={{ height: 40, width: "100%", marginTop: 10, borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center", marginTop: 30 }}
                            onPress={() => saveProfil()}
                        >
                            {saveData ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>simpan</Text>
                            )}
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
        borderRadius: 10
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
        // paddingHorizontal: 15,
        justifyContent: "space-between",
        paddingVertical: 7
    },
})

export default Profil