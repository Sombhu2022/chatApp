import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { base_url, socket } from '../../../App';
import { Link, useNavigate } from 'react-router-dom';
import defaultDP from './avter1.jpg'
import imagePlaceholder from './avter1.png'
import imageCompression from 'browser-image-compression'

import './register.scss'
import { useDispatch } from 'react-redux';
import { createUser } from '../../../redux/slice/user/userController';

function Register() {
    const [user, setUser] = useState({});
	const [dp , setDp] = useState(defaultDP);
	const navigate = useNavigate()
	const dispatch = useDispatch();

	const handleData = async (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

    const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				setDp(e.target.result);
			};

			reader.readAsDataURL(file);
		} else {
			console.log("Error happened");
		}
	};
    const createNewUser = async (e) => {
		e.preventDefault();

		try {
			if (Object.entries(user).length === 0) {
				return toast.error("plese input valid data....");
			}
			if (!user.name || !user.email || !user.password) {
				return toast.error("name and email and password required....");
			}

			if (user.password.length < 8) {
				return toast.error("password must be 8 characters....");
			}

			if (user.password !== user.cpassword) {
				return toast.error("password and confirm password are not match...");
			}

			// const options = {
			// 	maxSizeMB: 2,
			// 	maxWidthOrHeight: 1920,
			// 	useWebWorker: true,
			// };
		
			// const compressedFile = await imageCompression(dp, options);
			const myForm = new FormData();

			myForm.set("name", user.name);
			myForm.set("email", user.email);
			myForm.set("password", user.password);
			myForm.set("dp", dp);
            
            const data= dispatch(createUser(myForm))
            //   toast.success(data.message);
	        //   console.log(data)
			//   navigate('/')
			  
		} catch (error) {
			console.error("err", error);
			toast.error(error.message);
		}
	};


  return (
    <div className='register_container'>
			<form action='' className='auth-form' onSubmit={createNewUser}>
	

                <label htmlFor='file'><img src={dp} alt="" /></label>
				<input
					className='file-input'
					type='file'
					id='file'
					hidden
					onChange={handleFileChange}
				/>
				<input
					type='name'
					placeholder='Full Name '
					name='name'
					onChange={handleData}
				/>
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
				<input
					type='password'
					name='cpassword'
					id='pass2'
					placeholder='Confirm password'
					onChange={handleData}
				/>
				<button type='submit'> Register </button>
				<hr />
				<b>You have alrady register </b>
				<Link to={"/login"}>
					 Log in 
				</Link>
			</form>
		</div>
  )
}

export default Register