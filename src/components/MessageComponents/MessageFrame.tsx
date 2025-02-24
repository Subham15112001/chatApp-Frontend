import React from 'react'
import Interface from './Interface'
import ChatContainer from './ChatContainer'

const MessageFrame = () => {


    return (
        <>
            <div className='flex flex-row w-screen h-screen justify-center items-center bg-gray-400'>
                <div className='w-2/10 h-7/10'>
                    <Interface />
                </div>
                <div className='w-1/2 h-7/10'>
                    <ChatContainer />
                </div>

            </div>
        </>
    )
}

export default MessageFrame
