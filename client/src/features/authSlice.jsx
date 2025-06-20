import {createSlice} from '@reduxjs/toolkit';

import { auth, googleProvider } from "../helper/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";


const initialState = {
    currentUser: {},
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = "";
        }
    }
});
export const {setUser, clearUser} = authSlice.actions;

export default authSlice.reducer;


export const signup = (email, password,displayName,navigate) => {
  createUserWithEmailAndPassword(auth, email, password);
  sessionStorage.setItem("userInfo","true")
  navigate("/")
};

export const login = (email, password,navigate) => {
  signInWithEmailAndPassword(auth, email, password);
  sessionStorage.setItem("userInfo","true")
  navigate("/")
};

export const logout = () => {
  sessionStorage.clear()
  signOut(auth);
  
};

export const loginWithGoogle = (navigate) => {
  googleProvider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      sessionStorage.setItem("userInfo","true")
      navigate("/")
    })
    .catch((error) => {
      console.log(error);
    });
};