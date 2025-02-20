import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { MessageCircle } from "lucide-react";
import { InputElement, ButtonElement } from "./index";
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin'

interface inputTypes {
    email: string,
    password: string
}
const Login: FC = () => {

    const { register, handleSubmit } = useForm<inputTypes>({
        defaultValues: {
            email: "example@gmail.com",
            password: ""
        }
    });

    const [errorMessage, setErrorMessage] = useState<string>("")

    let { loginUser, loading, errorCode } = useLogin()


    const onSubmit: SubmitHandler<inputTypes> = async (data: inputTypes) => {

        if (!loading) {
            await loginUser(data)
        }
    }

    useEffect(() => {
        if (errorCode >= 200 && errorCode <= 299) {
            setErrorMessage("")
        } else if (errorCode === 406) {
            setErrorMessage("user does not exist")
        } else if (errorCode === 407) {
            setErrorMessage("password is incorrect")
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
                    <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
                </div>

                {/* Login Form */}
                <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-8">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <InputElement label='Email' type='email' placeholder='Enter Your Email'
                            {...register("email", {
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

                            })}
                            autoComplete="new-password"
                        />

                        <InputElement label='Password' type='password' placeholder='Enter Your password'
                            {...register("password", {
                                required: true,
                            })}
                            autoComplete="new-password"
                        />

                        <ButtonElement type='submit' >
                            Sign In
                        </ButtonElement>

                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {errorMessage}
                        </p>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to={"/signup"} className="text-blue-600 hover:text-blue-500 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
