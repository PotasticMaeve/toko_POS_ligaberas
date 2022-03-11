import React from 'react'
import { View, Text, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from '../stylesheets/Main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const getImage = (imgName) => {
    if (imgName === "tas3") {
        return require("../../assets/images/tas3.jpg")
    }
    if (imgName === "sepatu1") {
        return require("../../assets/images/sepatu1.jpg")
    }
    if (imgName === "lampu1") {
        return require("../../assets/images/lampu1.jpg")
    }
    if (imgName === "tepung1") {
        return require("../../assets/images/tepung1.jpg")
    }
    if (imgName === "pan1") {
        return require("../../assets/images/pan1.jpg")
    }
}

const CardItem = (props) => {
    return (
        <Ripple
            style={styles.cardItemWrap}
            rippleColor="#fff"
        >
            <View style={{
                height: "55%",
                width: "100%",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                overflow: "hidden",
                backgroundColor: '#eaeaea',
            }}>
                <Image
                    source={getImage(props.nama)}
                    style={{ height: "100%", width: '100%', resizeMode: 'cover' }}
                />
            </View>
            <View style={{
                paddingVertical: 5,
                paddingHorizontal: 7
            }}>
                <Text numberOfLines={2} style={[styles.textMedium, { textTransform: "capitalize", fontSize: 12 }]}>{props.title}</Text>
                <Text style={[styles.textBold, { textTransform: "capitalize", fontSize: 13, marginVertical: 5 }]}>Rp {props.price}</Text>
                <View style={{
                    position: "absolute",
                    bottom: -30,
                    display: "flex",
                    flexDirection: "row",
                    width: '75%',
                    justifyContent: "space-evenly"
                }}>
                    <FontAwesome5 name={"star"} solid size={14} color='#FFC400' />
                    <Text style={[styles.textMedium, { fontSize: 12 }]}>{props.star.toString().length === 1 ? props.star + ".0" : props.star}</Text>
                    <Text style={[styles.textMedium, { fontSize: 11.5, color: 'grey' }]}>| Terjual {props.sale}</Text>
                </View>
            </View>
        </Ripple>
    )
}

export default CardItem