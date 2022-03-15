import { Text } from 'react-native'
import React from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Actions } from 'react-native-router-flux'

const colorHeader = ['#f6b635', '#f3a337', '#eb8937']

const Wishlist = () => {
  return (
    <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 90, paddingTop: 35, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <TouchableOpacity onPress={() => Actions.pop()}>
        <FontAwesome5 name={"arrow-left"} size={23} color='#fff' />
      </TouchableOpacity>
      <Text style={[styles.textBold, { fontSize: 17, color: "#fff" }]}>Wishlist</Text>
      <TouchableOpacity onPress={() => Actions.Keranjang()}>
        <FontAwesome5 name={"shopping-cart"} solid size={18} color='#fff' />
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default Wishlist