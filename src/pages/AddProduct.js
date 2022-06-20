import React, { useContext, useEffect, useState, useRef } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, Keyboard, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { MainContext } from '../context/MainContext';
import BottomSheet from "react-native-gesture-bottom-sheet";
import Icons from 'react-native-vector-icons/Ionicons'
import Ripple from 'react-native-material-ripple';
import Space from '../components/Space';
import { Actions } from 'react-native-router-flux';
import SelectDropdown from 'react-native-select-dropdown'
import RNFetchBlob from 'rn-fetch-blob';
import { toast } from '../Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colorHeader = ['#f3a337', '#eb8937']

const AddProduct = (props) => {
    const bs = useRef(null)
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [dataSupplier, setDataSupplier] = useState([])
    const [dataCategory, setDataCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [supplierID, setSupplierID] = useState(0)
    const [CategoryID, setCategoryID] = useState(0)
    const [namaBarang, setNamaBarang] = useState("")
    const [harga, setHarga] = useState("")
    const [qty, setQty] = useState(0)
    const [deskripsi, setDeskripsi] = useState("")
    const [photo, setPhoto] = useState("")
    const [editNama, setEditNama] = useState(false)
    const [editHarga, setEditHarga] = useState(false)
    const [editQty, setEditQty] = useState(false)
    const [editDeskripsi, setEditDeskripsi] = useState(false)
    const [imageSelected, setImageSelected] = useState(false)
    const [uri, setUri] = useState(null)
    const [pic, setPic] = useState(null)
    const [imgName, setImgName] = useState("")
    const [uploadTime, setUploadTime] = useState(false)

    const getSupplier = () => {
        axios.get(`${backendURL}/api/v1/supplier/`)
            .then(res => {
                if (res.status === 200) {
                    let data = res.data.data
                    setDataSupplier(data)
                }
            })
    }

    const getCategory = () => {
        axios.get(`${backendURL}/api/v1/product_category/`)
            .then(res => {
                if (res.status === 200) {
                    let data = res.data.data
                    setDataCategory(data)
                }
            })
    }

    const changeNamaBarang = (text) => {
        if (text !== "") {
            setEditNama(true)
            setNamaBarang(text)
        } else {
            setNamaBarang("")
            setEditNama(false)
        }
    }

    const changeHarga = (text) => {
        if (text !== "") {
            setEditHarga(true)
            setHarga(text)
        } else {
            setHarga("")
            setEditHarga(false)
        }
    }

    const changeQty = (text) => {
        if (text !== "") {
            setEditQty(true)
            setQty(text)
        } else {
            setQty("")
            setEditQty(false)
        }
    }

    const changeDeskripsi = (text) => {
        if (text !== "") {
            setEditDeskripsi(true)
            setDeskripsi(text)
        } else {
            setDeskripsi("")
            setEditDeskripsi(false)
        }
    }

    const clearNama = () => {
        setNamaBarang("")
        setEditNama(false)
    }

    const clearHarga = () => {
        setHarga("")
        setEditHarga(false)
    }

    const clearQty = () => {
        setQty("")
        setEditQty(false)
    }

    const clearDeskripsi = () => {
        setDeskripsi("")
        setEditDeskripsi(false)
    }

    const pickPicture = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            includeBase64: true,
            cropping: true,
        }).then(image => {
            let source = image.path.split("/")
            let target_name = source[source.length - 1]
            setPic(image.data)
            setUri(image.path);
            setImgName(target_name);
            setImageSelected(true)
            setUploadTime(true)
            bs.current.close()
        });
    };

    const uploadImg = () => {
        RNFetchBlob.fetch(
            'POST',
            'http://claudiafelicia.com:7002/upload',
            {
                'Content-Type': 'multipart/form-data',
            },
            [
                { name: 'file', filename: imgName, data: pic },
            ],
        )
        .then(response => response.json())
        .then((resp) => {
            setPhoto(resp.filepath);
            toast("Upload Foto Berhasil", "success")
            setUploadTime(false)
        })
    }

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            includeBase64: true,
            cropping: true,
        }).then(image => {
            let source = image.path.split("/")
            let target_name = source[source.length - 1]
            setPic(image.data)
            setUri(image.path);
            setImgName(target_name);
            setImageSelected(true)
            setUploadTime(true)
            bs.current.close()
        });
    };

    const saveProduct = () => {
        let data = {
            nama: namaBarang,
            harga: harga,
            qty: qty,
            deskripsi: deskripsi,
            photo: photo,
            kategori: CategoryID,
            supplier: supplierID
        }
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                if (supplierID !== 0 && CategoryID !== 0 && namaBarang !== "" && harga !== "" && qty !== 0 && deskripsi !== "") {
                    setIsLoading(true)
                    Keyboard.dismiss()
                    axios.post(`${backendURL}/api/v1/product/`, data, key)
                        .then(() => {
                            props.getAfterAdd && props.getAfterAdd()
                            Actions.pop()
                            toast("Produk Berhasil Ditambahkan", "success")
                            setIsLoading(false)
                            setNamaBarang("")
                            setHarga("")
                            setQty(0)
                            setPhoto("")
                            setDeskripsi("")
                            setUri(null)
                            setPic(null)
                            setImgName("")
                            setCategoryID(0)
                            setSupplierID(0)
                        }).catch((err) => {
                            toast("Produk Gagal Ditambahkan", "danger")
                            setIsLoading(false)
                        })
                } else {
                    toast("Form Wajib Diisi", "info")
                    setIsLoading(false)
                }
            }
        })
    }

    useEffect(() => {
        getSupplier()
        getCategory()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Tambah Produk</Text>
            </LinearGradient>
            <ScrollView style={{
                paddingHorizontal: 20,
                paddingTop: 15,
                height: "100%",
            }}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Supplier</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <SelectDropdown
                                data={dataSupplier.map(el => el.nama)}
                                onSelect={(selectedItem, index) => {
                                    dataSupplier.map(el => {
                                        if (el.nama === selectedItem) {
                                            setSupplierID(el.id);
                                        }
                                    })
                                    return selectedItem
                                }}
                                defaultButtonText={"-- Pilih Supplier --"}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                                buttonStyle={{
                                    width: "100%",
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
                            />
                        </SafeAreaView>
                    </View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Kategori</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <SelectDropdown
                                data={dataCategory.map(el => el.nama)}
                                onSelect={(selectedItem, index) => {
                                    dataCategory.map(el => {
                                        if (el.nama === selectedItem) {
                                            setCategoryID(el.id);
                                        }
                                    })
                                    return selectedItem
                                }}
                                defaultButtonText={"-- Pilih Kategori --"}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                                buttonStyle={{
                                    width: "100%",
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
                            />
                        </SafeAreaView>
                    </View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nama Produk</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <TextInput
                                placeholder="Beras Ramos"
                                style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                spellCheck={false}
                                value={namaBarang}
                                onChangeText={changeNamaBarang}
                                autoCorrect={false}
                            />
                            {editNama && (
                                <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8, position: "absolute", right: 0, bottom: 10 }} onPress={() => clearNama()} />
                            )}
                        </SafeAreaView>
                    </View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Harga Satuan</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <TextInput
                                placeholder="10000"
                                style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                spellCheck={false}
                                autoCorrect={false}
                                onChangeText={changeHarga}
                                value={harga}
                                keyboardType={'phone-pad'}
                            />
                            {editHarga && (
                                <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8, position: "absolute", right: 0, bottom: 10 }} onPress={() => clearHarga()} />
                            )}
                        </SafeAreaView>
                    </View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Jumlah</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <TextInput
                                placeholder="50"
                                style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                spellCheck={false}
                                autoCorrect={false}
                                value={`${qty}`}
                                onChangeText={changeQty}
                                keyboardType={'phone-pad'}
                            />
                            {editQty && (
                                <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8, position: "absolute", right: 0, bottom: 10 }} onPress={() => clearQty()} />
                            )}
                        </SafeAreaView>
                    </View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Deskripsi</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <TextInput
                                placeholder="Deskripsi Produk"
                                style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                spellCheck={false}
                                autoCorrect={false}
                                onChangeText={changeDeskripsi}
                                value={deskripsi}
                            />
                            {editDeskripsi && (
                                <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8, position: "absolute", right: 0, bottom: 10 }} onPress={() => clearDeskripsi()} />
                            )}
                        </SafeAreaView>
                    </View>
                    {imageSelected ? (
                        <>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Foto Produk</Text>
                            <TouchableOpacity onPress={() => bs.current.show()}>
                                <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                    }}
                                    source={{ uri: uri }}
                                />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={{ height: 70, width: "100%", backgroundColor: "#FCE6C6", borderRadius: 5, marginTop: 5, justifyContent: "center", alignItems: "center", borderStyle: "dashed", borderWidth: 1, borderColor: "#eb8937" }}
                            onPress={() => bs.current.show()}
                        >
                            <FontAwesome5 name={"images"} size={27} color='#eb8937' />
                            <Text style={{ fontSize: 13, color: "#eb8937", fontFamily: "Poppins-Medium" }}>Tambah Foto</Text>
                        </TouchableOpacity>
                    )}
                    {uploadTime ? (
                        <Ripple
                            rippleColor="#fff"
                            style={{ height: 40, width: "100%", borderRadius: 10, backgroundColor: '#27ae60', justifyContent: "center", alignItems: "center", marginTop: 20 }}
                            onPress={() => uploadImg()}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Upload Foto</Text>
                            )}
                        </Ripple>
                    ) : (
                        <Ripple
                            rippleColor="#fff"
                            style={{ height: 40, width: "100%", borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center", marginTop: 20 }}
                            onPress={() => saveProduct()}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Simpan</Text>
                            )}
                        </Ripple>
                    )}
                    <Space height={250} />
                </View>
            </ScrollView>
            <SafeAreaView style={s.container}>
                <BottomSheet hasDraggableIcon ref={bs} height={150}>
                    <View style={{
                        paddingVertical: 20,
                        paddingHorizontal: 10,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flex: 1
                    }}>
                        <Ripple
                            rippleColor="#fff"
                            style={s.boxUpload}
                            onPress={pickPicture}
                        >
                            <FontAwesome5 name={"image"} size={50} color='#aaa' />
                            <Text style={{ fontSize: 13, color: "#aaa", fontFamily: "Poppins-Medium" }}>Galeri</Text>
                        </Ripple>
                        <Ripple
                            rippleColor="#fff"
                            style={s.boxUpload}
                            onPress={openCamera}
                        >
                            <Icons name={"camera"} size={50} color='#aaa' />
                            <Text style={{ fontSize: 13, color: "#aaa", fontFamily: "Poppins-Medium" }}>Kamera</Text>
                        </Ripple>
                    </View>
                </BottomSheet>
            </SafeAreaView>
        </>
    )
}

const s = StyleSheet.create({
    boxUpload: {
        height: "100%",
        width: "45%",
        backgroundColor: "#ddd",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#eaeaea',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
    },
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
    buttonAmount: {
        position: "absolute",
        bottom: 20,
        right: 20,
        height: 55,
        width: 55,
        backgroundColor: "#fb8b24",
        borderRadius: 50,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default AddProduct