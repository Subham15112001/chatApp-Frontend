import useSocket from "./useSocket"
import { useSelector, useDispatch } from "react-redux"

import { useEffect } from 'react'
import { RootState } from "../store/store"
import { messsageType, addMessage } from "../features/messages/messagesSlice";

type receiveMessageType = {
    senderId: number,
    receiverId: number,
    roomId: number,
    message: string,
    time: string,
    id: number
}
const useReceiveMessage = () => {

    const socket = useSocket()
    const dispatch = useDispatch()
    const roomId = useSelector((state: RootState) => state.messages.roomId)
    const userId = useSelector((state: RootState) => state.user.userData?.id)

    const handleReceiveMessage = (data: receiveMessageType) => {

        if (roomId === data.roomId) {
            let obj: messsageType = {
                sender: (userId === data.senderId) ? true : false,
                id: data.id,
                text: data.message,
                time: data.time
            }
            dispatch(addMessage(obj))
            return
        }

    }

    useEffect(() => {
        if (socket) {
            socket.on("receiveMessage", handleReceiveMessage)

            return () => {
                socket.off("receiveMessage", handleReceiveMessage)
            }
        }
    }, [socket, roomId])
    return
}

export default useReceiveMessage
