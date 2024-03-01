import React, { createContext, useContext, useReducer } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Initialize Firebase Authentication

const firebaseConfig = {
  apiKey: "AIzaSyDFxSQZ3HaK_teemN52D63_jZLgZ7PtuDs",
  authDomain: "worlvoyage.firebaseapp.com",
  projectId: "worlvoyage",
  storageBucket: "worlvoyage.appspot.com",
  messagingSenderId: "577498487485",
  appId: "1:577498487485:web:981c80b632eaeb33fdf5d4",
  measurementId: "G-L30J69N93J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "register":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: "",
      };

    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: "",
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case "error":
      return { ...state, error: action.payload };

    case "resetError":
      return { ...state, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Save the access token to local storage
        localStorage.setItem("accessToken", user.accessToken);
        dispatch({ type: "register", payload: user });
        console.log(user);
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: `Account already exists with this email.`,
        });
      });
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "login", payload: user });
      })
      .catch((error) => {
        dispatch({ type: "error", payload: `Invalid email or password.` });
      });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  function resetError() {
    dispatch({ type: "resetError", payload: "" });
  }

  return (
    <AuthContext.Provider
      value={{
        register,
        user,
        isAuthenticated,
        login,
        logout,
        error,
        resetError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
