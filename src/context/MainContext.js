import React, { useState } from 'react'
import { View } from 'react-native'
import Ripple from 'react-native-material-ripple'
import CardItem from '../components/CardItem'
import MenuItem from '../components/MenuItem'
import styles from '../stylesheets/Main'

export const MainContext = React.createContext()

export const MainProvider = (props) => {
    const [backendURL, setBackendURL] = useState("http://192.168.18.50:8000")
    const [isLoading, setIsLoading] = useState(true)
    const [IsAuthorized, setIsAuthorized] = useState(false)
    const [username, setUsername] = useState("")

    return (
        <MainContext.Provider value={{
            loading: [isLoading, setIsLoading],
            backend_url: [backendURL, setBackendURL],
            authorized: [IsAuthorized, setIsAuthorized],
            data_username: [username, setUsername],
        }}>
            {props.children}
        </MainContext.Provider>
    )
}