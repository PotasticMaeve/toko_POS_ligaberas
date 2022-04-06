import React, { useState } from 'react'
import { View } from 'react-native'
import Ripple from 'react-native-material-ripple'
import CardItem from '../components/CardItem'
import MenuItem from '../components/MenuItem'
import styles from '../stylesheets/Main'

export const MainContext = React.createContext()

export const MainProvider = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [currentScene, setCurrentScene] = useState("")
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
            data_cart: [cart, setCart]
        }}>
            {props.children}
        </MainContext.Provider>
    )
}