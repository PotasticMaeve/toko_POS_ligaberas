import React from 'react'
import { View, Text } from 'react-native'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient';

const Label = () => {
    return (
        <LinearGradient colors={['#f6b635', '#f3a337', '#eb8937']} style={styles.labelWrap}>
            <Text style={[styles.textBold, { color: "#474747", fontSize: 15 }]}>Produk Terlaris</Text>
        </LinearGradient>
    )
}

export default Label