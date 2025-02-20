import { api } from '../api/axios'
import { useState } from 'react';
import { RootState } from '../store/store';
import { useDispatch,useSelector } from 'react-redux';
import { updateData } from '../features/user/userSlice';

const useRefreshToken = () => {

   
    const [loading, setLoading] = useState<boolean>(false)
    let prevData = useSelector((state: RootState) => state.user.userData)
    const dispatch = useDispatch()

    const refresh = async () => {

        setLoading(true)
        try {
            let response = await api.get("/users/refresh-token", {
                withCredentials: true
            })

            console.log(response)
            response = response.data

            let accessToken: string = response.data?.accessToken

            if(!prevData) return 

            prevData = {...prevData,accessToken}
            dispatch(updateData(prevData))
            
            return 

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }
    return { refresh, loading }
}

export default useRefreshToken
