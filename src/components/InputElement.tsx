import  { forwardRef, InputHTMLAttributes, useId } from 'react';

interface InputElementProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string;
}

const InputElement = forwardRef<HTMLInputElement, InputElementProps>(
    ({ label, className, type, placeholder = "", ...props }, ref) => {
        const id = useId();

        return (
            <div className="w-full">
                {label !== "" && (
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={id}
                    ref={ref} // Forward the ref here
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      ${className || ""}`}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
        );
    }
);

// InputElement.displayName = "InputElement"; // Helpful for debugging

export default InputElement;
