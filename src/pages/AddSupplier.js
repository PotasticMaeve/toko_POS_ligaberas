import React, { useContext, useState } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, ActivityIndicator, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import Ripple from 'react-native-material-ripple';
import { MainContext } from '../context/MainContext';
import { toast } from '../Helper';

const colorHeader = ['#f3a337', '#eb8937']

const AddSupplier = (props) => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [nama, setNama] = useState("")
    const [phone, setPhone] = useState("")
    const [alamat, setAlamat] = useState("")
    const [editNama, setEditNama] = useState(false)
    const [editPhone, setEditPhone] = useState(false)
    const [editAlamat, setEditAlamat] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const saveSupplier = () => {
        if (nama !== "" && phone !== "" && alamat !== "") {
            setIsLoading(true)
            Keyboard.dismiss()
            axios.post(`${backendURL}/api/v1/supplier/`, {
                nama: nama,
                phone: phone,
                alamat: alamat                
            }).then(() => {
                props.getAfterAdd && props.getAfterAdd()
                Actions.pop()
                toast("Supplier Berhasil Ditambahkan", "success")
                setIsLoading(false)
                setNama("")
                setPhone("")
                setAlamat("")
            }).catch((err) => {
                toast("Supplier Gagal Ditambahkan", "danger")
                setIsLoading(false)
            })
        } else {
            toast("Form Wajib Diisi", "info")
            setIsLoading(false)
        }
    }

    const changeNamaSupplier = (text) => {
        if (text !== "") {
            setEditNama(true)
            setNama(text)
        } else {
            setNama("")
            setEditNama(false)
        }
    }

    const changePhoneSupplier = (text) => {
        if (text !== "") {
            setEditPhone(true)
            setPhone(text)
        } else {
            setPhone("")
            setEditPhone(false)
        }
    }

    const changeAlamatSupplier = (text) => {
        if (text !== "") {
            setEditAlamat(true)
            setAlamat(text)
        } else {
            setAlamat("")
            setEditAlamat(false)
        }
    }

    const clearNama = () => {
        setNama("")
        setEditNama(false)
    }

    const clearPhone = () => {
        setPhone("")
        setEditPhone(false)
    }

    const clearAlamat = () => {
        setAlamat("")
        setEditAlamat(false)
    }

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Tambah Supplier</Text>
            </LinearGradient>
            <View style={{
                paddingHorizontal: 20,
                marginVertical: 10
            }}>
                <View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nama Supplier</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <TextInput
                                placeholder="Toko Sejahtera"
                                style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                spellCheck={false}
                                autoCorrect={false}
                                value={nama}
                                onChangeText={changeNamaSupplier}
                            />
                            {editNama && (
                                <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8, position: "absolute", right: 0, bottom: 10 }} onPress={() => clearNama()} />
                            )}
                        </SafeAreaView>
                    </View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nomor Telepon</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <TextInput
                                placeholder="082118776231"
                                style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                spellCheck={false}
                                value={phone}
                                autoCorrect={false}
                                onChangeText={changePhoneSupplier}
                                keyboardType={'phone-pad'}
                            />
                            {editPhone && (
                                <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8, position: "absolute", right: 0, bottom: 10 }} onPress={() => clearPhone()} />
                            )}
                        </SafeAreaView>
                    </View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Alamat</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <TextInput
                                placeholder="alamat"
                                style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                spellCheck={false}
                                autoCorrect={false}
                                onChangeText={changeAlamatSupplier}
                                value={alamat}
                            />
                            {editAlamat && (
                                <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8, position: "absolute", right: 0, bottom: 10 }} onPress={() => clearAlamat()} />
                            )}
                        </SafeAreaView>
                    </View>
                    <Ripple
                        rippleColor="#fff"
                        style={{ height: 40, width: "100%", borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center", marginTop: 10 }}
                        onPress={() => saveSupplier()}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Simpan Data</Text>
                        )}
                    </Ripple>
                </View>
            </View>
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
})

export default AddSupplier