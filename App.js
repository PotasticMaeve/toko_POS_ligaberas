import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Routes from "./src/Routes";
import Orientation from 'react-native-orientation';
import { MainProvider } from "./src/context/MainContext";
import FlashMessage from "react-native-flash-message";

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  return (
    <MainProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Routes />
      <FlashMessage position="top" />
    </MainProvider>
  )
}

export default App