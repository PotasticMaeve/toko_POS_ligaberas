import React, { useContext, useEffect, useState, useRef } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Dimensions, Text, SafeAreaView, View, ScrollView, Image, ActivityIndicator, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import Icons from 'react-native-vector-icons/Ionicons'
import Ripple from 'react-native-material-ripple';
import Space from '../components/Space';
import ImagePicker from 'react-native-image-crop-picker';
import { convertToIDR, toast } from "../Helper"
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';
import BottomSheet from "react-native-gesture-bottom-sheet";
import ShimmerProduct from '../components/ShimmerProduct';
import * as OpenAnything from "react-native-openanything"
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { Actions } from 'react-native-router-flux';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { setRefreshToken } from "../Helper"

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']
const { height } = Dimensions.get("screen")
const Products = () => {
    const bs = useRef(null)
    const bs2 = useRef(null)
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingForm, setIsLoadingForm] = useState(false)
    const [data, setData] = useState([])
    const [input, setInput] = useState("")
    const [updateIDSupplier, setUpdateIDSupplier] = useState(0)
    const [updateIDCategory, setUpdateIDCategory] = useState(0)
    const [dataDisplay, setDataDisplay] = useState([])
    const [dataSupplier, setDataSupplier] = useState([])
    const [dataCategory, setDataCategory] = useState([])
    const [editing, setEditing] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [singleData, setSingleData] = useState({})
    const [modalShow, setModalShow] = useState(false)
    const [showEmpty, setShowEmpty] = useState(false)
    const [uri, setUri] = useState(null)
    const [pic, setPic] = useState(null)
    const [imgName, setImgName] = useState("")
    const [imageSelected, setImageSelected] = useState(false)
    const [idProduk, setIdProduk] = useState(0)

    const getData = () => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/product/`)
            .then((res) => {
                if (res.data.status === 200) {
                    setData(res.data.data);
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setRefreshToken()
                }
                toast("Gagal Memuat Data Produk", "danger")
            })
    }

    const getDataById = (id) => {
        setIsLoadingForm(true)
        axios.get(`${backendURL}/api/v1/product/${id}/`)
            .then((res) => {
                if (res.status === 200) {
                    let id_supplier = res.data.data[0].supplier.id
                    let id_category = res.data.data[0].kategori.id
                    setSingleData(res.data.data[0]);
                    setIsLoadingForm(false)
                    setUpdateIDSupplier(id_supplier)
                    setUpdateIDCategory(id_category)
                }
            })
            .catch((err) => {
                toast("Gagal Memuat Data Produk", "danger")
            })
    }

    const onChangeText = (search) => {
        if (search !== "") {
            setEditing(true)
            setInput(search)
        } else {
            setInput("")
            setEditing(false)
        }
    }

    const getSearchProduct = () => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/product/?search=${input}`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.data.length > 0) {
                        setDataDisplay(res.data.data);
                    } else {
                        setShowEmpty(true)
                    }
                    setIsLoading(false)
                }
            })
    }

    const clearMode = () => {
        setInput("")
        setEditing(false)
        setDataDisplay([])
        setShowEmpty(false)
        getData()
    }

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

    const showDetailProduct = (id) => {
        bs.current.show()
        getDataById(id)
    }

    const saveProduct = () => {
        setIsLoading(true)
        let payloadUpdate = {
            nama: singleData.nama_barang,
            harga: singleData.harga,
            qty: singleData.qty,
            deskripsi: singleData.deskripsi,
            supplier: updateIDSupplier,
            kategori: updateIDCategory
        }
        if (singleData.nama_barang === "" || singleData.harga === "" || singleData.qty === "" || singleData.deskripsi === "") {
            toast("Data Produk Harus Diisi", "danger")
            getDataById(singleData.id)
            setEditForm(false)
        } else {
            let body = JSON.stringify(payloadUpdate)
            axios
                .patch(`${backendURL}/api/v1/product/${singleData.id}/`, body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    toast("Berhasil Menyimpan Data Produk", "success")
                    setIsLoading(false)
                    setEditForm(false)
                    setInput("")
                    setDataDisplay([])
                    getData()
                    bs.current.close()
                })
                .catch((err) => {
                    toast("Gagal Menyimpan Data Produk", "danger")
                    setIsLoading(false)
                });
        }
    }

    const print = () => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                axios.get(`${backendURL}/report/product_download`, key)
                    .then(res => {
                        if (res.status === 200) {
                            let path = res.data.url
                            OpenAnything.Pdf(path)
                        }
                    })
                    .catch(err => {
                        toast("Gagal Mencetak Data Produk", "danger")
                    })
            }
        })
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
            bs2.current.close()
        });
    };

    const uploadImage = async () => {
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
                toast("Ubah Foto Berhasil", "success")
                setIsLoading(true)
                let body = {
                    nama: singleData.nama_barang,
                    harga: singleData.harga,
                    qty: singleData.qty,
                    deskripsi: singleData.deskripsi,
                    photo: resp.filepath,
                    kategori: singleData.kategori.id,
                    supplier: singleData.supplier.id
                }
                AsyncStorage.getItem("tokenAccess").then(token => {
                    if (token !== null) {
                        let tokenAccess = JSON.parse(token)
                        let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                        axios.patch(`${backendURL}/api/v1/product/${idProduk}/`, body, key)
                            .then(res => {
                                setImageSelected(false)
                                setIdProduk(0)
                                setImgName("")
                                setUri(null)
                                setPic(null)
                                setInput("")
                                setDataDisplay([])
                                getData()
                            }).catch((err) => {
                                toast("Gagal Merubah Foto", "danger")
                                setIsLoading(false)
                            })
                    }
                })
            })
    };

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
            bs2.current.close()
        });
    };

    const removeProduct = (id) => {
        setModalShow(true)
        setIdProduk(id)
    }

    const confirmRemoveProduct = () => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            let tokenAccess = JSON.parse(token)
            let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
            if (tokenAccess !== null) {
                axios.delete(`${backendURL}/api/v1/product/${idProduk}/`, key)
                    .then(res => {
                        setModalShow(false)
                        toast("Produk Berhasil Dihapus", "danger")
                        getData()
                        setInput("")
                        setDataDisplay([])
                    })
            }
        })
    }

    const getAfterAdd = () => {
        getData()
    }

    const openImageSelector = (id) => {
        bs2.current.show()
        setIdProduk(id)
        getDataById(id)
    }

    useEffect(() => {
        getCategory()
        getSupplier()
        getData()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Daftar Produk</Text>
            </LinearGradient>
            <ScrollView style={{ paddingVertical: 10, height: "100%", backgroundColor: "#fafafa" }} showsVerticalScrollIndicator={false}>
                <View style={s.areaInput}>
                    <SafeAreaView style={s.inputWrap}>
                        <FontAwesome5 name={"search"} size={16} color='#eb8937' style={{ marginLeft: 8 }} onPress={() => getSearchProduct()} />
                        <TextInput
                            placeholder="Cari produk"
                            style={s.inputComp}
                            spellCheck={false}
                            value={input}
                            autoCorrect={false}
                            onChangeText={onChangeText}
                            onSubmitEditing={() => getSearchProduct()}
                        />
                        {editing && (
                            <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8 }} onPress={() => clearMode()} />
                        )}
                    </SafeAreaView>
                </View>
                <View style={{ paddingTop: 10, paddingHorizontal: 20, justifyContent: "center", alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ height: 30, width: 60, borderColor: "#f5576c", borderWidth: 1, justifyContent: "center", alignItems: "center" }} onPress={() => print()}>
                        <Text style={{ fontSize: 12, color: "#f5576c", textTransform: "uppercase", fontFamily: "Poppins-SemiBold" }}>cetak</Text>
                    </TouchableOpacity>
                </View>
                {showEmpty ? (
                    <>
                        <LottieView
                            source={require('../animations/empty-search.json')}
                            autoPlay
                            loop
                            style={{
                                marginTop: 50,
                                height: height / 3.5,
                                alignSelf: 'center'
                            }}
                        />
                        <Text style={{ fontSize: 15, color: "#ca6702", fontFamily: "Poppins-SemiBold", textAlign: "center", marginTop: 10 }}>Produk Tidak Ditemukan</Text>
                        <Text style={{ fontSize: 13.5, color: "#ca6702", fontFamily: "Poppins-Medium", textAlign: "center" }}>Produk untuk pencarian tidak tersedia</Text>
                    </>
                ) : (
                    isLoading ? (
                        <>
                            <ShimmerProduct />
                            <ShimmerProduct />
                            <ShimmerProduct />
                            <ShimmerProduct />
                            <ShimmerProduct />
                            <ShimmerProduct />
                        </>
                    ) : (
                        <View style={s.productsWrap}>
                            {dataDisplay.length > 0 ? dataDisplay.map((el, i) => (
                                <View
                                    style={[styles.cardItemWrap, {
                                        flexDirection: 'column',
                                        height: "auto",
                                        width: "100%",
                                        borderRadius: 5,
                                        backgroundColor: '#fff',
                                        marginHorizontal: 0,
                                        marginVertical: 5,
                                        padding: 10,
                                        borderRadius: 5
                                    }]}
                                    key={i}
                                >
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        {imageSelected && el.id === idProduk ? (
                                            <View style={{ height: "100%", width: 100 }} >
                                                <Image
                                                    source={{ uri: uri }}
                                                    style={{ height: 80, width: "auto" }}
                                                />
                                            </View>
                                        ) : (
                                            <View style={{ height: "100%", width: 100 }} >
                                                <Image
                                                    source={{ uri: el.photo }}
                                                    style={{ height: 80, width: "auto" }}
                                                />
                                            </View>
                                        )}
                                        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around' }}>
                                            <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{el.nama_barang}</Text>
                                            <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{convertToIDR(el.harga)}</Text>
                                            {el.qty > 0 ? (
                                                <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#f5576c' }}>Stok {el.qty}</Text>
                                            ) : (
                                                <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'red' }}>Stok Habis</Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            {imageSelected && el.id === idProduk ? (
                                                <Ripple
                                                    rippleColor="#27ae60"
                                                    onPress={() => uploadImage()}
                                                    style={{ width: 100, height: 30, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "purple", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'purple' }}>Simpan Foto</Text>
                                                </Ripple>
                                            ) : (
                                                <Ripple
                                                    rippleColor="#27ae60"
                                                    onPress={() => openImageSelector(el.id)}
                                                    style={{ width: 100, height: 30, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "#60a3bc", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>Ubah Foto</Text>
                                                </Ripple>
                                            )}
                                            <Ripple
                                                rippleColor="#27ae60"
                                                onPress={() => showDetailProduct(el.id)}
                                                style={{ width: 100, height: 30, marginLeft: 10, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "#27ae60", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>Detail</Text>
                                            </Ripple>
                                        </View>
                                        <Ripple rippleColor="red" style={{ width: 40, height: 30, marginTop: 5, padding: 3, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "red", borderRadius: 10 }} onPress={() => removeProduct(el.id)}>
                                            <FontAwesome5 name={"trash"} size={16} color="red" />
                                        </Ripple>
                                    </View>
                                </View>
                            )) : (
                                data.length > 0 && data.map((el, i) => (
                                    <View
                                        style={[styles.cardItemWrap, {
                                            flexDirection: 'column',
                                            height: "auto",
                                            width: "100%",
                                            borderRadius: 5,
                                            backgroundColor: '#fff',
                                            marginHorizontal: 0,
                                            marginVertical: 5,
                                            padding: 10,
                                            borderRadius: 5
                                        }]}
                                        key={i}
                                    >
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            {imageSelected && el.id === idProduk ? (
                                                <View style={{ height: "100%", width: 100 }} >
                                                    <Image
                                                        source={{ uri: uri }}
                                                        style={{ height: 80, width: "auto" }}
                                                    />
                                                </View>
                                            ) : (
                                                <View style={{ height: "100%", width: 100 }} >
                                                    <Image
                                                        source={{ uri: el.photo }}
                                                        style={{ height: 80, width: "auto" }}
                                                    />
                                                </View>
                                            )}
                                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around' }}>
                                                <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{el.nama_barang}</Text>
                                                <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{convertToIDR(el.harga)}</Text>
                                                {el.qty > 0 ? (
                                                    <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#f5576c' }}>Stok {el.qty}</Text>
                                                ) : (
                                                    <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'red' }}>Stok Habis</Text>
                                                )}
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                {imageSelected && el.id === idProduk ? (
                                                    <Ripple
                                                        rippleColor="#27ae60"
                                                        onPress={() => uploadImage()}
                                                        style={{ width: 100, height: 30, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "purple", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                        <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'purple' }}>Simpan Foto</Text>
                                                    </Ripple>
                                                ) : (
                                                    <Ripple
                                                        rippleColor="#27ae60"
                                                        onPress={() => openImageSelector(el.id)}
                                                        style={{ width: 100, height: 30, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "#60a3bc", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                        <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>Ubah Foto</Text>
                                                    </Ripple>
                                                )}
                                                <Ripple
                                                    rippleColor="#27ae60"
                                                    onPress={() => showDetailProduct(el.id)}
                                                    style={{ width: 100, height: 30, marginLeft: 10, marginTop: 5, padding: 3, borderWidth: 1, borderColor: "#27ae60", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                                                    <Text style={{ fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#27ae60' }}>Detail</Text>
                                                </Ripple>
                                            </View>
                                            <Ripple rippleColor="red" style={{ width: 40, height: 30, marginTop: 5, padding: 3, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "red", borderRadius: 10 }} onPress={() => removeProduct(el.id)}>
                                                <FontAwesome5 name={"trash"} size={16} color="red" />
                                            </Ripple>
                                        </View>
                                    </View>
                                ))
                            )}
                            <Space height={50} />
                        </View>
                    )
                )}
            </ScrollView>
            <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => Actions.AddProduct({ getAfterAdd: getAfterAdd })}>
                <FontAwesome5 name={"plus"} size={14} color="#fff" />
            </Ripple>
            <SafeAreaView style={s.container}>
                <BottomSheet hasDraggableIcon ref={bs} height={620}>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{ fontSize: 15, color: "#000", textAlign: "center", fontFamily: "Poppins-SemiBold", marginVertical: 10 }}>Detail Produk</Text>
                        <View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Supplier</Text>
                            <View style={s.areaInputDetail}>
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
                                        <SelectDropdown
                                            data={dataSupplier.map(el => el.nama)}
                                            onSelect={(selectedItem, index) => {
                                                var data = { ...singleData }
                                                data.supplier.nama = selectedItem;
                                                setSingleData(data)
                                                dataSupplier.map(el => {
                                                    if (el.nama === selectedItem) {
                                                        setUpdateIDSupplier(el.id);
                                                    }
                                                })
                                            }}
                                            defaultButtonText={singleData.supplier && singleData.supplier.nama}
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
                                            disabled={!editForm}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Kategori</Text>
                            <View style={s.areaInputDetail}>
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
                                        <SelectDropdown
                                            data={dataCategory.map(el => el.nama)}
                                            onSelect={(selectedItem, index) => {
                                                var data = { ...singleData }
                                                data.kategori.nama = selectedItem;
                                                setSingleData(data)
                                                dataCategory.map(el => {
                                                    if (el.nama === selectedItem) {
                                                        setUpdateIDCategory(el.id);
                                                    }
                                                })
                                            }}
                                            defaultButtonText={singleData.kategori && singleData.kategori.nama_barang}
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
                                            disabled={!editForm}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nama Produk</Text>
                            <View style={s.areaInputDetail}>
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
                                            placeholder="Beras Ramos"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            value={singleData.nama_barang}
                                            onChangeText={text => setSingleData({ ...singleData, nama_barang: text })}
                                            autoCorrect={false}
                                            editable={editForm}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Harga Satuan</Text>
                            <View style={s.areaInputDetail}>
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
                                            placeholder="10000"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            editable={editForm}
                                            onChangeText={text => setSingleData({ ...singleData, harga: text })}
                                            value={`${singleData.harga}`}
                                            keyboardType={'phone-pad'}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Jumlah</Text>
                            <View style={s.areaInputDetail}>
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
                                            placeholder="50"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            value={`${singleData.qty}`}
                                            onChangeText={text => setSingleData({ ...singleData, qty: text })}
                                            editable={editForm}
                                            keyboardType={'phone-pad'}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Deskripsi</Text>
                            <View style={s.areaInputDetail}>
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
                                            placeholder="Deskripsi Produk"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            onChangeText={text => setSingleData({ ...singleData, deskripsi: text })}
                                            value={singleData.deskripsi}
                                            editable={editForm}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            {editForm ? (
                                <View style={{ width: "100%", marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                    <Ripple
                                        rippleColor="#fff"
                                        style={{ height: 40, width: "48%", borderRadius: 10, borderColor: '#eb8937', borderWidth: 1, justifyContent: "center", alignItems: "center" }}
                                        onPress={() => setEditForm(false)}
                                    >
                                        <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>Tutup</Text>
                                    </Ripple>
                                    <Ripple
                                        rippleColor="#fff"
                                        style={{ height: 40, width: "48%", borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center" }}
                                        onPress={() => saveProduct()}
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
                                    onPress={() => setEditForm(true)}
                                >
                                    <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>Ubah Data</Text>
                                </Ripple>
                            )}
                        </View>
                    </View>
                </BottomSheet>
            </SafeAreaView>
            <SafeAreaView style={s.container}>
                <BottomSheet hasDraggableIcon ref={bs2} height={150}>
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
            {modalShow && (
                <Modal
                    isVisible={modalShow} style={{ justifyContent: "center", alignItems: "center" }}>
                    <View
                        style={{
                            backgroundColor: "#fafafa",
                            height: 300,
                            width: 300,
                            borderRadius: 10,
                        }}>
                        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
                            <LottieView
                                source={require('../animations/close-checkout.json')}
                                autoPlay
                                loop
                                style={{
                                    height: 200,
                                    width: 200
                                }}
                            />
                            <Text style={{ fontSize: 14, fontFamily: "Poppins-Medium", marginTop: "-6%" }}>Yakin ingin menghapus barang?</Text>
                            <Text style={{ fontSize: 13, fontFamily: "Poppins-Medium", color: "#d90429" }}>Aksi ini tidak dapat dikembalikan</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            position: "absolute",
                            width: "100%",
                            height: 50,
                            bottom: 0
                        }}>
                            <TouchableOpacity
                                style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#ddd", justifyContent: "center", alignItems: "center" }}
                                onPress={() => setModalShow(false)}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Poppins-Medium" }}>Tidak</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#eb8937", justifyContent: "center", alignItems: "center" }}
                                onPress={() => confirmRemoveProduct()}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Poppins-Medium" }}>Ya</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
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

export default Products