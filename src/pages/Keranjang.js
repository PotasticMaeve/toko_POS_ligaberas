import { Text, View } from 'react-native'
import React from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'

const colorHeader = ['#f3a337', '#eb8937']

const Keranjang = () => {
  return (
    <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <Text style={[styles.textBold, { fontSize: 18, color: "#fff" }]}>Keranjang</Text>
    </LinearGradient>
  )
}

export default Keranjang