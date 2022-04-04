import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import Routes from "./src/Routes";
import Orientation from 'react-native-orientation';
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  return (
    <RootSiblingParent>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Routes />
    </RootSiblingParent>
  )
}

export default App