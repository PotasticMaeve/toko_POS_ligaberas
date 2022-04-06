import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'

const colorHeader = ['#f3a337', '#eb8937']


const Checkout = () => {
    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={[styles.textBold, { fontSize: 17, color: "#fff", marginLeft: 30 }]}>Checkout</Text>
            </LinearGradient>
        </>
    )
}

export default Checkout