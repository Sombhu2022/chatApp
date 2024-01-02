import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../../App";

export const createUser = createAsyncThunk(  "user/createUser"  , async(data)=>{

    const res = await axios.post( `${base_url}/user/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    
   return res
     
})

export const  allUsers = createAsyncThunk("user/allUsers" , async()=>{
    const  data  = await axios.get(`${base_url}/user`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    return data   
})

export const  loginUser = createAsyncThunk("user/loginUsers" , async(data)=>{
    const  res  = await axios.post(`${base_url}/user/login`, data , {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    return res  
})

export const logoutUser = createAsyncThunk("user/logoutUser" , async()=>{
  const res = await axios.get(`${base_url}/user/logout`,{
    headers:{"Content-Type":"application/json" },
    withCredentials:true
  } )
  return res
})