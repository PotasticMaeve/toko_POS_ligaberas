import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from '../stylesheets/Main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { convertToIDR } from '../Helper';
import { Actions } from 'react-native-router-flux';
import ShimmerCard from './ShimmerCard';
import { MainContext } from '../context/MainContext';

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
    const { loading } = React.useContext(MainContext)
    const [ isLoading, setIsLoading ] = loading
    
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