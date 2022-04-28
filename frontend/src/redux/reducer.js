import { createSlice } from "@reduxjs/toolkit";
import { Action } from "history";

export const counterSlice = createSlice({
    name: "counter",
    initialState:{
        count: 0
    },
    reducers:{
        increment: (state,Action)=>{
            state.count+=Action.payload;
        },
        decrement: (state,Action)=>{
            state.count-=Action.payload;
        }
        }
})


export const {increment,decrement} = counterSlice.actions;
export default counterSlice.reducer;