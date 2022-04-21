import React, { useContext, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View, FlatList, Text, Dimensions, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import axios from 'axios';
import { MainContext } from "../context/MainContext"
import Card from "./Card"

const colorHeader = ['#f3a337', '#eb8937']

const Search = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [input, setInput] = useState("")
    const [data, setData] = useState([])
    const [dataDisplay, setDataDisplay] = useState([])

    const onChangeText = (search) => {
        setInput(search)
        if (input.length > 2) {
            axios.get(`${backendURL}/api/v1/product/?search=${search}`)
                .then(res => {
                    if (res.status === 200) {
                        let result = res.data.data
                        if (result.length > 0) {
                            setData(result);
                        }
                    }
                })
        } else {
            setData([])
            setDataDisplay([])
        }
    }

    const getRealProduct = (nama) => {
        setInput(nama)
        axios.get(`${backendURL}/api/v1/product/?search=${nama}`)
            .then(res => {
                if (res.status === 200) {
                    setDataDisplay(res.data.data);
                }
            })
    }

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 90, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-end", paddingBottom: 10 }}>
                <TouchableOpacity onPress={() => Actions.pop()} style={{ marginBottom: 5 }}>
                    <FontAwesome5 name={"angle-left"} size={28} color='#fff' />
                </TouchableOpacity>
                <TouchableWithoutFeedback style={{ flexDirection: "column", width: "100%" }}>
                    <>
                        <SafeAreaView style={s.input}>
                            <TextInput
                                placeholder="cari produk"
                                style={{ marginLeft: 3, marginTop: 2, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", paddingHorizontal: 10, paddingVertical: 3 }}
                                spellCheck={false}
                                autoCorrect={false}
                                value={input}
                                onChangeText={onChangeText}
                                autoFocus={true}
                            />
                        </SafeAreaView>
                    </>
                </TouchableWithoutFeedback>
            </LinearGradient>
            <View style={{ flex: 1, width: "100%" }}>
                {(dataDisplay.length < 1) ? (
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            let nama_barang = "beras"
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
                ):(
                    <Card data={dataDisplay} />
                )}
            </View>
        </>
    )
}

const s = StyleSheet.create({
    input: {
        marginHorizontal: 15,
        backgroundColor: "#fafafa",
        width: "90%",
        borderRadius: 10
    }
})

export default Search