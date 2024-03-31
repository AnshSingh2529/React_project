import React,{useDebugValue, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import login from '../store/authSlice';
import {Button, Logo, Input } from './index'
import { UseDispatch, useDispatch } from 'react-redux';
import authService from '../appwrite/auth'


function LoginForm() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    const dispatch = useDispatch()

    const Clicklogin = async(data) => {
        try {
            const loginSession = await authService.UserLogin(data)
            if(loginSession){
                const UserData = authService.getCurrentUser()
                if(UserData) dispatch(login(UserData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className='mx-auto max-w-lg w-full bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className='text-center text-2xl leading-tight font-bold'>Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                <Link to='/signup' className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign Up
                </Link>
            </p>

{/* Displaying error */}

                {error && <p className='text-red-50 text-center'>{error}</p>}

{/* here handleSubmit itself a builtIn function you just have to pass your method in it...*/}
            <form onSubmit={handleSubmit(Clicklogin)} className='mt-8'>         
                

            </form>
        </div>
    </div>
  )
}

export default LoginForm