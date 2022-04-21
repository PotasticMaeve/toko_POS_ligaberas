import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { Text, Image, TextInput, ActivityIndicator } from 'react-native';
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
            <View style={{ paddingTop: 15, backgroundColor: "#fff", height: "100%" }}>
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
                    <View style={{ height: 100, width: 100, borderRadius: 100, overflow: "hidden" }}>
                        {isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: 100,
                                    borderRadius: 100,
                                    height: 100
                                }}
                            />
                        ) : (
                            <Image source={require("../../assets/images/profile.png")} resizeMode="cover" style={{ height: "100%", width: "100%" }} />
                        )}
                    </View>
                </View>
                <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {isLoading ? (
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 3,
                                        width: 30,
                                        borderRadius: 10,
                                        height: 30
                                    }}
                                />
                            ) : (
                                <FontAwesome5 name={"user"} size={20} color='#eb8937' />
                            )}
                        </View>
                        {isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 10,
                                    width: "65%",
                                    borderRadius: 5,
                                    marginLeft: "5%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <TextInput
                                placeholder="Nama Lengkap"
                                style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                                spellCheck={false}
                                value={profil && profil.nama}
                                onChangeText={new_text => setProfil({ ...profil, nama: new_text })}
                                autoCorrect={false}
                            />

                        )}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {isLoading ? (
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 8,
                                        width: 30,
                                        borderRadius: 10,
                                        height: 30
                                    }}
                                />
                            ) : (
                                <Icon name={"smile"} size={20} color='#eb8937' />
                            )}
                        </View>
                        {isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 15,
                                    width: "30%",
                                    borderRadius: 5,
                                    marginLeft: "5%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <TextInput
                                placeholder="Username"
                                style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                                spellCheck={false}
                                editable={false}
                                selectTextOnFocus={false}
                                value={profil && profil.username}
                                autoCorrect={false}
                            />
                        )}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {isLoading ? (
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 8,
                                        width: 30,
                                        borderRadius: 10,
                                        height: 30
                                    }}
                                />
                            ) : (
                                <FontAwesome5 name={"envelope"} size={20} color='#eb8937' />
                            )}
                        </View>
                        {isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 15,
                                    width: "60%",
                                    borderRadius: 5,
                                    marginLeft: "5%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <TextInput
                                placeholder="Email"
                                style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                                spellCheck={false}
                                editable={false}
                                selectTextOnFocus={false}
                                value={profil && profil.email}
                                autoCorrect={false}
                            />
                        )}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {isLoading ? (
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 8,
                                        width: 30,
                                        borderRadius: 10,
                                        height: 30
                                    }}
                                />
                            ) : (
                                <Icon name={"phone"} size={20} color='#eb8937' />
                            )}
                        </View>
                        {isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 15,
                                    width: "50%",
                                    borderRadius: 5,
                                    marginLeft: "5%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <TextInput
                                placeholder="No Telp"
                                style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                                spellCheck={false}
                                value={profil && profil.phone}
                                onChangeText={new_text => setProfil({ ...profil, phone: new_text })}
                                autoCorrect={false}
                            />
                        )}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {isLoading ? (
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 8,
                                        width: 30,
                                        borderRadius: 10,
                                        height: 30
                                    }}
                                />
                            ) : (
                                <Icons name={"venus-mars"} size={20} color='#eb8937' />
                            )}
                        </View>
                        {isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 15,
                                    width: "45%",
                                    borderRadius: 5,
                                    marginLeft: "5%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <TextInput
                                placeholder="Jenis Kelamin"
                                style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                                spellCheck={false}
                                value={profil && profil.gender}
                                onChangeText={new_text => setProfil({ ...profil, gender: new_text })}
                                autoCorrect={false}
                            />
                        )}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {isLoading ? (
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 8,
                                        width: 30,
                                        borderRadius: 10,
                                        height: 30
                                    }}
                                />
                            ) : (
                                <Icon name={"home"} size={20} color='#eb8937' />
                            )}
                        </View>
                        {isLoading ? (
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    marginTop: 15,
                                    width: "70%",
                                    borderRadius: 5,
                                    marginLeft: "5%",
                                    height: 20
                                }}
                            />
                        ) : (
                            <TextInput
                                placeholder="Alamat"
                                style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                                spellCheck={false}
                                value={profil && profil.alamat}
                                onChangeText={new_text => setProfil({ ...profil, alamat: new_text })}
                                autoCorrect={false}
                            />
                        )}
                    </View>
                    {isLoading ? (
                        <ShimmerPlaceHolder
                            shimmerColors={colorShimmer}
                            style={{
                                marginTop: 20,
                                width: "100%",
                                borderRadius: 5,
                                height: 35
                            }}
                        />
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
            </View>
            <Space />
        </>
    )
}

export default Profil