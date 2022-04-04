import React, { useState } from 'react'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import s from "../stylesheets/Main"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';

const SideMenu = () => {
    const [modalShow, setModalShow] = useState(false)
    
    const confirmedLogout = () => {
        setModalShow(false)
        Actions.drawerClose()
        Toast.show('Logout Berhasil', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: "#595959",
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });    
    }

    return (
        <View style={styles.container}>
            <View style={styles.user_bio}>
                <Image source={require("../../assets/images/bg-sidebar.jpg")} resizeMode="cover" style={{ height: 170, width: "100%" }} />
                <View style={styles.user_photo}>
                    <Image source={require("../../assets/images/user.png")} resizeMode="cover" style={{ height: "55%", width: "55%" }} />
                </View>
                <View style={styles.user_name}>
                    <Text style={[styles.username_text, s.textBold, { textAlign: "center", color: "#fff", fontSize: 15 }]}>claudia felicia</Text>
                </View>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity style={[styles.menu_item]} onPress={() => Actions.Profile()}>
                    <FontAwesome5 name={"user-alt"} size={18} color="#e36414" />
                    <Text style={styles.menu_text}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menu_item} onPress={() => Actions.Transaksi()}>
                    <FontAwesome5 name={"receipt"} size={18} color="#e36414" />
                    <Text style={styles.menu_text}>Transaksi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menu_item} onPress={() => setModalShow(true)}>
                    <FontAwesome5 name={"sign-out-alt"} size={18} color="#e36414" />
                    <Text style={styles.menu_text}>Logout</Text>
                </TouchableOpacity>
            </View>
            {modalShow && (
                <Modal
                    isVisible={modalShow} style={{ justifyContent: "center", alignItems: "center" }}>
                    <View
                        style={{
                            backgroundColor: "#fafafa",
                            height: 150,
                            width: 300,
                            borderRadius: 10,
                        }}>
                            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 10 }}>
                                <Icon name="warning" size={40} color="#d90429" />
                                <Text style={[s.textSemiBold, { fontSize: 15 }]}>Yakin ingin keluar dari aplikasi?</Text>
                            </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            position: "absolute",
                            width: "100%",
                            height: 50,
                            bottom: 0
                        }}>
                            <TouchableOpacity
                                style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#eb8937", justifyContent: "center", alignItems: "center" }}
                                onPress={() => setModalShow(false)}
                                >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={s.textSemiBold}>Tidak</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ height: "80%", width: "40%", borderRadius: 50, backgroundColor: "#ddd", justifyContent: "center", alignItems: "center" }}
                                onPress={() => confirmedLogout()}
                                >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={s.textSemiBold}>Ya</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    user_bio: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    user_photo: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height: 70,
        width: 70,
        borderRadius: 100,
        borderWidth: 2.5,
        borderColor: "#fafafa",
    },
    user_name: {
        bottom: 20,
        position: "absolute",
    },
    username_text: {
        fontSize: 16,
        textTransform: "capitalize"
    },
    menu: {
        marginTop: 5,
        paddingHorizontal: 5,
    },
    menu_item: {
        borderRadius: 3,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingVertical: 15,
        marginVertical: 3,
        paddingLeft: 10
    },
    menu_text: {
        fontFamily: "Nunito-Bold",
        color: "#e36414",
        marginLeft: 20
    }
})

export default SideMenu