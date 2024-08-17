import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./reducer/songReducer";
import userReducer from "./reducer/userReducer";


export const store = configureStore({
    reducer:{
        songReducer,
        userReducer
    }
})