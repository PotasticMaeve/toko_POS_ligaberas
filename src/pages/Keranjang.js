import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'

const colorHeader = ['#f6b635', '#f3a337', '#eb8937']

const Keranjang = () => {
    return (
        <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 90, paddingTop: 35, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableOpacity onPress={() => Actions.pop()}>
                <FontAwesome5 name={"arrow-left"} size={23} color='#fff' />
            </TouchableOpacity>
            <Text style={[styles.textBold, { fontSize: 17, color: "#fff" }]}>Keranjang</Text>
            <TouchableOpacity onPress={() => Actions.Wishlist()}>
                <FontAwesome5 name={"heart"} solid size={19} color='#fff' />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default Keranjang