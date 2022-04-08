import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Easing } from 'react-native'
import { View, Dimensions, StyleSheet, Animated, Text, Image } from "react-native"
import { TextInput } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Ripple from 'react-native-material-ripple'
import { Actions } from 'react-native-router-flux'
import { MainContext } from '../context/MainContext'

const { width, height } = Dimensions.get("screen")

const Config = () => {
    const { backend_url } = useContext(MainContext)
    const [backendURL, setBackendURL] = backend_url
    const [screenAnimation] = useState(new Animated.Value(height))
    const [inputAnimation] = useState(new Animated.Value(0))

    const animatedContainer = {
        height: screenAnimation
    }

    const animatedInput = {
        transform: [
            {
                translateY: inputAnimation
            }
        ]
    }

    const animateContainer = () => {
        Animated.timing(screenAnimation, {
            toValue: height / 3,
            duration: 500,
            easing: Easing.elastic(1)
        }).start()
    }

    useEffect(() => {
        animateContainer()
    }, [])

    const colorGradient = ['#f3a337', '#eb8937']

    return (
        <Animated.View style={[styles.container, animatedContainer]}>
            <View style={[styles.centerAlign, { height: "100%" }]}>
                <Image source={require("../../assets/images/bg-auth.jpg")} />
            </View>
            <View style={[styles.centerAlign, { backgroundColor: "rgba(210, 210, 210, .9)", height: height }]}>
                <Animated.View style={[styles.inputContainer, animatedInput, { height: height / 3.3 }]}>
                    <Text style={[{ fontFamily: "Poppins-SemiBold" }, styles.title]}>config</Text>
                    <View style={{ marginVertical: 20 }}>
                        <View style={styles.input}>
                            <TextInput
                                placeholder="backend url"
                                style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                spellCheck={false}
                                autoCorrect={false}
                                name="url"
                                value={URL}
                                onChangeText={new_text => setBackendURL(new_text)}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Ripple
                            rippleColor="#fff"
                            onPress={() => Actions.Auth()}
                        >
                            <LinearGradient
                                colors={colorGradient}
                                style={{
                                    width: width / 1.25,
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ textTransform: "uppercase", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>save</Text>
                            </LinearGradient>
                        </Ripple>
                    </View>
                </Animated.View>
            </View >
        </Animated.View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    centerAlign: {
        justifyContent: "center",
        alignItems: "center",
        width: width,
    },
    inputContainer: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        padding: 20,
        marginTop: -height / 1.6,
        borderRadius: 20,
        shadowColor: "#000",
        width: width / 1.1,
        height: height / 2,
        shadowColor: '#aaa',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        textTransform: "uppercase",
        textAlign: "center",
        color: "#6d6875"
    },
    input: {
        width: "100%",
        backgroundColor: "#fafafa",
        height: 45,
        borderRadius: 8,
        justifyContent: "center",
        marginVertical: 10,
        shadowColor: '#aaa',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 3,
        shadowRadius: 1,
        elevation: 2,
        paddingHorizontal: 10
    }
})

export default Config