import { TextInput, View } from 'react-native'
import React from 'react'
import styles from '../stylesheets/Main'

const TextField = () => {
    return (
        <View style={styles.textField}>
            <TextInput
                placeholder="Cari sepatu bola"
                style={[styles.textRegular]}
                spellCheck={false}
                autoCorrect={false}
            />
        </View>
    )
}

export default TextField