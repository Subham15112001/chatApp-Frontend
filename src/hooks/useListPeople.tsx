
// useListPeople.ts
import { useEffect, useState, useCallback } from 'react';
import { api } from "../api/axios";
import useSocket from './useSocket';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface PeopleListType {
    email: string;
    id: number;
    lastSeen: string;
    username: string;
    online?: boolean;
}

interface OnlineUsersData {
    userId: number;
    status: boolean;
}

const useListPeople = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [peopleList, setPeopleList] = useState<PeopleListType[]>([]);
    const userId = useSelector((state:RootState) => state.user.userData?.id)
    const socket = useSocket();

    const fetchPeople = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get("/users/all-users", {
                withCredentials: true
            });

            response.data.data = response.data.data.filter((val:any) =>{
                return val.id !== userId
            })
            setPeopleList(response.data.data);
        } catch (error) {
            console.error('Error fetching people:', error);
        } finally {
            setLoading(false);
        }
    }, []);

   
    useEffect(() => {
        if (!socket) return;

        // Initial fetch when socket connects
        if (socket.connected) {
            fetchPeople();
        }

        // Event listeners
        socket.on("connect", fetchPeople);
        socket.on("online-users", fetchPeople);

        // Cleanup
        return () => {
            socket.off("connect", fetchPeople);
            socket.off("online-users", fetchPeople);
        };
    }, [socket, fetchPeople]);

    return { peopleList, loading, setPeopleList };
};

export default useListPeople;