import { FC, ReactNode } from 'react'


interface ButtonElementTypes {
    type: "button" | "submit" | "reset",
    className?:string,
    children:ReactNode,
    label?:string
}

const ButtonElement: FC<ButtonElementTypes> = ({type,className="",label,children,...props}) => {
    return (
        <div className='w-full'>
            <button
                type={type}
                className={`w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors ${className}`}
                {...props}
            >
                {children}
            </button>
        </div>
    )
}

export default ButtonElement
