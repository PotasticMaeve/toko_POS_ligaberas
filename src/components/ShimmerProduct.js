import React from 'react'
import { View } from 'react-native'
import styles from '../stylesheets/Main'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const ShimmerProduct = () => {
    return (
        <View style={[styles.cardItemWrap, {
            flexDirection: 'column',
            height: "auto",
            borderRadius: 5,
            backgroundColor: '#fff',
            marginHorizontal: 15,
            marginVertical: 5,
            padding: 10,
            borderRadius: 5
        }]}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <ShimmerPlaceHolder
                    shimmerColors={colorShimmer}
                    style={{
                        width: 100,
                        height: "100%"
                    }}
                />
                <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, justifyContent: 'space-around' }}>
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
        </View>
    )
}

export default ShimmerProduct