import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native';
import { Text, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from '../stylesheets/Main'
import Space from "../components/Space"
import Ripple from 'react-native-material-ripple';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from "../context/MainContext"
import { toast } from "../Helper"

const colorHeader = ['#f3a337', '#eb8937']

const Pembayaran = (props) => {
    const [profil, setProfil] = useState({})
    const { backend_url } = useContext(MainContext)
    const [backendURL] = backend_url
    const [isLoading, setIsLoading] = useState(false)
    const [saveData, setSaveData] = useState(false)

    const detailProfil = () => {
        setIsLoading(true)
        AsyncStorage.getItem("customerUsername").then(value => {
            if (value !== null) {
                let username = JSON.parse(value)
                axios.get(`${backendURL}/api/v1/customer/?username=${username}`)
                    .then((res) => {
                        setProfil(res.data.data);
                        setIsLoading(false)
                    })
                    .catch((err) => {
                        alert("Gagal Memuat Data Profil")
                    })
            }
        })
    }

    const saveProfil = () => {
        setSaveData(true)
        let data = profil
        let payloadUpdate = {
            ...data,
            nama: profil.nama,
            gender: profil.gender,
            phone: profil.phone,
            alamat: profil.alamat
        }

        let body = JSON.stringify(payloadUpdate)
        axios
            .put(`${backendURL}/api/v1/customer/${profil.customer_id}/`, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                let nama = res.data.nama
                let gender = res.data.gender
                let phone = res.data.phone
                let alamat = res.data.alamat
                toast("Berhasil Menyimpan Profil", "success")
                setSaveData(false)
                setProfil({ ...profil, nama: nama, gender: gender, phone: phone, alamat: alamat });
                props.ResponsiveUpdateProfil && props.ResponsiveUpdateProfil()
            })
            .catch((err) => {
                alert("Gagal Menyimpan Data Profil")
            });
    }

    useEffect(() => {
        detailProfil()
    }, [])

    return (
        <>
            <LinearGradient colors={colorHeader} style={styles.headerWrap, { height: 82, paddingTop: 30, paddingHorizontal: 17, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 16, color: "#fff", marginTop: 5, fontFamily: "Poppins-SemiBold" }}>Pembayaran</Text>
            </LinearGradient>
            <ScrollView style={{ paddingTop: 15, backgroundColor: "#fafafa" }} showsVerticalScrollIndicator={false}>

            </ScrollView>
        </>
    )
}

export default Pembayaran