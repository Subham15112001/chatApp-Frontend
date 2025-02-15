import { FC } from 'react'

const AuthButtons: FC = () => {
    return (
        <>
            <div className="space-y-4 w-full max-w-xs">
                <button
                    className="w-full px-6 py-3 bg-white hover:bg-blue-50 font-semibold rounded-lg transition-colors"
                >
                    <span className="text-blue-600">Log In</span>
                </button>
                <button
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg border-2 border-blue-700 transition-colors"
                >
                    <span className="text-white">Sign Up</span>
                </button>
            </div>
        </>
    )
}

export default AuthButtons
