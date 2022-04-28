import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { Action } from "history";

export const postSlice = createSlice({
    name: "allPosts",
    initialState: [],
    reducers:{
        putposts: (state,action)=>{
            state.push(action.payload) 
        },
        decrement: (state,action)=>{
            state.count-=action.payload;
        }
        }
})


export const {putposts,decrement} = postSlice.actions;
export default postSlice.reducer;