import React from 'react'
import { View, Text, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from '../stylesheets/Main'
import { convertToIDR } from '../Helper';
import { Actions } from 'react-native-router-flux';

const CardItem = (props) => {
    const onPressAction = (id) => {
        Actions.DetailCard({ id: id })
    }
    return (
        <Ripple
            style={styles.cardItemWrap}
            rippleColor="#fff"
            onPress={() => { onPressAction(props.id) }}
        >
            <View style={styles.imgCardWrap}>
                <Image
                    source={{ uri: props.photo }}
                    style={styles.imgCard}
                />
            </View>
            <View style={{
                paddingVertical: 5,
                paddingHorizontal: 7
            }}>
                <Text numberOfLines={2} style={[styles.titleCard, { fontFamily: "Poppins-Regular" }]}>{props.nama_barang}</Text>
                <Text style={[styles.priceCard, { fontFamily: "Poppins-SemiBold", color: "#60a3bc" }]}>{convertToIDR(props.harga)}</Text>
            </View>
            <View style={styles.ratingWrap}>
                {props.qty > 0 ? (
                    <Text style={{ fontSize: 11.5, color: '#27ae60', fontFamily: "Poppins-SemiBold" }}>Stok {props.qty}</Text>
                ) : (
                    <Text style={{ fontSize: 11.5, color: 'red', fontFamily: "Poppins-SemiBold" }}>Stok Habis</Text>
                )}
            </View>
        </Ripple>
    )
}

export default CardItem