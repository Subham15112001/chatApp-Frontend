import React, { useState } from 'react';

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how are you?", sender: true, time: "09:41" },
    { id: 2, text: "I'm good, thanks! How about you?", sender: false, time: "09:42" },
    { id: 3, text: "Doing great! Want to grab coffee later?", sender: true, time: "09:43" },
    { id: 4, text: "Sure, that sounds perfect!", sender: false, time: "09:44" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: true,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="bg-white shadow-md p-4 flex items-center border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-sm">
          J
        </div>
        <div className="ml-4">
          <h2 className="font-semibold">John Doe</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex flex-col">
              <div
                className={`relative max-w-[70%] px-4 py-3 ${message.sender
                    ? 'bg-blue-500 text-white rounded-t-2xl rounded-bl-2xl rounded-br-lg shadow-md'
                    : 'bg-white text-gray-800 rounded-t-2xl rounded-br-2xl rounded-bl-lg shadow-md border border-gray-100'
                  }`}
              >
                {/* Message tail */}
                <div
                  className={`absolute bottom-0 ${message.sender
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
      <div className="bg-white p-4 shadow-lg border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 resize-none rounded-full bg-gray-100 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200"
            rows={1}
          />
          <button
            onClick={handleSend}
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
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;