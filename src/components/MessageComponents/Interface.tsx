import { useEffect, useState } from 'react'
import useSocket from "../../hooks/useSocket"
import useListPeople from "../../hooks/useListPeople";

const Interface = () => {

    const socket = useSocket()
    const { peopleList, loading, setPeopleList } = useListPeople()
    const [onlineUsers, setOnlineUsers] = useState<Set<number>>(new Set<number>())

    useEffect(() => {
        if (socket) {

            socket.on("online-users", (data) => {
                const set = new Set<number>(data)
                setOnlineUsers(set);

            })

            return () => {
                socket.off("online-users")
            }
        }
    }, [socket])

    useEffect(() => {
        if(loading) return
        
        peopleList?.map((val) => {
            if (onlineUsers.has(val.id)) {
                val.online = true;
            } else {
                val.online = false;
            }
            return val
        })
       
        setPeopleList(peopleList)
    }, [onlineUsers,loading])

    const people = [
        {
            id: 1,
            name: "John Doe",
            lastMessage: "Sure, that sounds perfect!",
            time: "2m ago",
            unread: 2,
            online: true,
            avatar: "J"
        },
        {
            id: 2,
            name: "Sarah Wilson",
            lastMessage: "When can we meet?",
            time: "1h ago",
            unread: 0,
            online: true,
            avatar: "S"
        },
        {
            id: 3,
            name: "Mike Johnson",
            lastMessage: "The project is ready for review",
            time: "3h ago",
            unread: 1,
            online: false,
            avatar: "M"
        },
        {
            id: 4,
            name: "Emily Brown",
            lastMessage: "Thanks for your help!",
            time: "1d ago",
            unread: 0,
            online: false,
            avatar: "E"
        },
        {
            id: 5,
            name: "David Clark",
            lastMessage: "See you tomorrow!",
            time: "1d ago",
            unread: 0,
            online: false,
            avatar: "D"
        }
    ];

    return (
        <>
            <div className='h-screen w-screen bg-white flex justify-center items-center'>
                <div className="h-4/5 w-1/4 shadow-blue-600 shadow-lg p-4  flex flex-col bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200">
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
                        {peopleList.map((person) => (
                            <div
                                key={person.id}
                                className="flex items-center p-4 hover:bg-gray-400 transition-colors duration-200 cursor-pointer border-b border-gray-100 border-2 "
                            >
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                        {person.username[0]}
                                    </div>
                                    {person.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                    {!person.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="ml-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-semibold">{person.username}</h2>
                                        {!person.online && <span className="text-sm text-black">{person.lastSeen}</span>}
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
                        ))}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Interface
