import React, { useState } from 'react'
import { View } from 'react-native'
import Ripple from 'react-native-material-ripple'
import CardItem from '../components/CardItem'
import MenuItem from '../components/MenuItem'
import styles from '../stylesheets/Main'

export const MainContext = React.createContext()

export const MainProvider = (props) => {
    const [backendURL, setBackendURL] = useState("http://192.168.18.48:8000")
    const [tokenAccess, setTokenAccess] = useState("")
    const [tokenRefresh, setTokenRefresh] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [currentScene, setCurrentScene] = useState("")
    const [profil, setProfil] = useState({})
    const [produk, setProduk] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [favorite, setFavorite] = useState([])
    const [cart, setCart] = useState([
        {
            id: 1,
            nama: "kecap",
            qty: 1,
            title: "bango kecap manis refil 550 ml",
            price: 23000,
            stock: 5,
            total: 0
        },
        {
            id: 2,
            nama: "gula",
            qty: 1,
            title: "gulaku hijau 1 kg premium",
            price: 15000,
            stock: 8,
            total: 0
        },
        {
            id: 3,
            nama: "susu",
            qty: 1,
            title: "susu diamond uht full cream 1 liter / susu UHT diamond",
            price: 15000,
            stock: 4,
            total: 0
        },
    ])

    return (
        <MainContext.Provider value={{
            loading: [isLoading, setIsLoading],
            scene: [currentScene, setCurrentScene],
            data_cart: [cart, setCart],
            data_wishlist: [wishlist, setWishlist],
            backend_url: [backendURL, setBackendURL],
            token_access: [tokenAccess, setTokenAccess],
            token_refresh: [tokenRefresh, setTokenRefresh],
            data_profil: [profil, setProfil],
            data_produk: [produk, setProduk],
            id_favorite: [favorite, setFavorite]
        }}>
            {props.children}
        </MainContext.Provider>
    )
}