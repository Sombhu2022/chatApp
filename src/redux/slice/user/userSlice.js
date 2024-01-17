import { createSlice } from "@reduxjs/toolkit"
import { allUsers, createUser, loginUser, logoutUser } from "./userController"
import { toast } from "react-toastify"

const initialState  ={
    users:[],
    user:{},
    isAuthenticate:false ,
    status:'ideal',
    error:'null'
}


export const userSlice = createSlice({
    name:'user',
    initialState ,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase( createUser.pending , (state , action)=>{
             state.status = 'loading'
        })
        .addCase(createUser.fulfilled , (state , action)=>{
            state.isAuthenticate = true 
            state.status = 'success'
            state.user = action.payload.data.user
            console.log(action.payload.data);
            toast.success(action.payload.data.message);

        })
        .addCase(createUser.rejected , (state , action)=>{
            state.error =action.error.message
            state.status = "failed"
            console.log(action.error);
            toast.error(action.error.message);

        })

        //log in user 
        .addCase( loginUser.pending , (state , action)=>{
             state.status = 'loading'
        })
        .addCase(loginUser.fulfilled , (state , action)=>{
            state.isAuthenticate = true 
            state.status = 'loginSuccess'
            state.user = action.payload.data.user
            console.log(action.payload.data);
            toast.success(action.payload.data.message);
            

        })
        .addCase(loginUser.rejected , (state , action)=>{
            state.error =action.error.message
            state.status = "failed"
            console.log(action.error);
            toast.error(action.error.message);

        })
        
        //logout user
        .addCase( logoutUser.pending , (state , action)=>{
            state.status = 'loading'
       })
       .addCase(logoutUser.fulfilled , (state , action)=>{
           state.isAuthenticate = false
           state.status = 'logoutSuccess'
           state.user = {}
           console.log(action.payload.data);
           toast.success(action.payload.data.message);

       })
       .addCase(logoutUser.rejected , (state , action)=>{
           state.error =action.error.message
           state.status = "failed"
           console.log(action.error);
           toast.error(action.error.message);

       })

        //all uesrs
        .addCase(allUsers.pending , (state , action)=>{
            state.status = 'loading'
        })
        .addCase(allUsers.fulfilled , (state , action)=>{
            state.status = 'success'
            state.users = action.payload.data.user
            state.user = action.payload.data.loginuser
            console.log(action.payload.data)
            toast.success(action.payload.data.message);
        })
        .addCase(allUsers.rejected , (state , action)=>{
            state.status = 'failed'
            state.error = action.error.message
            // console.log(action.error.message)
            toast.success(action.error.message);

        })

    }
})


export default userSlice.reducer