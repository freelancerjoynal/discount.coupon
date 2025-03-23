import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'input bg-white border rounded-lg p-2 w-full focus:border-[rgb(253,208,23)] focus:ring-[rgb(253,208,23)] ' +
                className
            }
            ref={input}
        />
    );
});
