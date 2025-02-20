import { FC,useEffect,useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { MessageCircle } from "lucide-react";
import { InputElement, ButtonElement } from "./index";
import { NavLink } from 'react-router-dom';
import useRegister from '../hooks/useRegister'

interface inputTypes {
    email: string,
    password: string,
    rePassword:string,
    username:string
}

const SignUp: FC = () => {
    const { register, handleSubmit } = useForm<inputTypes>({
        defaultValues: {
            email: "example@gmail.com",
            password: "",
            rePassword:"",
            username:""
        }
    });

    const [errorMessage, setErrorMessage] = useState<string>("")
    const {registerUser,loading,errorCode} = useRegister()

    const onSubmit: SubmitHandler<inputTypes> = async (data: inputTypes) => {
        if(data.password !== data.rePassword){
            setErrorMessage("passwords do not match")
            return
        }

        if (!loading) {
            await registerUser({
                email:data.email,
                password:data.password,
                username:data.username
            })
        }
    }

    useEffect(() => {
        if (errorCode >= 200 && errorCode <= 299) {
            setErrorMessage("")
        } else if (errorCode === 408) {
            setErrorMessage("All field are neccessary")
        } else if (errorCode === 409) {
            setErrorMessage("user already exists")
        }else{
            setErrorMessage("An error occured")
        }
    },[errorCode])


    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center p-4">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <MessageCircle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Hello There!</h1>
                </div>

                {/* Register Form */}
                <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-8">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <InputElement label='Email' type='email' placeholder='Enter Your Email'
                            {...register("email", {
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                            })}
                            
                        />

                        <InputElement label='Username' type='text' placeholder='Enter Your username'
                            {...register("username", {
                                required: true,
                            })}
                            autoComplete='username'
                        />

                        <InputElement label='Password' type='password' placeholder='Enter Your password'
                            {...register("password", {
                                required: true,
                            })}
                            autoComplete="new-password"
                        />

                        <InputElement label='Password' type='password' placeholder='Re-Enter Your password'
                            {...register("rePassword", {
                                required: true,
                            })}
                            autoComplete="Re-password"
                        />

                        <ButtonElement type='submit' >
                            Sign Up
                        </ButtonElement>

                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {errorMessage}
                        </p>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <NavLink to={"/login"} className="text-blue-600 hover:text-blue-500 font-medium">
                                Sign In
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
