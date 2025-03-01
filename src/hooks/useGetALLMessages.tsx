import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { api } from '../api/axios'
import { saveMessages, messsageType } from "../features/messages/messagesSlice";

const useGetALLMessages = () => {

    const roomId = useSelector((state: RootState) => state.messages.roomId)
    const senderId = useSelector((state:RootState) => state.messages.senderId)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!roomId || !senderId) return

        const main = async () => {
            let response = await api.get(`/messages/all-message/${roomId}`, {
                withCredentials: true
            })
            let responseData: messsageType[] = response.data.data
            dispatch(saveMessages(responseData))
        }

        main()


    }, [roomId,senderId])
    return
}

export default useGetALLMessages
