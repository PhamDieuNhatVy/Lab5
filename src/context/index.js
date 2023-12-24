import React, { createContext, useContext, useReducer, useMemo } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const MyContext = createContext();

// Đặt tên tùy chỉnh cho context
MyContext.displayName = "MyContextContext";

// Reducer của React
function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, userLogin: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Provider của React Context
function MyContextControllerProvider({ children }) {
  const initialState = {
    userLogin: null,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

// React custom hook for using context
function useMyContextController() {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error(
      "useMyContextController should be used inside the MyContextControllerProvider."
    );
  }

  return context;
}

// Collections
const USERS = firestore().collection("USERS");
const SERVICES = firestore().collection("SERVICES");

// Actions
const login = (dispatch, email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() =>
      USERS.doc(email)
        .onSnapshot((u) => {
          const value = u.data();
          console.log("Login Successfully with user:", value);
          dispatch({ type: "USER_LOGIN", value });
        })
    )
    .catch((e) => alert("Sai user và password"));
};

const logout = (dispatch) => {
  dispatch({ type: "USER_LOGIN", value: null });
};

const createNewService = (newService) => {
  newService.finalUpdate = firestore.FieldValue.serverTimestamp();
  SERVICES.add(newService)
    .then(() => alert("Add new service!"))
    .catch((e) => alert(e));
};

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout,
  createNewService,
};
