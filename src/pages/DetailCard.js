import React, { useState, useEffect, useContext } from 'react'
import { Text, TouchableOpacity, Image, View, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Ripple from 'react-native-material-ripple';
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from '../stylesheets/Main'
import { convertToIDR } from '../Helper';
import axios from 'axios';
import { MainContext } from '../context/MainContext';

const { width, height } = Dimensions.get("window")

const colorHeader = ['#f3a337', '#eb8937']

const DetailCard = (props) => {
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [data, setData] = useState({})
    const [fav, setFav] = useState(false)

    const getData = () => {
        axios.get(`${backendURL}/api/v1/product/${props.id}/`)
            .then((res) => {
                let url = backendURL
                let photo = url + res.data.photo
                setData({ ...res.data, photo: photo });
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const addToWishlist = () => {
        setFav(true)
    }

    const removeFromWishlist = () => {
        setFav(false)
    }

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <View style={{ width: "38%", flexDirection: "row" }}>
                    <TouchableOpacity style={{ marginHorizontal: 11 }} onPress={() => Actions.Search()}>
                        <FontAwesome5 name={"search"} size={19} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 11 }} onPress={() => Actions.Wishlist()}>
                        <Icon name={"heart"} size={19} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginHorizontal: 11 }} onPress={() => Actions.Keranjang()}>
                        <FontAwesome5 name={"shopping-cart"} size={19} color='#fff' />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
                <Image source={{ uri: data.photo }} resizeMode="stretch" style={{ height: 350, width: "100%" }} />
                <View style={{
                    width: "100%",
                    minHeight: 300,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    top: -10,
                    paddingHorizontal: 15,
                    paddingTop: 10,
                    backgroundColor: "#fafafa",
                }}>
                    <Text style={[{ fontFamily: "Poppins-Medium", fontSize: 15, textTransform: "capitalize" }]}>{data.nama}</Text>
                    <Text style={[{ marginVertical: 10, fontFamily: "Poppins-SemiBold", fontSize: 15, textTransform: "capitalize", color: '#60a3bc' }]}>{data.harga && convertToIDR(data.harga)}</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[{ fontFamily: "Poppins-SemiBold", fontSize: 14.5, textTransform: "capitalize", color: '#27ae60' }]}>Deskripsi Produk</Text>
                        <Text style={[{ fontFamily: "Poppins-Medium", fontSize: 13.5, textTransform: "capitalize", color: "#6b705c" }]}>{data.deskripsi}</Text>
                    </View>
                </View>
                <View style={{ height: 100, backgroundColor: "#fafafa", top: -10 }} />
            </ScrollView>
            <View style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 70,
                backgroundColor: "#fafafa",
                paddingHorizontal: 20,
                shadowColor: '#eaeaea',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 1,
                elevation: 3,
            }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                    {fav ? (
                        <Ripple
                            rippleColor="#fff"
                            style={{ height: 40, borderRadius: 8, borderWidth: 1, borderColor: 'red', overflow: 'hidden', justifyContent: "center", alignItems: "center" }}
                            onPress={() => removeFromWishlist()}
                        >
                            <View style={{ padding: 8, margin: 10 }}>
                                <Icon name={"heart"} size={20} color="red" onPress={() => setFav(false)} />
                            </View>
                        </Ripple>
                    ) : (
                        <Ripple
                            rippleColor="#fff"
                            style={{ height: 40, borderRadius: 8, borderWidth: 1, borderColor: 'red', overflow: 'hidden', justifyContent: "center", alignItems: "center" }}
                            onPress={() => addToWishlist()}
                        >
                            <View style={{ padding: 8, margin: 10 }}>
                                <FontAwesome5 name={"heart"} size={20} color="red" onPress={() => setFav(true)} />
                            </View>
                        </Ripple>
                    )}
                    <Ripple rippleColor="#fff" style={{ height: 40, borderRadius: 10, backgroundColor: '#eb8937', overflow: 'hidden', marginLeft: 10, width: "80%", justifyContent: "center", alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontFamily: "Poppins-SemiBold", marginTop: 5, fontSize: 13 }}>Tambah ke Keranjang</Text>
                    </Ripple>
                </View>
            </View>
        </>
    )
}

export default DetailCard