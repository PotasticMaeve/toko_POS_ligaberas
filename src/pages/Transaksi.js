import { Text, View } from 'react-native'
import React from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'

const colorHeader = ['#f6b635', '#f3a337', '#eb8937']

const Transaksi = () => {
  return (
    <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 90, paddingTop: 35, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <Text style={[styles.textBold, { fontSize: 17, color: "#fff" }]}>Transaksi</Text>
    </LinearGradient>
  )
}

export default Transaksi