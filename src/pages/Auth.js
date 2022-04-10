import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Easing, ActivityIndicator } from 'react-native'
import { View, Dimensions, StyleSheet, Animated, Text, Image, Keyboard } from "react-native"
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Ripple from 'react-native-material-ripple'
import Icon from "react-native-vector-icons/Entypo"
import { Actions } from 'react-native-router-flux'
import { MainContext } from '../context/MainContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("screen")

const Auth = () => {
    const { backend_url, token_access, token_refresh, data_profil } = useContext(MainContext)
    const [backendURL] = backend_url
    const [tokenAccess, setTokenAccess] = token_access
    const [profil, setProfil] = data_profil
    const [tokenRefresh, setTokenRefresh] = token_refresh
    const [screenAnimation] = useState(new Animated.Value(height))
    const [inputAnimation] = useState(new Animated.Value(0))
    const [loginActive, setLoginActive] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    const sendData = () => {
        if (username !== "" && password !== "") {
            setIsLoading(true)
            Keyboard.dismiss()
            axios.post(`${backendURL}/api/v1/token/`, {
                username: username,
                password: password
            }).then((res) => {
                const access = res.data.access
                const refresh = res.data.refresh
                if (access) {
                    setTokenAccess(access)
                    setTokenRefresh(refresh)
                    setProfil({ ...profil, username: username })
                    setIsLoading(false)
                }
            })
        }
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
                    <Animated.View style={[styles.inputContainer, animatedInput, { height: height / 1.9 }]}>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, styles.title]}>login</Text>
                        <View style={{ marginVertical: 20 }}>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Username"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    name="username"
                                    value={username}
                                    onChangeText={new_text => setUsername(new_text)}
                                />
                            </View>
                            <View style={[styles.input, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                                {showPass ? (
                                    <TextInput
                                        placeholder="Password"
                                        style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", width: "85%" }}
                                        spellCheck={false}
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        value={password}
                                        name="password"
                                        onChangeText={new_text => setPassword(new_text)}
                                    />
                                ) : (
                                    <TextInput
                                        placeholder="Password"
                                        style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", width: "85%" }}
                                        spellCheck={false}
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        secureTextEntry
                                        value={password}
                                        name="password"
                                        onChangeText={new_text => setPassword(new_text)}
                                    />
                                )}
                                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                                    {showPass ? (
                                        <Icon name="eye-with-line" size={20} color="#eb8937" />
                                    ) : (
                                        <Icon name="eye" size={20} color="#eb8937" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Ripple
                                rippleColor="#fff"
                                onPress={() => sendData()}
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
                                    {isLoading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={{ textTransform: "uppercase", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>login</Text>
                                    )}
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
                        <View style={{
                            width: width / 1.25,
                            marginTop: 15,
                            borderRadius: 10,
                        }}
                        >
                            <Ripple
                                rippleColor="#eaeaea"
                                onPress={() => Actions.Config()}
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
                                    <Text style={{ textTransform: "uppercase", fontSize: 14, color: "#eb8937", fontFamily: "Poppins-SemiBold" }}>config</Text>
                                </View>
                            </Ripple>
                        </View>
                    </Animated.View>
                </View >
            ) : (
                <View style={[styles.centerAlign, { backgroundColor: "rgba(210, 210, 210, .9)", height: height }]}>
                    <Animated.View style={[styles.inputContainer, animatedInput, { height: height / 1.9 }]}>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, styles.title]}>register</Text>
                        <View style={{ marginVertical: 20 }}>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Username"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Email"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Password"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCapitalize='none'
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