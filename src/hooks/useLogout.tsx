import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router'
import { api } from '../api/axios'
import { logout } from "../features/user/userSlice";



const useLogout = () => {

    const [loading, setLoading] = useState<boolean>(false)

 
    const logoutUser = async () => {
        setLoading(true)
        try {
            const response = await api.post("/users/logout",
                {
                    withCredentials: true
                })
            console.log(response)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }

    }

    return { logoutUser,loading }
}

export default useLogout
