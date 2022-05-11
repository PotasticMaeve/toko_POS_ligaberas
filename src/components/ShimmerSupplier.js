import React from 'react'
import { View } from 'react-native'
import styles from '../stylesheets/Main'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const ShimmerSupplier = () => {
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
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <ShimmerPlaceHolder
                    shimmerColors={colorShimmer}
                    style={{
                        height: 50, 
                        width: 50, 
                        borderRadius: 100
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
                            width: "40%",
                            borderRadius: 5
                        }}
                    />
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            marginTop: 15,
                            width: "80%",
                            borderRadius: 5
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default ShimmerSupplier