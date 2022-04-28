import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { Action } from "history";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogged: false,
        username:''

    },
    reducers:{
        setUser: (state,action)=>{
            state.isLogged= true;
            state.username=action.payload.username;
            state.userID=action.payload.user_id;
        },
        logOut: (state,action)=>{
            state.isLogged=false;
            state.username='';
            state.userID=''
        }
        }
})


export const {setUser,logOut} = userSlice.actions;
export default userSlice.reducer;