import React, { useContext, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, FlatList, Text, Dimensions, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import axios from 'axios';
import { MainContext } from "../context/MainContext"
import Card from "./Card"
import ShimmerCard from './ShimmerCard';

const colorHeader = ['#f3a337', '#eb8937']

const Search = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [input, setInput] = useState("")
    const [dataDisplay, setDataDisplay] = useState([])

    const onChangeText = (search) => {
        setInput(search)
    }

    const getRealProduct = () => {
        axios.get(`http://192.168.18.52:8000/api/v1/product/?search=${input}`)
            .then(res => {
                if (res.status === 200) {
                    setDataDisplay(res.data.data);
                }
            })
    }

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 90, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()} style={{ marginBottom: 5 }}>
                    <FontAwesome5 name={"angle-left"} size={28} color='#fff' />
                </TouchableOpacity>
                <TouchableWithoutFeedback style={{ flexDirection: "column", width: "100%" }}>
                    <View style={s.areaInput}>
                        <SafeAreaView style={s.inputWrap}>
                            <TextInput
                                placeholder="Cari produk"
                                style={s.inputComp}
                                spellCheck={false}
                                autoCorrect={false}
                                onChangeText={onChangeText}
                                onSubmitEditing={() => getRealProduct()}
                            />
                            <FontAwesome5 name={"search"} size={18} color='#eb8937' style={{ marginRight: 15 }} onPress={() => getRealProduct()} />
                        </SafeAreaView>
                    </View>
                </TouchableWithoutFeedback>
            </LinearGradient>
            {/* <View style={{ flex: 1, width: "100%" }}>
                {(dataDisplay.length < 1) ? (
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            let nama_barang = item.nama_barang
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        borderBottomColor: "#ddd",
                                        backgroundColor: "#fff",
                                        borderBottomWidth: 0.5,
                                        flexDirection: "row",
                                        padding: 15,
                                        alignItems: "center",
                                    }}
                                    onPress={() => { getRealProduct(nama_barang) }}
                                >
                                    <Text>{nama_barang}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                ) : (
                    )}
                </View> */}
            <Card data={dataDisplay} />
        </>
    )
}

const s = StyleSheet.create({
    inputWrap: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 3,
        backgroundColor: "#fafafa",
        width: "100%",
        borderRadius: 10
    },
    inputComp: {
        marginLeft: 3,
        marginTop: 2,
        fontSize: 14,
        color: "#595959",
        paddingVertical: 6,
        fontFamily: "Poppins-Medium",
        paddingHorizontal: 10,
        width: "90%"
    },
    areaInput: {
        width: "100%",
        flexDirection: "column",
        paddingHorizontal: 15,
        justifyContent: "space-between",
    },
})

export default Search