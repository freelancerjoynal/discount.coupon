import React, { useEffect, useRef } from "react";
import InputLabel from "./InputLabel";
import InputError from "./InputError";

export const TextAreaGroup = ({
    label,
    name,
    formObject,
    setFormObject,
    validationError,
    className = "",
    placeholder = "Write message....",
}) => {
    const textareaRef = useRef(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [formObject[name]]); // Adjust height when content changes

    return (
        <div className="flex w-full flex-col gap-1">
            <InputLabel htmlFor={name} value={label} className="mb-2" />
            <textarea
                ref={textareaRef}
                className={`textarea bg-white border rounded-lg p-2 w-full focus:border-[rgb(253,208,23)] focus:ring-[rgb(253,208,23)] min-h-[100px] overflow-hidden ${className}`}
                value={formObject[name] || ""}
                placeholder={placeholder}
                id={name}
                onChange={(e) => {
                    setFormObject(name, e.target.value);
                }}
            />
            <InputError message={validationError[name]} className="mt-1" />
        </div>
    );
};
