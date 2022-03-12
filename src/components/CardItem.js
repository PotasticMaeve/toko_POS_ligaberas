import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import Ripple from 'react-native-material-ripple'
import styles from '../stylesheets/Main'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { convertToIDR } from '../Helper';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
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
    const [isLoading, setIsLoading] = useState(true)
    const imgShimmer = React.createRef()
    const title1Shimmer = React.createRef()
    const title2Shimmer = React.createRef()
    const priceShimmer = React.createRef()
    const ratingShimmer = React.createRef()
    const saleShimmer = React.createRef()

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [])

    if (isLoading) {
        return (
            <View
                style={styles.cardItemWrap}
            >
                <ShimmerPlaceHolder
                    shimmerColors={["#ececec", "#d0d0d0", "#ececec"]}
                    ref={imgShimmer}
                    style={{
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
                </ShimmerPlaceHolder>
                <View style={{
                    paddingVertical: 5,
                    paddingHorizontal: 7
                }}>
                    <ShimmerPlaceHolder 
                        shimmerColors={["#ececec", "#d0d0d0", "#ececec"]}
                        ref={title1Shimmer}
                        style={{ 
                            width: "90%",
                            borderRadius: 5
                        }}
                    />
                    <ShimmerPlaceHolder 
                        shimmerColors={["#ececec", "#d0d0d0", "#ececec"]}
                        ref={title2Shimmer}
                        style={{ 
                            width: "75%",
                            marginTop: 3,
                            borderRadius: 5
                        }}
                    />
                    <ShimmerPlaceHolder 
                        shimmerColors={["#ececec", "#d0d0d0", "#ececec"]}
                        ref={priceShimmer}
                        style={{ 
                            width: "40%",
                            marginTop: 7,
                            borderRadius: 5
                        }}
                    />
                    <View style={{
                        position: "absolute",
                        bottom: -30,
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: 8,
                        width: 75,
                        justifyContent: "space-between"
                    }}>
                        <ShimmerPlaceHolder
                            shimmerColors={["#ececec", "#d0d0d0", "#ececec"]}
                            ref={ratingShimmer}
                            style={{ 
                                width: 30,
                                borderRadius: 5
                            }}
                        />
                        <ShimmerPlaceHolder
                            shimmerColors={["#ececec", "#d0d0d0", "#ececec"]}
                            ref={saleShimmer}
                            style={{ 
                                width: 40,
                                borderRadius: 5
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    } else {
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
                    <Text style={[styles.textBold, { textTransform: "capitalize", fontSize: 13, marginVertical: 5 }]}>{convertToIDR(props.price)}</Text>
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
}

export default CardItem