import { TextInput, View } from 'react-native'
import React from 'react'
import styles from '../stylesheets/Main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TextField = () => {
    return (
        <View style={styles.textField}>
            <FontAwesome5 name={"search"} size={15} color="#9a9a9a" />
            <TextInput
                placeholder="Cari sepatu bola"
                style={[styles.textMedium, { marginLeft: 5, fontSize: 14, width: "90%", color: "#595959", height: 40 }]}
                spellCheck={false}
                autoCorrect={false}
            />
        </View>
    )
}

export default TextField