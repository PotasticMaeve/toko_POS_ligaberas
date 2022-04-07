import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'

const colorHeader = ['#f3a337', '#eb8937']

const Search = () => {
    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <View style={s.input}>
                    <TextInput
                        placeholder="Cari Produk"
                        style={{ marginLeft: 3, marginTop: 2, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", paddingHorizontal: 10, paddingVertical: 3 }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                </View>
            </LinearGradient>
        </>
    )
}

const s = StyleSheet.create({
    input: {
        marginHorizontal: 13,
        backgroundColor: "#fafafa",
        width: "90%",
        borderRadius: 10
    }
})

export default Search