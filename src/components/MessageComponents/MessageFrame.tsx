
import Interface from './Interface'
import ChatContainer from './ChatContainer'
import useGetAllMessages from '../../hooks/useGetALLMessages'
import useReceiveMessage from '../../hooks/useReceiveMessage'

const MessageFrame = () => {

    useGetAllMessages()
    useReceiveMessage()
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
