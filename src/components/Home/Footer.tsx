import { FC } from 'react'

const Footer:FC = () => {
    return (
        <>
            <div className="mt-16 grid grid-cols-1  justify-center md:grid-cols-2  gap-8 max-w-4xl ">
                <div className="text-center text-white justify-self-center ">
                    <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
                    <p className="text-blue-100">Your messages are secure and private</p>
                </div>
                <div className="text-center text-white justify-self-center">
                    <h3 className="font-semibold mb-2">Real-time Chat</h3>
                    <p className="text-blue-100">Instant messaging with no delays</p>
                </div>
            </div>
        </>
    )
}

export default Footer
