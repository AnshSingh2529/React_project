import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import authService from '../appwrite/auth';
import {Button,Input, Logo} from '.././component/index';
import login from '../store/authSlice';
import {useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';

function SignUpForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();


    const ClickSignUp = async(info) => {
        setError("");
        try {
           const userData = await authService.createAccount(info)
           if(userData){
            const userData = await authService.getCurrentUser()
            if(userData) dispatch(login(userData));
            navigate("/")
           }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex item-center justify-center'>
        <div className={`mx-auto max-w-lg w-full bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%" />
                </span>
        </div>
        <h2 className='text-center text-2xl leading-tight font-bold'>Sign up to create new Account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                <Link
                 to='/login' 
                 className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign In
                </Link>
            </p>

            {error && <p className='text-red-50 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(ClickSignUp)} className='mt-8'>
                <div className='space-y-5'>
                    <Input  
                    label = "Full Name:"
                    placeholder="Enter your name"
                    {...register("name",{
                        required:true
                    })}
                    />

                    <Input 
                    label = "Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required:true,
                        validate:{
                            matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) 
                            || "Email must be a valid address"
                        }
                    })}
                    />

                    <Input 
                    label = "Password"
                    placeholder="Enter your password"
                    {...register("password",{
                        required:true
                    })}
                    />

                    <Button 
                    type='submit'
                    className='w-full'
                    >
                        Create Account
                    </Button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default SignUpForm