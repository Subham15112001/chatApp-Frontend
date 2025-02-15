import React, { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from "../store/store";

interface ProctectRoutesTypes {
    children:ReactNode,
    protectedRoutes:boolean
}
const ProctectRoutes:React.FC<ProctectRoutesTypes> = ({children,protectedRoutes = true}):ReactNode => {
    
    const navigate = useNavigate()
    const [loader,setLoader] = useState<boolean>(true)
    const authStatus = useSelector((state:RootState) => state.user.status)

    useEffect(() => {
         
        if(protectedRoutes && !authStatus){ // protected routes and not login so send to login page
            navigate("/login")
        }else if(!protectedRoutes && authStatus){ // not protected route and login so send to home
            navigate("/")    
        }

        setLoader(false)
    },[navigate,authStatus,protectedRoutes])

  return (
    <>
    {loader?<><div className='text-2xl text-blue-950'>...Loading</div></>:<>{children}</>}
    </>
  )
}

export default ProctectRoutes
