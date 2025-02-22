import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import useAxiosPrivate from './useAxiosPrivate'
import { login } from "../features/user/userSlice";
import { replace, useNavigate } from 'react-router';


type userResType = RootState['user']['userData']

const useGetUser = () => {

    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {

            try {
                let response = await axiosPrivate.get('users/refresh-token', {
                    signal: controller.signal
                })

                response = response.data

                let email: string = response?.data?.user?.email
                let password: string = response?.data?.user?.password
                let accessToken: string = response.data?.accessToken
                let id: number = parseInt(response.data?.user?.id)
                let username: string = response.data?.user.username

                let resData: userResType = {
                    email,
                    password,
                    accessToken,
                    id,
                    username
                }

                isMounted && dispatch(login(resData))
                navigate("/messageFrame",{replace:true})
                
            } catch (err) {
                console.log(err)
            }
        }

        getUser();

        () => {
            isMounted = false
            controller.abort()
        }
    }, [])
    return 
}

export default useGetUser

