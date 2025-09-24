import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./Slices/CountSlices";




export const store = configureStore({
    reducer:{
        counter : counterReducer
        
    }
})