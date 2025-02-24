import { useCallback, useEffect, useRef, useState } from "react"
import useListPeople from "../../hooks/useListPeople"
import useSocket from "../../hooks/useSocket"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { saveSender } from "../../features/messages/messagesSlice";

type fetchDataType = {
    roomId:number,
    senderId:number,
    receiverId:number
}

const Interface = () => {

   
    const { peopleList, loading } = useListPeople()
    const socket = useSocket()
    const userId = useSelector((state:RootState) => state.user.userData?.id)
    const senderId = useRef<number>(null)

    const dispatch = useDispatch()

    const fetchData = (data:fetchDataType) => {
        dispatch(saveSender({
            senderId:senderId.current,
            roomId:data.roomId
        }))
    }

    useEffect(() => {
        if(!socket) return;
        
        socket.on("roomCreated",fetchData)

        return () => {
            socket.off("roomCreated",fetchData)
        }

    },[socket])

    const handleClick = useCallback((data:number) =>{
        
        senderId.current = data
       
        if(!socket) return

        socket.emit("joinRoom",{
            user1:data,
            user2:userId
        })

        
    },[socket])

    return (
        <>
            <div className='h-full w-full bg-white flex justify-center items-center'>
                <div className="h-full w-full shadow-blue-600 shadow-lg p-4  flex flex-col bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200">
                    {/* Header */}
                    <div className="bg-white/80 backdrop-blur-sm p-4 shadow-md">
                        <h1 className="text-xl font-bold">Users</h1>
                        {/* <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Search people..."
                                className="w-full px-4 py-2 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div> */}
                    </div>

                    {/* People List */}
                    {peopleList && <div className="flex-1 overflow-y-auto">
                        {peopleList.map((person) => { 
                            
                            
                            return (
                            <div
                                key={person.id}
                                className="flex items-center p-4 hover:bg-gray-400 transition-colors duration-200 cursor-pointer border-b border-gray-100 border-2 "
                            >
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                        {person.username[0]}
                                    </div>
                                    {loading ? null : (person.online ? (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    ) : (<div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>))}

                                </div>

                                {/* Content */}
                                <div className="ml-4 flex-1" onClick={() => handleClick(person.id)}>
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-semibold">{person.username}</h2>
                                        {!loading && !person.online && <span className="text-sm text-black">{person.lastSeen}</span>}
                                    </div>
                                    {/* <div className="flex items-center justify-between mt-1">
                                        <p className="text-sm text-gray-500 truncate">{person.lastMessage}</p>
                                        {person.unread > 0 && (
                                            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {person.unread}
                                            </span>
                                        )}
                                    </div> */}
                                </div>
                            </div>
                        )})}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Interface
