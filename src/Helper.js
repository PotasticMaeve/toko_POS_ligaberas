import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage, hideStatusBar, statusBarHeight } from "react-native-flash-message";

const convertToIDR = (numb) => {
    const format = numb.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('')
    return rupiah
}

const setStorage = (key, value) => {
    AsyncStorage.setItem(key, JSON.stringify(value))
}

const setRefreshToken = () => {
    AsyncStorage.getItem("tokenRefresh").then(data => {
        if (data !== null) {
            let tokenRefresh = JSON.parse(data)
            axios
            .post(`${backendURL}/api/v1/token/refresh/`, {
                refresh: tokenRefresh
            })
            .then(res => {
                tokenAccess = res.data.access
                setStorage("tokenAccess", tokenAccess)
            })
        }
    })
}

export const toast = (msg, type) => {
    showMessage({
        message: msg,
        type: type,
        statusBarHeight: 20,
        style: {
            paddingTop: 30,
            justifyContent: "flex-end",
            alignItems: "center"
        },
        titleStyle: {
            textTransform: "capitalize",
            fontFamily: "Poppins-Medium"
        }
    });
}

module.exports = {
    convertToIDR: convertToIDR,
    setStorage: setStorage,
    setRefreshToken: setRefreshToken,
    toast: toast
}
