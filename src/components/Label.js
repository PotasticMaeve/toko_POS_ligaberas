import React from 'react'
import { View, Text } from 'react-native'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient';

const Label = () => {
    return (
        <View style={styles.labelRow}>
            <LinearGradient colors={['#f4ab18', '#e2880d']} style={styles.labelWrap}>
                <Text style={[styles.textBold, { color: "#fff", fontSize: 15 }]}>Produk Terbaru</Text>
            </LinearGradient>
        </View>
    )
}

export default Label