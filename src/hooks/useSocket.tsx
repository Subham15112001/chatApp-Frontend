import { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useSocket = () => {

    const [socket, setSocket] = useState<Socket | null>(null)
    const userId = useSelector((state: RootState) => state.user.userData?.id)
  

    useEffect(() => {

        if (!userId) return


        let socketInitialise = io(`http://localhost:8000?userId=${userId}`)

        const upDateSocket = () => {
            setSocket(socketInitialise)
        }
        socketInitialise?.on("connect", upDateSocket)

        return () => {
            if (socket) {
                socket?.off("connect", upDateSocket)
            }
        }
    }, [userId])
    return socket
}

export default useSocket
