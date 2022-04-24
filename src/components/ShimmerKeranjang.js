import React from 'react'
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import styles from '../stylesheets/Main'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

class ShimmerKeranjang extends React.Component {
    render() {
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
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    width: 100,
                                    height: "100%"
                                }}
                            />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, justifyContent: 'space-around' }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        width: "60%",
                                        borderRadius: 5
                                    }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 7,
                                        width: "45%",
                                        borderRadius: 5
                                    }}
                                />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        marginTop: 15,
                                        width: "30%",
                                        borderRadius: 5
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <View style={{ flexDirection: "row", width: "40%", justifyContent: 'space-around' }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        height: 30,
                                        borderRadius: 100,
                                        width: 30
                                    }}
                                />
                                <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", width: 30, justifyContent: 'center', alignItems: "center" }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorShimmer}
                                        style={{
                                            height: 20,
                                            borderRadius: 5,
                                            width: "100%"
                                        }}
                                    />
                                </View>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorShimmer}
                                    style={{
                                        height: 30,
                                        borderRadius: 100,
                                        width: 30
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ display: 'flex', justifyContent: "space-between", flexDirection: 'row', marginTop: 10, justifyContent: "space-around", borderTopWidth: 1, borderTopColor: "#ccc", width: "100%", paddingTop: 10 }}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    height: 20,
                                    borderRadius: 5,
                                    width: "10%"
                                }}
                            />
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    height: 20,
                                    borderRadius: 5,
                                    width: "25%"
                                }}
                            />
                            <ShimmerPlaceHolder
                                shimmerColors={colorShimmer}
                                style={{
                                    height: 20,
                                    borderRadius: 5,
                                    width: "35%"
                                }}
                            />
                        </View>
                    </>
                </TouchableHighlight>
            </View>
        )
    }
}

const s = StyleSheet.create({
    buttonAmount: {
        height: 30,
        width: 30,
        backgroundColor: "#fb8b24",
        borderRadius: 50,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 2,
    }
})

export default ShimmerKeranjang