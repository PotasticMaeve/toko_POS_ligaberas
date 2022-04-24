import React, { useContext, useEffect, useState } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, View, FlatList, Dimensions, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import axios from 'axios';
import { MainContext } from '../context/MainContext';
import CardItem from '../components/CardItem';
import Ripple from 'react-native-material-ripple';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
const colorShimmer = ["#ececec", "#d0d0d0", "#ececec"]

const colorHeader = ['#f3a337', '#eb8937']
const { width } = Dimensions.get("screen")

const AddProduct = () => {
    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TouchableOpacity onPress={() => Actions.pop()}>
                    <FontAwesome5 name={"angle-left"} size={27} color='#fff' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "#fff", marginLeft: 30, fontFamily: "Poppins-SemiBold", marginTop: 5 }}>Tambah Produk</Text>
            </LinearGradient>
        </>
    )
}

export default AddProduct