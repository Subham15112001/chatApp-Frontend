import { useEffect, useState } from 'react'
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useSocket = () => {

    const [socket, setSocket] = useState<Socket | null>(null)
    const userId = useSelector((state: RootState) => state.user.userData?.id)

    useEffect(() => {

        if (!userId) return

        const main = async () => {
            let socketInitialise = io(`http://localhost:8000?userId=${userId}`)

            setSocket(socketInitialise)

            socketInitialise?.on("connect", () => {
                console.log(socketInitialise.id)
            })
        }
        main()
        return () => {
            socket?.disconnect()
        }
    }, [userId])
    return socket
}

export default useSocket
