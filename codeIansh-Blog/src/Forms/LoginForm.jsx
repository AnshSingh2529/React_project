import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import login from '../store/authSlice';
import {Button, Logo, Input } from '.././component/index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';


function LoginForm() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const Clicklogin = async(data) => {
        setError("")
        try {
            const loginSession = await authService.UserLogin(data)
            if(loginSession){
                const userData = authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto max-w-lg w-full bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className='text-center text-2xl leading-tight font-bold'>Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                <Link to='/signup' className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign Up
                </Link>
            </p>

{/* Displaying error */}

                {error && <p className='text-red-50 text-center'>{error}</p>}

{/* here handleSubmit itself a builtIn function you just have to pass your method in it...*/}
            <form onSubmit={handleSubmit(Clicklogin)} className='mt-8'>         
                <div className='space-y-5'>
                    <Input 
                    label = "Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required:true,
                        validate: {
                            matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) 
                            || "Email must be a valid address"
                        }
                    })}
                    />
                    <Input 
                    label = "Password: "
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required:true
                    })}
                    />

                        <Button 
                        type='submit' 
                        className='w-full'>
                            Sign in
                        </Button>
                    
                </div>

            </form>
        </div>
    </div>
  )
}

export default LoginForm