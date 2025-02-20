import { FC } from 'react'
import { NavLink } from "react-router"
const AuthButtons: FC = () => {
    return (
        <>
            <div className="space-y-4 w-full max-w-xs">
                <NavLink to={"/login"}>
                <button
                    className="w-full px-6 py-3 bg-gray-300 hover:bg-white font-semibold rounded-lg transition-colors mb-1.5"
                >
                    <span className="text-blue-600">Log In</span>
                </button>
                </NavLink>
                <NavLink to={"/signup"}>
                <button
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg border-2 border-blue-700 transition-colors"
                >
                    <span className="text-white">Sign Up</span>
                </button>
                </NavLink>
            </div>
        </>
    )
}

export default AuthButtons
