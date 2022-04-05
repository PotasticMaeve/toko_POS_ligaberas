import React from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { convertToIDR } from '../Helper'
import styles from '../stylesheets/Main'

const WishlistCard = () => {
    return (
        <View style={[styles.cardItemWrap, {
            flexDirection: 'column',
            height: "auto",
            borderRadius: 5,
            backgroundColor: '#fff',
            marginHorizontal: 0,
            marginVertical: 5,
        }]}>
            <TouchableHighlight style={{ padding: 10, borderRadius: 5 }}>
                <>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ height: "100%", width: 100, backgroundColor: "#eee"}} >
                            <Image
                                source={require("../../assets/images/teh.jpg")}
                                style={{height: 80, width: "auto"}}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, justifyContent: 'space-around' }}>
                            <Text numberOfLines={1} style={[styles.textSemiBold, { width: 200, fontSize: 13, textTransform: "capitalize" }]}>teh celup sariwangi kantong 25 pcs</Text>
                            <Text style={[styles.textSemiBold, { marginVertical: 5, fontSize: 13, color: '#60a3bc' }]}>{convertToIDR(8000)}</Text>
                            <Text style={[styles.textSemiBold, { marginVertical: 8, fontSize: 13, color: '#f5576c' }]}>Stok 0</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: "space-around" }}>
                        <Ripple rippleColor="red" style={{ height: 40, borderRadius: 8, borderWidth: 1, borderColor: 'red', overflow: 'hidden', justifyContent: "center", alignItems: "center" }}>
                            <View style={{ padding: 8, margin: 10 }}>
                                <FontAwesome5 name={"trash"} size={16} color="red" />
                            </View>
                        </Ripple>
                        <Ripple rippleColor="#27ae60" style={{ height: 40, borderRadius: 10, borderWidth: 1, borderColor: '#27ae60', overflow: 'hidden', marginLeft: 10, width: "80%", justifyContent: "center", alignItems: 'center' }}>
                            <Text style={[styles.textBold, { color: '#27ae60' }]}>Tambah ke Keranjang</Text>
                        </Ripple>
                    </View>
                </>
            </TouchableHighlight>
        </View>
    )
}

export default WishlistCard