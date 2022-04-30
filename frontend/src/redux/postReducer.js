import { createSlice } from "@reduxjs/toolkit";
export const postSlice = createSlice({
    name: "allPosts",
    initialState: [],
    reducers:{
        putposts: (state,action)=>{
           return action.payload
        },
        addone:(state,action)=>{
            state.push(action.payload)
        }
        }
})
export const {putposts, addone} = postSlice.actions;
export default postSlice.reducer;