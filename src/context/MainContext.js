import React, { useState } from 'react'

export const MainContext = React.createContext()

export const MainProvider = (props) => {
    const [backendURL, setBackendURL] = useState("http://192.168.18.23:7000")
    // const [backendURL, setBackendURL] = useState("http://192.168.18.60:8000")
    const [isLoading, setIsLoading] = useState(true)
    const [IsAuthorized, setIsAuthorized] = useState(false)
    const [closeCheckout, setCloseCheckout] = useState(false)
    const [backtoShop, setBacktoShop] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <MainContext.Provider value={{
            loading: [isLoading, setIsLoading],
            backend_url: [backendURL, setBackendURL],
            authorized: [IsAuthorized, setIsAuthorized],
            close_checkout: [closeCheckout, setCloseCheckout],
            back_to_shop: [backtoShop, setBacktoShop],
            is_admin: [isAdmin, setIsAdmin],
        }}>
            {props.children}
        </MainContext.Provider>
    )
}