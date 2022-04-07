import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from '../stylesheets/Main'
import { convertToIDR } from '../Helper';
import { Actions } from 'react-native-router-flux';
import ShimmerCard from './ShimmerCard';

const getImage = (imgName) => {
    if (imgName === "kecap") {
        return require("../../assets/images/kecap.jpg")
    }
    if (imgName === "gula") {
        return require("../../assets/images/gula.jpg")
    }
    if (imgName === "susu") {
        return require("../../assets/images/susu.jpeg")
    }
    if (imgName === "tepung") {
        return require("../../assets/images/tepung.jpg")
    }
    if (imgName === "teh") {
        return require("../../assets/images/teh.jpg")
    }
}

const CardItem = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [])

    if (isLoading) {
        return (
            <ShimmerCard />
        )
    } else {
        return (
            <Ripple
                style={styles.cardItemWrap}
                rippleColor="#fff"
                onPress={() => Actions.DetailCard()}
            >
                <View style={styles.imgCardWrap}>
                    <Image
                        source={getImage(props.nama)}
                        style={styles.imgCard}
                    />
                </View>
                <View style={{
                    paddingVertical: 5,
                    paddingHorizontal: 7
                }}>
                    <Text numberOfLines={2} style={[styles.titleCard, { fontFamily: "Poppins-Regular" }]}>{props.title}</Text>
                    <Text style={[styles.priceCard, {fontFamily: "Poppins-SemiBold"}]}>{convertToIDR(props.price)}</Text>
                </View>
                <View style={styles.ratingWrap}>
                    <Text style={{ fontSize: 11.5, color: '#27ae60', fontFamily: "Poppins-SemiBold" }}>Stok {props.stock}</Text>
                </View>
            </Ripple>
        )
    }
}

export default CardItem