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

    return(
        <MainContext.Provider value={{
            loading: [isLoading, setIsLoading],
            scene: [currentScene, setCurrentScene]
        }}>
            {props.children}
        </MainContext.Provider>
    )
}