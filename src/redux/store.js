import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user/userSlice.js";



export const store = configureStore(
    {
        reducer:userSlice
    }
)

