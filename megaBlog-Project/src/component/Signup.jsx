import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Input , Button , Logo} from '../component/index'
import { Login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const Signup = () => {
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const { register, handleSubmit} = useForm()
        const [error , setError] = useState('')
        const createAccount = async(data) => {
            try {
                 const userData = await authService.createAccount(data)
                 if(userData){
                      const currentUser = await authService.getCurrentUser()
                      if(currentUser) dispatch(authLogin(userData))
                      navigate('/')
                 }
            } catch (error) {
                setError(error.message)
            }
        }


  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Already&apos; have any account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(createAccount)} className='mt-8'>
            <div className='space-y-5'>
                
                <Input
                label="Name: "
                placeholder="Enter your name"
                type="email"
                {...register("name", {
                    required: true,
                })}
                />
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Create account</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Signup