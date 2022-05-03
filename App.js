import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Routes from "./src/Routes";
import Orientation from 'react-native-orientation';
import { MainProvider } from "./src/context/MainContext";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait()
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000)
  }, [])

  return (
    <MainProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <FlashMessage position="top" />
    </MainProvider>
  )
}

export default App