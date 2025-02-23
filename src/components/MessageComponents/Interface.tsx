import useListPeople from "../../hooks/useListPeople";

const Interface = () => {

   
    const { peopleList, loading } = useListPeople()
    

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
                                    {loading ? null : (person.online ? (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    ) : (<div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>))}

                                </div>

                                {/* Content */}
                                <div className="ml-4 flex-1">
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
                        ))}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Interface
