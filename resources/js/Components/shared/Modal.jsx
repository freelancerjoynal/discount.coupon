import { Transition } from "@headlessui/react";
import React, { useEffect, useRef } from "react";

export const Modal = ({ children, title, isOpen, setIsOpen }) => {
    // modal Close when click outside
    const modalRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [setIsOpen]);
    return (
        <div
            className={`modal ${
                isOpen ? "show flex" : ""
            }`}
        >
            <div className="modal-dialog">
                <div className="modal-content" ref={modalRef} style={{background:"rgb(24 36 30)"}}>
                    <div className="modal-header px-4 sm:px-6">
                        <div className="group flex items-center justify-between">
                            <p className="text-white">{title}</p>
                            <button
                                className="rounded-primary bg-red-500 px-2 py-1 text-[10px] font-semibold text-white hover:bg-red-600"
                                onClick={() => setIsOpen(false)}
                            >
                                ESC
                            </button>
                        </div>
                    </div>
                    <div className="modal-body max-h-[600px] px-4 py-6 sm:px-6">
                        {children}
                    </div>
                    <div className="modal-footer px-4 sm:px-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="custom-button bg-gray-200 text-gray-700 hover:bg-gray-200 focus:ring-0"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
