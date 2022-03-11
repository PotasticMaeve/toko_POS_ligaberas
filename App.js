import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Routes from "./src/Routes";
import Orientation from 'react-native-orientation';

const App = () => {

  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Routes />
    </>
  )
}

export default App