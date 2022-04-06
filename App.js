import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Routes from "./src/Routes";
import Orientation from 'react-native-orientation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { MainProvider } from "./src/context/MainContext";

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  return (
    <MainProvider>
      <RootSiblingParent>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <Routes />
      </RootSiblingParent>
    </MainProvider>
  )
}

export default App