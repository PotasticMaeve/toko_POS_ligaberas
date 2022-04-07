import React, { useEffect, useState } from 'react'
import { Easing, TouchableOpacity } from 'react-native'
import { View, Dimensions, StyleSheet, Animated, Text, Image } from "react-native"
import { TextInput } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Ripple from 'react-native-material-ripple'
import s from "../stylesheets/Main"

const { width, height } = Dimensions.get("screen")

const Auth = () => {
    const [screenAnimation] = useState(new Animated.Value(height))
    const [inputAnimation] = useState(new Animated.Value(0))
    const [loginActive, setLoginActive] = useState(true)

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
            {loginActive ? (
                <View style={[styles.centerAlign, { backgroundColor: "rgba(210, 210, 210, .9)", height: height }]}>
                    <Animated.View style={[styles.inputContainer, animatedInput, { height: height / 2.2 }]}>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, styles.title]}>login</Text>
                        <View style={{ marginVertical: 20 }}>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Username"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    />
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Password"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Ripple
                                rippleColor="#fff"
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
                                    <Text style={{ textTransform: "uppercase", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>login</Text>
                                </LinearGradient>
                            </Ripple>
                        </View>
                        <View style={{
                            width: width / 1.25,
                            marginTop: 15,
                            borderRadius: 10,
                        }}
                        >
                            <Ripple
                                rippleColor="#eaeaea"
                                onPress={() => setLoginActive(false)}
                            >
                                <View style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 7,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 1.5,
                                    borderColor: "#eb8937",
                                }}>
                                    <Text style={{ textTransform: "uppercase", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>register</Text>
                                </View>
                            </Ripple>
                        </View>
                    </Animated.View>
                </View >
            ):(
                <View style={[styles.centerAlign, { backgroundColor: "rgba(210, 210, 210, .9)", height: height }]}>
                    <Animated.View style={[styles.inputContainer, animatedInput, { height: height / 1.9 }]}>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, styles.title]}>register</Text>
                        <View style={{ marginVertical: 20 }}>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Nama Lengkap"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Email"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Password"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: "center", marginTop: 4 }}>
                            <Ripple
                                rippleColor="#fff"
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
                                    <Text style={{ textTransform: "uppercase", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>register</Text>
                                </LinearGradient>
                            </Ripple>
                        </View>
                        <View style={{
                            width: width / 1.25,
                            marginTop: 15,
                            borderRadius: 10,
                        }}
                        >
                            <Ripple
                                rippleColor="#eaeaea"
                                onPress={() => setLoginActive(true)}
                            >
                                <View style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 7,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 1.5,
                                    borderColor: "#eb8937",
                                }}>
                                    <Text style={{ textTransform: "uppercase", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>login</Text>
                                </View>
                            </Ripple>
                        </View>
                    </Animated.View>
                </View >

            )}
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

export default Auth