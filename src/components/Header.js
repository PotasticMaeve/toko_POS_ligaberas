import { View, TouchableOpacity } from 'react-native'
import React from "react"
import styles from '../stylesheets/Main'
import TextField from './TextField'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

const colorHeader = ['#f6b635', '#f3a337', '#eb8937']

const Header = () => {
    return (
        <LinearGradient colors={colorHeader} style={styles.headerWrap}>
            <TextField />
            <View style={styles.cartIcon}>
                <TouchableOpacity onPress={() => Actions.Keranjang()}>
                    <FontAwesome5 name={"shopping-cart"} size={18} color='#FFFFFF' style={{ marginLeft: 7, marginRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                    <FontAwesome5 name={"bars"} size={18} color='#FFFFFF' style={{ marginLeft: 7 }} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Header