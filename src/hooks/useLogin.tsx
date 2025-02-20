import  { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router'
import { api } from '../api/axios'
import { login } from "../features/user/userSlice";
import axios from 'axios'

interface userDataType {
    email: string,
    password: string
}

type userResType = RootState['user']['userData']

const useLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const [errorCode, setErrorCode] = useState<number>(0)

    const loginUser = async (userData: userDataType) => {

        setLoading(true)

        try {
            let response = await api.post("/users/login",
                userData,
                {
                    withCredentials: true
                }
            )

            response =  response.data
           
            let email:string = response?.data?.user?.email
            let password: string = response?.data?.user?.password
            let accessToken: string = response.data?.accessToken
            let id:number = parseInt(response.data?.user?.id)
            let username:string = response.data?.user.username

            let resData: userResType = {
                email,
                password,
                accessToken,
                id,
                username
            }
            
            dispatch(login(resData))
            setErrorCode(201)
            navigate("/",{replace:true})
        } catch (error ) {
            if (axios.isAxiosError(error)){
                setErrorCode(error.status!)
            }
        }finally{
            setLoading(false)
        }
    }
    
    return {loginUser,loading,errorCode}
}

export default useLogin
