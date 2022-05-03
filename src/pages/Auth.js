import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Easing, ActivityIndicator } from 'react-native'
import { View, Dimensions, StyleSheet, Animated, Text, Image, Keyboard } from "react-native"
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import Ripple from 'react-native-material-ripple'
import Icon from "react-native-vector-icons/Entypo"
import { MainContext } from '../context/MainContext'
import { toast, setStorage } from '../Helper'

const { width, height } = Dimensions.get("screen")

const Auth = () => {
    const { backend_url, authorized } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isAuthorized, setIsAuthorized] = authorized
    const [screenAnimation] = useState(new Animated.Value(height))
    const [inputAnimation] = useState(new Animated.Value(0))
    const [loginActive, setLoginActive] = useState(true)
    const [usernameLogin, setUsernameLogin] = useState("")
    const [usernameRegister, setUsernameRegister] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")
    const [nama, setNama] = useState("")
    const [email, setEmail] = useState("")
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

    const login = async () => {
        setIsLoading(true)
        if (usernameLogin !== "" && passwordLogin !== "") {
            Keyboard.dismiss()
            await axios.post(`${backendURL}/api/v1/token/`, {
                username: usernameLogin,
                password: passwordLogin
            }).then((res) => {
                if(res.status === 200){
                    const access = res.data.access
                    const refresh = res.data.refresh
                    if (access) {
                        toast(`Selamat Datang, ${usernameLogin}`, "success")
                        setIsAuthorized(true)
                        setStorage("tokenAccess", access)
                        setStorage("tokenRefresh", refresh)
                        setStorage("customerUsername", usernameLogin)
                        setIsLoading(false)
                    }
                }
            }).catch((err) => {
                if(err.response.status === 401){
                    toast("Login Gagal", "danger")
                    setIsLoading(false)
                }
            })
        }else{
            toast("Form Wajib Diisi", "info")
            setIsLoading(false)
        }
    }

    const register = () => {
        if (usernameRegister !== "" && email !== "" && nama !== "" && passwordRegister !== "") {
            setIsLoading(true)
            Keyboard.dismiss()
            axios.post(`${backendURL}/api/v1/customer/`, {
                username: usernameRegister,
                password: passwordRegister,
                email: email,
                nama: nama
            }).then(() => {
                toast("Register Berhasil", "success")
                setIsLoading(false)
            }).catch((err) => {
                if(err.response.status === 401){
                    toast("Register Gagal", "danger")
                    setIsLoading(false)
                }
            })
        }else{
            toast("Form Wajib Diisi", "info")
            setIsLoading(false)
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
                    <Animated.View style={[styles.inputContainer, animatedInput, { height: height / 2.2 }]}>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, styles.title]}>login</Text>
                        <View style={{ marginVertical: 20 }}>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Username"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    name="usernameLogin"
                                    value={usernameLogin}
                                    onChangeText={new_text => setUsernameLogin(new_text)}
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
                                        value={passwordLogin}
                                        name="passwordLogin"
                                        onChangeText={new_text => setPasswordLogin(new_text)}
                                    />
                                ) : (
                                    <TextInput
                                        placeholder="Password"
                                        style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", width: "85%" }}
                                        spellCheck={false}
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        secureTextEntry
                                        value={passwordLogin}
                                        name="passwordLogin"
                                        onChangeText={new_text => setPasswordLogin(new_text)}
                                    />
                                )}
                                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                                    {showPass ? (
                                        <Icon name="eye" size={20} color="#eb8937" />
                                    ) : (
                                        <Icon name="eye-with-line" size={20} color="#eb8937" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Ripple
                                rippleColor="#fff"
                                onPress={() => login()}
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
                    </Animated.View>
                </View >
            ) : (
                <View style={[styles.centerAlign, { backgroundColor: "rgba(210, 210, 210, .9)", height: height }]}>
                    <Animated.View style={[styles.inputContainer, animatedInput, { height: height / 1.6 }]}>
                        <Text style={[{ fontFamily: "Poppins-SemiBold" }, styles.title]}>register</Text>
                        <View style={{ marginVertical: 20 }}>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Username"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    name="usernameRegister"
                                    value={usernameRegister}
                                    onChangeText={new_text => setUsernameRegister(new_text)}
                                />
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="nama"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    name="nama"
                                    value={nama}
                                    onChangeText={new_text => setNama(new_text)}
                                />
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    placeholder="Email"
                                    style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium" }}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    name="Email"
                                    value={email}
                                    onChangeText={new_text => setEmail(new_text)}
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
                                        value={passwordRegister}
                                        name="passwordRegister"
                                        onChangeText={new_text => setPasswordRegister(new_text)}
                                    />
                                ) : (
                                    <TextInput
                                        placeholder="Password"
                                        style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", width: "85%" }}
                                        spellCheck={false}
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        secureTextEntry
                                        value={passwordRegister}
                                        name="passwordRegister"
                                        onChangeText={new_text => setPasswordRegister(new_text)}
                                    />
                                )}
                                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                                    {showPass ? (
                                        <Icon name="eye" size={20} color="#eb8937" />
                                    ) : (
                                        <Icon name="eye-with-line" size={20} color="#eb8937" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", marginTop: 4 }}>
                            <Ripple
                                rippleColor="#fff"
                                onPress={() => register()}
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
                                        <Text style={{ textTransform: "uppercase", fontSize: 14, color: "#fff", fontFamily: "Poppins-SemiBold" }}>register</Text>
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