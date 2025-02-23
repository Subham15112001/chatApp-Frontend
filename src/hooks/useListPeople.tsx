import { useEffect, useState } from 'react'
import { api } from "../api/axios"
import useSocket from './useSocket'

interface PeopleListType {
    email: string,
    id: number,
    lastSeen: string,
    username: string,
    online?: boolean
}

const useListPeople = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [peopleList, setPeopleList] = useState<PeopleListType[]>()
    const socket = useSocket()

    useEffect(() => {
        const controller = new AbortController();

        const fetchPeople = async () => {
            setLoading(true)
            try {
                const response = await api.get("/users/all-users", {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log(response)
                setPeopleList(response.data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        const handleConnect = () => {
            fetchPeople()
        }

        if (socket) {

            if (socket.connected) {
                fetchPeople()
            }

            socket.on("connect", handleConnect)
        }

        return () => {

            if (socket) {
                controller.abort()
                socket.off("connect", handleConnect)
            }
        }
    }, [socket])

    return { peopleList, loading, setPeopleList }
}

export default useListPeople
