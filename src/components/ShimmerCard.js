import React from 'react'
import { View } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import styles from '../stylesheets/Main';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const ShimmerCard = () => {
    return (
        <View style={styles.cardItemWrap}>
            <ShimmerPlaceHolder shimmerColors={colorShimmer} style={styles.imgCardWrap} />
            <View style={{
                paddingVertical: 5,
                paddingHorizontal: 7
            }}>
                <ShimmerPlaceHolder
                    shimmerColors={colorShimmer}
                    style={{
                        width: "90%",
                        borderRadius: 5
                    }}
                />
                <ShimmerPlaceHolder
                    shimmerColors={colorShimmer}
                    style={{
                        width: "75%",
                        marginTop: 3,
                        borderRadius: 5
                    }}
                />
                <ShimmerPlaceHolder
                    shimmerColors={colorShimmer}
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
                        shimmerColors={colorShimmer}
                        style={{
                            width: 30,
                            borderRadius: 5
                        }}
                    />
                    <ShimmerPlaceHolder
                        shimmerColors={colorShimmer}
                        style={{
                            width: 40,
                            borderRadius: 5
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default ShimmerCard