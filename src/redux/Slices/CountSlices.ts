import { createSlice } from "@reduxjs/toolkit";



const initialState={count: 0};
const countSlice = createSlice({
    name : "counter",
    initialState,
    reducers:{
        increment : (state)=>{
            state.count++;
        },
        decrement: (state)=>{
            state.count--;
        }
    }
})


export const counterReducer = countSlice.reducer;
export const {increment, decrement} = countSlice.actions;