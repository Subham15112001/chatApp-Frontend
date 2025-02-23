import useAxiosPrivate from './useAxiosPrivate';
import React, { useEffect, useState } from 'react'
import { api } from "../api/axios"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

interface peopleListType {
    email: string,
    id: number,
    lastSeen: string,
    username: string,
    online?: boolean
}
const useListPeople = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [peopleList, setPeopleList] = useState<peopleListType[]>()
    dayjs.extend(relativeTime);
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const controller = new AbortController();
        const main = async () => {

            try {
                setLoading(true)
                const response = await api.get("/users/all-users", {
                    signal: controller.signal,
                    withCredentials: true
                })
                let data = response.data.data

                data = data.map((val: peopleListType) => {
                    if (!val.lastSeen) {
                        val.lastSeen = ""
                        return val
                    }
                    const currentDate = dayjs();
                    const otherDate = dayjs(val.lastSeen);

                    val.lastSeen = currentDate.to(otherDate)

                    return val
                })



                console.log(data)
                setPeopleList(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }

        main()

        return () => {
            controller.abort()
        }

    }, [])
    return { peopleList, loading, setPeopleList }
}

export default useListPeople
