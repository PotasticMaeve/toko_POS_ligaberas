import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Routes from "./src/Routes";
import Orientation from 'react-native-orientation';
import { MainProvider } from "./src/context/MainContext";

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  return (
    <MainProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Routes />
    </MainProvider>
  )
}

export default App