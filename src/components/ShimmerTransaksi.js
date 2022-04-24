import React, { useState } from 'react'
import { View, TouchableHighlight } from 'react-native'
import styles from '../stylesheets/Main'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const ShimmerTransaksi = (props) => {
    const [existTransaksi] = useState(props.exist)

    if (existTransaksi) {
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
                    <View style={{ height: '100%', width: '100%', position: 'relative' }}>
                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    height: 15,
                                    width: "60%",
                                    borderRadius: 5
                                }}
                            />
                        </View>
                        <View style={{ width: '100%', marginTop: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        height: 15,
                                        width: "25%",
                                        borderRadius: 5
                                    }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        height: 15,
                                        width: "30%",
                                        borderRadius: 5
                                    }}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        height: 15,
                                        width: "50%",
                                        borderRadius: 5
                                    }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 7,
                                        height: 15,
                                        width: "30%",
                                        borderRadius: 5
                                    }}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        height: 15,
                                        width: "50%",
                                        borderRadius: 5
                                    }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 7,
                                        height: 15,
                                        width: "30%",
                                        borderRadius: 5
                                    }}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        height: 15,
                                        width: "30%",
                                        borderRadius: 5
                                    }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 7,
                                        height: 15,
                                        width: "30%",
                                        borderRadius: 5
                                    }}
                                />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        height: 15,
                                        width: "30%",
                                        borderRadius: 5
                                    }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 7,
                                        height: 15,
                                        width: "40%",
                                        borderRadius: 5
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    } else {
        return <></>
    }
}

export default ShimmerTransaksi