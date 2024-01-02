import React, { useEffect, useState } from 'react'
import '../register/register.scss'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../redux/slice/user/userController'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

const navigate = useNavigate()
const [user , setUser] = useState({}) 
const dispatch = useDispatch()
const status = useSelector(state => state.status)

const handleData = (e)=>{
     
    setUser({...user , [e.target.name]:e.target.value})
   }

const loginHendeler =async(e)=>{
    e.preventDefault();
    try {
        
      const data = dispatch(loginUser(user))
      console.log(data , status)
      
    } catch (error) {
        
    }
}   

useEffect(()=>{
   if(status === "loginSuccess"){
        navigate('/')
      }
},[status])

  return (
    <div className='register_container'>
          <form action="" className='auth-form re' onSubmit={loginHendeler}>
      <input
    type='email'
    name='email'
    id='email'
    placeholder='Email'
    onChange={handleData}
  />
  <input
    type='password'
    name='password'
    id='pass1'
    placeholder='Password '
    onChange={handleData}
  />
  <button type='submit'> Log in </button>

  </form>
</div>
  )
}

export default LoginForm