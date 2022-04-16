import React from 'react'
import { View } from 'react-native';
import { Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Feather'
import styles from '../stylesheets/Main'
import Space from "../components/Space"
import Ripple from 'react-native-material-ripple';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colorHeader = ['#f3a337', '#eb8937']

const DetailPengiriman = () => {
    

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Profil</Text>
            </LinearGradient>
            <View style={{ paddingTop: 15, backgroundColor: "#fff", height: "100%" }}>
                <View style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: '#eaeaea',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: .5,
                    shadowRadius: 1,
                    elevation: 3,
                }}>
                    <View style={{ height: 100, width: 100, borderRadius: 100, overflow: "hidden" }}>
                        <Image source={require("../../assets/images/profile.png")} resizeMode="cover" style={{ height: "100%", width: "100%" }} />
                    </View>
                </View>
                <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <FontAwesome5 name={"user"} size={20} color='#eb8937' />
                        </View>
                        <TextInput
                            placeholder="Nama Lengkap"
                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <FontAwesome5 name={"envelope"} size={20} color='#eb8937' />
                        </View>
                        <TextInput
                            placeholder="Email"
                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Icon name={"phone"} size={20} color='#eb8937' />
                        </View>
                        <TextInput
                            placeholder="No Telp"
                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Icon name={"home"} size={20} color='#eb8937' />
                        </View>
                        <TextInput
                            placeholder="Alamat"
                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Icon name={"map-pin"} size={20} color='#eb8937' />
                        </View>
                        <TextInput
                            placeholder="Kelurahan / Kecamatan"
                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Icon name={"map-pin"} size={20} color='#eb8937' />
                        </View>
                        <TextInput
                            placeholder="Kota"
                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Icon name={"book"} size={20} color='#eb8937' />
                        </View>
                        <TextInput
                            placeholder="Kodepos"
                            style={{ marginLeft: 3, fontSize: 14, color: "#595959", fontFamily: "Poppins-Medium", borderBottomWidth: .5, borderBottomColor: "#ccd", width: "90%", marginLeft: 10 }}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                    </View>
                    <Ripple rippleColor="#fff" style={{ height: 40, width: "100%", marginTop: 10, borderRadius: 10, backgroundColor: '#eb8937', justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                        <Text style={{ fontSize: 14, color: '#fff', fontFamily: "Poppins-SemiBold" }}>Simpan</Text>
                    </Ripple>
                </View>
            </View>
            <Space />
        </>
    )
}

const s = StyleSheet.create({

})

export default DetailPengiriman