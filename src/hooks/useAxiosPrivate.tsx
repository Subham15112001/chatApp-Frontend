import { useEffect } from 'react'
import { axiosPrivate } from '../api/axios'
import useRefreshToken from './useRefreshToken'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logout } from '../features/user/userSlice'
import { RootState } from '../store/store'
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import Cookie from 'js-cookie'
import useLogout from "./useLogout";

const useAxiosPrivate = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const refresh = useRefreshToken()
    const userData = useSelector((state: RootState) => state.user.userData)
    const accessToken = Cookie.get("accessToken")
    const {logoutUser,loading} = useLogout()
   
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                if (!config?.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const prevRequest = error?.config as InternalAxiosRequestConfig

                if (!prevRequest) return Promise.reject(error);
                
                prevRequest.headers['x-retry'] = {}

                if (error.response?.status === 401 && !prevRequest.headers['x-retry']) {
                    try {
                        const newAccessToken = await refresh.refresh();

                        // Ensure headers exist before modifying them
                        prevRequest.headers = prevRequest.headers || new AxiosHeaders();

                        // Mark this request as retried
                        prevRequest.headers['x-retry'] = 'true';

                        // Attach new access token
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        
                        console.log("axios Private try error",prevRequest)
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        console.log("axios Private catch error")
                        dispatch(logout());
                        if (!loading) logoutUser();
                        navigate("/", { replace: true });
                        return Promise.reject(refreshError);
                    }
                }

                if (error.response?.status === 403 || error.response?.status === 401) {
                    dispatch(logout());

                    if(!loading) logoutUser();
                    navigate("/", { replace: true });
                }

                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [userData, refresh, dispatch, navigate])

    return axiosPrivate
}

export default useAxiosPrivate
