import { useCallback, useEffect } from 'react'
import { saveSender, saveSenderTypes } from "../features/messages/messagesSlice";
import useSocket from './useSocket';
import { useDispatch } from 'react-redux';



const useJoinRoom = () => {

    const socket = useSocket()
    const dispatch = useDispatch()

    const joinRoom = useCallback((data: saveSenderTypes) => {
        const senderId = data.senderId
        const roomId = data.roomId
        dispatch(saveSender({ senderId, roomId }))
    }, [])

    useEffect(() => {
        if (!socket) return;

        socket.on("roomCreated", joinRoom)

        return () => {
            socket.off("roomCreated", joinRoom)
        }
    }, [socket, joinRoom])

    return
}

export default useJoinRoom
