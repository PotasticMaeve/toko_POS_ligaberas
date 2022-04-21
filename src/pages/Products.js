import React, { useEffect, useState } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'

const colorHeader = ['#f3a337', '#eb8937']
const Products = () => {
    const [data, setData] = useState([])

    const getData = () => {

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Produk</Text>
            </LinearGradient>
            <View style={{ paddingVertical: 10, flex: 1, backgroundColor: "#fafafa" }}>
                <TouchableWithoutFeedback style={{ flexDirection: "column", width: "100%" }}>
                    <>
                        <SafeAreaView style={s.input}>
                            <TextInput
                                placeholder="cari produk"
                                style={{ marginLeft: 3, marginTop: 2, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", paddingHorizontal: 10, paddingVertical: 3 }}
                                spellCheck={false}
                                autoCorrect={false}
                            />
                        </SafeAreaView>
                    </>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const s = StyleSheet.create({
    input: {
        height: 40,
        justifyContent: "center", 
        marginHorizontal: 15,
        backgroundColor: "#eaeaea",
        width: "90%",
        borderRadius: 10
    }
})
export default Products