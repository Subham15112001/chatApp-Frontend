import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {  useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useSocket from '../../hooks/useSocket';


interface inputType {
  inputText: string
}

type sendMessageType = [
  senderId: number,
  receiverId: number,
  roomId: number,
  message: string
]

const ChatContainer = () => {

  let messages = useSelector((state: RootState) => state.messages.messages)
  let socket = useSocket()

  let senderId = useSelector((state: RootState) => state.messages.senderId)
  let userId = useSelector((state: RootState) => state.user.userData?.id)
  let roomId = useSelector((state: RootState) => state.messages.roomId)

  const containerRef = useRef<HTMLDivElement>(null)


  const { register, handleSubmit, reset } = useForm<inputType>({
    defaultValues: {
      inputText: ""
    }
  })

  useEffect(() => {
    // Scroll to bottom when component mounts or content changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit: SubmitHandler<inputType> = (data) => {
    
    if (!senderId || !userId || !roomId) return;

    const sendObj: sendMessageType = [userId, senderId, roomId, data.inputText]
    socket?.emit("sendMessage", sendObj)

    reset()
  }



  return (
    <div className="flex flex-col h-full w-full bg-gray-100 shadow-blue-600 shadow-lg ml-2 rounded-2xl">
      {/* Chat Header */}
      <div className="bg-white shadow-md p-4 flex items-center border-b border-gray-200 rounded-2xl">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-sm">
          J
        </div>
        <div className="ml-4">
          <h2 className="font-semibold">John Doe</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 rounded-2xl flex-col-reverse " ref={containerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex flex-col">
              <div
                className={`relative  w-max px-4 py-3 ${message.sender
                  ? 'bg-blue-500 text-white rounded-t-2xl rounded-bl-2xl rounded-br-lg shadow-md'
                  : 'bg-gray-400/70 text-gray-800 rounded-t-2xl rounded-br-2xl rounded-bl-lg shadow-md border border-gray-100'
                  }`}
              >
                {/* Message tail */}
                <div
                  className={`absolute bottom-0 w-max ${message.sender
                    ? '-right-2 border-l-[10px] border-l-transparent border-b-[10px] border-b-blue-500'
                    : '-left-2 border-r-[10px] border-r-transparent border-b-[10px] border-b-white'
                    }`}
                  style={{
                    content: '""',
                    width: 0,
                    height: 0,
                    borderStyle: 'solid'
                  }}
                />
                {message.text}
              </div>
              <span className={`text-xs text-gray-500 mt-1 ${message.sender ? 'text-right' : 'text-left'}`}>
                {message.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="bg-white p-4 shadow-lg border-t border-gray-200 rounded-2xl">
        <form className="flex items-center space-x-2" onSubmit={handleSubmit(onSubmit)} >
          <textarea

            placeholder="Type a message..."
            className="flex-1 resize-none rounded-full bg-gray-100 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200"
            rows={1}
            {...register("inputText")}
          />
          <button
            type='submit'
            className="rounded-full bg-blue-500 p-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 shadow-md"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;