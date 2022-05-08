import React, { useContext, useEffect, useState, useRef } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import Icons from 'react-native-vector-icons/Ionicons'
import Ripple from 'react-native-material-ripple';
import Space from '../components/Space';
import { convertToIDR } from "../Helper"
import BottomSheet from "react-native-gesture-bottom-sheet";
import ShimmerProduct from '../components/ShimmerProduct';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { Actions } from 'react-native-router-flux';
import SelectDropdown from 'react-native-select-dropdown'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']

const Products = () => {
    const bs = useRef(null)
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [input, setInput] = useState("")
    const [dataDisplay, setDataDisplay] = useState([])
    const [dataSupplier, setDataSupplier] = useState([])
    const [dataCategory, setDataCategory] = useState([])
    const [editing, setEditing] = useState(false)
    const [singleData, setSingleData] = useState({})

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
                toast("Gagal Memuat Data Produk", "danger")
            })
    }

    const getDataById = (id) => {
        setIsLoading(true)
        axios.get(`${backendURL}/api/v1/product/${id}/`)
            .then((res) => {
                if (res.data.status === 200) {
                    setSingleData(res.data.data[0]);
                    setIsLoading(false)
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
                    setDataDisplay(res.data.data);
                    setIsLoading(false)
                }
            })
    }

    const clearMode = () => {
        setInput("")
        setEditing(false)
    }

    const getSupplier = () => {
        axios.get(`${backendURL}/api/v1/supplier/`)
            .then(res => {
                if (res.status === 200) {
                    setDataSupplier(res.data.data);
                }
            })
    }

    const getCategory = () => {
        let category_names = []
        axios.get(`${backendURL}/api/v1/product_category/`)
            .then(res => {
                if (res.status === 200) {
                    let data = res.data.data
                    data.map(el => {
                        category_names.push(el.nama)
                    })
                    setDataCategory(category_names)
                }
            })
    }

    const showDetailProduct = (id) => {
        getDataById(id)
        bs.current.show()
    }

    useEffect(() => {
        getCategory()
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
                {isLoading ? (
                    <>
                        <ShimmerProduct />
                        <ShimmerProduct />
                        <ShimmerProduct />
                    </>
                ) : (
                    <View style={s.productsWrap}>
                        {dataDisplay.length > 0 ? dataDisplay.map((el, i) => (
                            <TouchableOpacity style={[styles.cardItemWrap, {
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
                                onPress={() => showDetailProduct(el.id)}
                            >
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View style={{ height: "100%", width: 100 }} >
                                        <Image
                                            source={{ uri: el.photo }}
                                            style={{ height: 80, width: "auto" }}
                                        />
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, justifyContent: 'space-around' }}>
                                        <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{el.nama_barang}</Text>
                                        <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{convertToIDR(el.harga)}</Text>
                                        <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#f5576c' }}>Stok {el.qty}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )) : (
                            data.length > 0 && data.map((el, i) => (
                                <TouchableOpacity
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
                                    onPress={() => showDetailProduct(el.id)}
                                >
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View style={{ height: "100%", width: 100 }} >
                                            <Image
                                                source={{ uri: el.photo }}
                                                style={{ height: 80, width: "auto" }}
                                            />
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, justifyContent: 'space-around' }}>
                                            <Text numberOfLines={1} style={{ width: 200, fontSize: 12, fontFamily: "Poppins-SemiBold", textTransform: "capitalize" }}>{el.nama_barang}</Text>
                                            <Text style={{ marginVertical: 3, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#60a3bc' }}>{convertToIDR(el.harga)}</Text>
                                            {el.qty > 0 ? (
                                                <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: '#f5576c' }}>Stok {el.qty}</Text>
                                            ) : (
                                                <Text style={{ marginVertical: 6, fontSize: 12, fontFamily: "Poppins-SemiBold", color: 'red' }}>Stok Habis</Text>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
                        <Space height={50} />
                    </View>
                )}
            </ScrollView>
            <Ripple style={s.buttonAmount} rippleColor="#fff" onPress={() => Actions.AddProduct()}>
                <FontAwesome5 name={"plus"} size={14} color="#fff" />
            </Ripple>
            <SafeAreaView style={s.container}>
                <BottomSheet hasDraggableIcon ref={bs} height={700}>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{ fontSize: 15, color: "#000", textAlign: "center", fontFamily: "Poppins-SemiBold", marginVertical: 10 }}>Detail Produk</Text>
                        <View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Supplier</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
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
                                            placeholder="John Doe"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            value={singleData.supplier && singleData.supplier.nama}
                                            editable={editing}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Kategori</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
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
                                        <SelectDropdown
                                            data={dataCategory}
                                            onSelect={(selectedItem, index) => {
                                                var data = { ...singleData }
                                                data.kategori.nama = selectedItem;
                                                setSingleData(data)
                                            }}
                                    defaultButtonText={singleData.kategori ? singleData.kategori.nama : "Pilih Kategori"}
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
                                    disabled={!editing}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Nama Produk</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
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
                                            placeholder="Beras Ramos"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            value={singleData.nama_barang}
                                            autoCorrect={false}
                                            editable={editing}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Harga Satuan</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
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
                                            placeholder="10000"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            editable={editing}
                                            value={`${singleData.harga}`}
                                            keyboardType={'phone-pad'}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Jumlah</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
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
                                            placeholder="50"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            value={`${singleData.qty}`}
                                            editable={editing}
                                            keyboardType={'phone-pad'}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Deskripsi</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
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
                                            placeholder="Deskripsi Produk"
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            value={singleData.deskripsi}
                                            editable={editing}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            <Text style={{ color: "#ca6702", fontFamily: "Poppins-SemiBold", fontSize: 13 }}>Foto</Text>
                            <View style={s.areaInputDetail}>
                                <SafeAreaView style={s.inputWrap}>
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
                                            style={{ marginLeft: 3, fontSize: 13, color: "#595959", fontFamily: "Poppins-Medium", marginLeft: 10, width: "90%" }}
                                            spellCheck={false}
                                            autoCorrect={false}
                                            editable={editing}
                                        />
                                    )}
                                </SafeAreaView>
                            </View>
                            {editing ? (
                                <View style={{ width: "100%", marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                    <Ripple
                                        rippleColor="#fff"
                                        style={{ height: 40, width: "48%", borderRadius: 10, borderColor: '#eb8937', borderWidth: 1, justifyContent: "center", alignItems: "center" }}
                                        onPress={() => setEditing(false)}
                                    >
                                        <Text style={{ textTransform: "capitalize", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>Tutup</Text>
                                    </Ripple>
                                    <Ripple
                                        rippleColor="#fff"
                                        style={{ height: 40, width: "48%", borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center" }}
                                        onPress={() => { }}
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
                                    onPress={() => setEditing(true)}
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