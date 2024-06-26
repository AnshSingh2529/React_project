import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Logo, Input } from '../component/index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import Loading from '../component/Loading';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError('');
        try {
            // Call the login function from authService
            const session = await authService.UserLogin(data.email, data.password);
            if (session) {
                // Fetch current user data after successful login
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                }
                navigate('/');
            }
        }
        catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className=' flex items-center justify-center w-full'>
            <div className=' mx-auto rounded-xl shadow-2xl w-full max-w-lg bg-gray-100 p-10 border-black/10'>
                <div className=' mb-2 flex justify-center '>
                    <span>
                        <Logo />
                    </span>
                </div>
                <h2 className=' text-center text-2xl font-bold leading-light'>Sign in to your Account</h2>
                <p className=' mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link to='/signup' className=' font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className=' text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className=' mt-8'>
                    <div className=' space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            className=" shadow-lg"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^(?=.{1,64}@.{4,253}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Email address must be a valid address"
                                }
                            })}
                        />

                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            className=" shadow-lg"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type='submit'
                            className=' w-full shadow-2xl text-black bg-slate-500 rounded-full hover:bg-gray-400'
                            
                        >
                            sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;