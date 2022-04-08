import { View, TouchableOpacity, Text } from 'react-native'
import React from "react"
import styles from '../stylesheets/Main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

const colorHeader = ['#f3a337', '#eb8937']

const Header = () => {
    return (
        <LinearGradient colors={colorHeader} style={styles.headerWrap}>
            <View style={styles.cartIcon}>
                <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                    <FontAwesome5 name={"bars"} size={20} color='#FFFFFF' />
                </TouchableOpacity>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Poppins-SemiBold" }}>Toko Liga Beras</Text>
                </View>
                <TouchableOpacity onPress={() => Actions.Search()}>
                    <FontAwesome5 name={"search"} size={20} color='#FFFFFF' />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Header