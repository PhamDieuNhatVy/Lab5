import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyContextControllerProvider from "../src/context/index";


export default function App() {
  useEffect(() => {
    initial();
  }, []);

  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
