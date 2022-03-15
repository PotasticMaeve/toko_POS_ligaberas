import React, { useEffect, useContext } from 'react'
import { View, BackHandler } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../stylesheets/Main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Actions } from 'react-native-router-flux'

const colorHeader = ['#f6b635', '#f3a337', '#eb8937']

const DetailCard = () => {
    return (
        <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 95, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableOpacity onPress={() => Actions.pop()}>
                <FontAwesome5 name={"arrow-left"} size={23} color='#fff' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.Keranjang()}>
                <FontAwesome5 name={"shopping-cart"} solid size={19} color='#fff' />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default DetailCard