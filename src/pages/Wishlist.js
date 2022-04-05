import React from 'react'
import { Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../stylesheets/Main'

const colorHeader = ['#f3a337', '#eb8937']

const Wishlist = () => {
    return (
        <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.textBold, { fontSize: 18, color: "#fff"}]}>Wishlist</Text>
        </LinearGradient>
    )
}

export default Wishlist