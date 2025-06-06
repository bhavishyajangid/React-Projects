import React, { useId, useReducer, useRef, useState } from 'react'
import authService from '../appwrite/auth'
import {Button , Input} from '../export'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { login } from '../Store/authSlice'
import { useDispatch } from 'react-redux'
const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [error , setError] = useState('')
   // using react-form library for handle form 
    const {register, handleSubmit} = useForm()

    // making signup funcationalty
    const Signup = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='w-4/5 h-[70vh] max-lg:w-11/12 m-auto flex items-center justify-center'>
     <div className=' flex flex-col items-center gap-5 p-5 '>
     <h1 className='text-3xl text-[#414753] prata-regular'>Sign Up <span className='inline-block w-9 max-sm:h-[1.5px] h-[2px] bg-gray-900'></span></h1>
     {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
     <form onSubmit={handleSubmit(Signup)} className=' flex flex-col gap-5 items-center'>
        <Input
        className='w-96 h-10 border border-black border-solid outline-none px-2' 
        placeholder='Name' 
        {...register("username", {
        required: true,
        })}
        />
        
        <Input  
        className='w-96 h-10 border border-black border-solid outline-none px-2' 
        placeholder='Email' 
        type='email' 
        {...register("email", {
            required: true,
            validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            }
        })}
        />

        <Input  
        className='w-96 h-10 border border-black border-solid outline-none px-2' 
        placeholder='Password' 
        {...register("password", {
            required: true,
        })}
        />

        <div className='w-full flex items-center justify-between '>
            <Link to="/login">
            <button className='text-xs'>Login account</button>
            </Link>
        </div>

        <Button className='w-96 h-10 rounded-md bg-black text-white' type='submit'>
            Sign Up
        </Button>
     </form>
     </div>
    </div>
  )
}

export default Signup