import React, { useContext, useState, useEffect } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, ActivityIndicator, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import Ripple from 'react-native-material-ripple';
import { MainContext } from '../context/MainContext';
import SelectDropdown from 'react-native-select-dropdown'
import { toast, convertToIDR } from '../Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colorHeader = ['#f3a337', '#eb8937']

const AddPurchase = (props) => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [qty, setQty] = useState(0)
    const [harga, setHarga] = useState(0)
    const [editQty, setEditQty] = useState(false)
    const [editHarga, setEditHarga] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dataSupplier, setDataSupplier] = useState([])
    const [supplierID, setSupplierID] = useState(0)
    const [productID, setProductID] = useState(0)
    const [productPrice, setProductPrice] = useState(0)
    const [productQty, setProductQty] = useState(0)
    const [dataProduct, setDataProduct] = useState([])
    const [SelectedSupplier, setSelectedSupplier] = useState(false)
    const [SelectedProduct, setSelectedProduct] = useState(false)

    const savePesanan = () => {
        AsyncStorage.getItem("tokenAccess").then(token => {
            if (token !== null) {
                let tokenAccess = JSON.parse(token)
                let key = { headers: { Authorization: `Bearer ${tokenAccess}` } }
                if (productID !== 0 && qty !== 0 && harga !== 0) {
                    setIsLoading(true)
                    Keyboard.dismiss()
                    axios.post(`${backendURL}/api/v1/create_po/`, {
                        id_barang: productID,
                        qty_beli: qty,
                        harga_beli: harga
                    }, key).then(() => {
                        Actions.pop()
                        toast("Pesanan Berhasil Ditambahkan", "success")
                        setIsLoading(false)
                        setSupplierID(0)
                        setProductID(0)
                        setQty(0)
                        setHarga(0)
                    }).catch((err) => {
                        toast("Pesanan Gagal Ditambahkan", "danger")
                        setIsLoading(false)
                    })
                } else {
                    toast("Form Wajib Diisi", "info")
                    setIsLoading(false)
                }
            }
        })
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

    const changeQtyProduk = (text) => {
        if (text !== "") {
            setEditQty(true)
            setQty(text)
        } else {
            setQty("")
            setEditQty(false)
        }
    }

    const changeHargaProduk = (text) => {
        if (text !== "") {
            setEditHarga(true)
            setHarga(text)
        } else {
            setHarga("")
            setEditHarga(false)
        }
    }

    const clearQty = () => {
        setQty("")
        setEditQty(false)
    }

    const clearHarga = () => {
        setHarga("")
        setEditHarga(false)
    }

    useEffect(() => {
        getSupplier()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Tambah Pesanan</Text>
            </LinearGradient>
            <View style={{
                paddingHorizontal: 20,
                marginVertical: 10
            }}>
                <View>
                    <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nama Supplier</Text>
                    <View style={s.areaInputDetail}>
                        <SafeAreaView style={s.inputWrap}>
                            <SelectDropdown
                                data={dataSupplier.map(el => el.nama)}
                                onSelect={(selectedItem, index) => {
                                    setSelectedSupplier(true)
                                    dataSupplier.map(el => {
                                        if (el.nama === selectedItem) {
                                            setSupplierID(el.id);
                                            setDataProduct(el.product)
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
                    {SelectedSupplier && (
                        <>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nama Barang</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
                                    <SelectDropdown
                                        data={dataProduct.map(el => el.nama)}
                                        onSelect={(selectedItem, index) => {
                                            dataProduct.map(el => {
                                                if (el.nama === selectedItem) {
                                                    setProductID(el.id);
                                                    setProductPrice(el.harga)
                                                    setProductQty(el.qty)
                                                    setSelectedProduct(true)
                                                }
                                            })
                                            return selectedItem
                                        }}
                                        defaultButtonText={"-- Pilih Produk --"}
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
                                            textTransform: "capitalize",
                                            fontFamily: "Poppins-Medium",
                                            textAlign: "left"
                                        }}
                                        buttonTextStyle={{
                                            fontSize: 14,
                                            color: "#595959",
                                            textTransform: "capitalize",
                                            fontFamily: "Poppins-Medium",
                                            textAlign: "left"
                                        }}
                                    />
                                </SafeAreaView>
                            </View>
                        </>
                    )}
                    {SelectedProduct && (
                        <>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Harga Beli</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
                                    <TextInput
                                        placeholder={`${productPrice - 2000}`}
                                        style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                        spellCheck={false}
                                        autoCorrect={false}
                                        onChangeText={changeHargaProduk}
                                        value={harga}
                                        keyboardType={'phone-pad'}
                                    />
                                    {editHarga && (
                                        <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8, position: "absolute", right: 0, bottom: 10 }} onPress={() => clearHarga()} />
                                    )}
                                </SafeAreaView>
                                <Text style={{ fontSize: 12, color: "red", fontFamily: "Poppins-Medium", alignSelf: "flex-end" }}>Harga Jual:  {convertToIDR(productPrice)}</Text>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Jumlah</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
                                    <TextInput
                                        placeholder="0"
                                        style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                        spellCheck={false}
                                        autoCorrect={false}
                                        onChangeText={changeQtyProduk}
                                        value={qty}
                                        keyboardType={'phone-pad'}
                                    />
                                    {editQty && (
                                        <Icons name={"close-circle"} size={21} color='#eb8937' style={{ marginRight: 8, position: "absolute", right: 0, bottom: 10 }} onPress={() => clearQty()} />
                                    )}
                                </SafeAreaView>
                                <Text style={{ fontSize: 12, color: "red", fontFamily: "Poppins-Medium", alignSelf: "flex-end" }}>Stok:  {productQty}</Text>
                            </View>
                        </>
                    )}
                    <Ripple
                        rippleColor="#fff"
                        style={{ height: 40, width: "100%", borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center", marginTop: 10 }}
                        onPress={() => savePesanan()}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>Buat Pesanan</Text>
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

export default AddPurchase