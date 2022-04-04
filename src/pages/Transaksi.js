import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'

const colorHeader = ['#f6b635', '#f3a337', '#eb8937']

const Transaksi = () => {
    return (
        <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 85, paddingTop: 35, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <TouchableOpacity onPress={() => Actions.pop()}>
                <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
            </TouchableOpacity>
            <Text style={[styles.textBold, { fontSize: 17, color: "#fff", marginLeft: 30 }]}>Transaksi</Text>
        </LinearGradient>
    )
}

export default Transaksi