/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import MyContextControllerProvider from "../../src/context/index";
import Router from "./src/screens/Router";
import { NavigationContainer } from "@react-navigation/native";

const initial = () => {
  const USERS = firestore().collection("USERS");
  const admin = {
    name: "admin",
    phone: "09111111",
    address: "Binh Duong",
    email: "huutv@tdmu.edu.vn",
    password: "123456",
    role: "admin"
  };

  USERS.doc(admin.email).onSnapshot(u => {
    if (!u.exists) {
      auth().createUserWithEmailAndPassword(admin.email, admin.password)
        .then(() =>
          USERS.doc(admin.email).set(admin)
            .then(() => console.log("Added new admin user!"))
        )
        .catch(error => console.error("Error creating admin:", error));
    }
  });
};

const App = () => {
  useEffect(() => {
    initial();
  }, []);

  return (
    <NavigationContainer>
      <MyContextControllerProvider>
        <Router />
      </MyContextControllerProvider>
    </NavigationContainer>
  );
};

export default App;
