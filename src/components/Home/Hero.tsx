import { FC } from 'react'
import { MessageCircle } from "lucide-react";


const Hero: FC = () => {
    return (
        <>
            <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                    <MessageCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    Connect with Anyone, Anywhere
                </h1>
                <p className="text-xl text-blue-100 max-w-md mx-auto">
                    Simple, secure, and reliable messaging for free
                </p>
            </div>
        </>
    )
}

export default Hero
