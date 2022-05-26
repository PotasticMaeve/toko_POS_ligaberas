import React from 'react'
import { View, Text } from 'react-native'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/FontAwesome';

const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
const Label = (props) => {
    return (
        <View style={styles.labelRow}>
            <LinearGradient colors={['#f4ab18', '#e2880d']} style={styles.labelWrap}>
                <Text style={{ color: "#fff", fontSize: 15, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Daftar Produk {bulan[new Date().getMonth()]} {new Date().getUTCFullYear()}</Text>
            </LinearGradient>
            <Icons name={"refresh"} solid size={22} color="#e8791c" onPress={() => props.refreshData()}/>
        </View>
    )
}

export default Label