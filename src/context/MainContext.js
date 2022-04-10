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

    return (
        <MainContext.Provider value={{
            loading: [isLoading, setIsLoading],
            scene: [currentScene, setCurrentScene],
            backend_url: [backendURL, setBackendURL],
            token_access: [tokenAccess, setTokenAccess],
            token_refresh: [tokenRefresh, setTokenRefresh],
            data_profil: [profil, setProfil],
        }}>
            {props.children}
        </MainContext.Provider>
    )
}