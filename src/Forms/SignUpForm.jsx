import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input ,Logo} from '../component/index';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Loading from '../component/Loading';


function SignUpForm() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                }
                navigate("/login")
                
            }
        } catch (error) {
            setError(error.message)
        }
    }

    if(!create){
        return <Loading />;
    }
    return (
        <div className=' flex items-center justify-center'>
            <div className={` mx-auto w-full shadow-2xl max-w-lg bg-gray-100 rounded-xl p-7 border border-black/10`}>
                <div className=' mb-5 flex justify-center '>
                    <span>
                        <Logo />
                    </span>
                </div>
                <h2 className=' text-center text-2xl font-bold leading-light'>Create new Account</h2>
                <p className=' mt-1 text-center text-base text-black/60 mb-5'>
                    Already have an account?&nbsp;
                    <Link to='/login'
                        className=' font-medium text-primary transition-all duration-200 hover:underline'>
                        Login
                    </Link>
                </p>
                {error && <p className=' text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className=' space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            className =" shadow-lg"
                            {...register("name", {
                                required: true
                            })}
                        />
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
                            className = " shadow-lg"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            className=' w-full text-black shadow-2xl bg-slate-500 rounded-full hover:bg-gray-400'
                            type='submit'
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm;