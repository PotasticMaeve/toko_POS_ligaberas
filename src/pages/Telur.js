import { Text } from 'react-native'
import React from 'react'
import styles from '../stylesheets/Main'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Actions } from 'react-native-router-flux'

const colorHeader = ['#f3a337', '#eb8937']

const Telur = () => {
  return (
    <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
      <TouchableOpacity onPress={() => Actions.pop()}>
        <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
      </TouchableOpacity>
      <Text style={[styles.textBold, { fontSize: 18, color: "#fff", marginLeft: 30}]}>Kategori Telur</Text>
    </LinearGradient>
  )
}

export default Telur