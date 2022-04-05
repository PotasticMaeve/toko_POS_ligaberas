import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from '../stylesheets/Main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
                    <Text numberOfLines={2} style={[styles.textMedium, styles.titleCard]}>{props.title}</Text>
                    <Text style={[styles.textBold, styles.priceCard]}>{convertToIDR(props.price)}</Text>
                    <View style={styles.ratingWrap}>
                        <FontAwesome5 name={"star"} solid size={14} color='#FFC400' />
                        <Text style={[styles.textMedium, { fontSize: 12 }]}>{props.star.toString().length === 1 ? props.star + ".0" : props.star}</Text>
                        <Text style={[styles.textMedium, { fontSize: 11.5, color: 'grey' }]}>| Terjual {props.sale}</Text>
                    </View>
                </View>
            </Ripple>
        )
    }
}

export default CardItem