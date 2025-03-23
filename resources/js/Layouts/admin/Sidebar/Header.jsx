import React from "react";
import logo from "@/assets/images/updated_logo.png";

export const Header = () => {
    return (
        <>
            <a href="/">
                <div className="sidebar-header flex items-center justify-center">
                    <div className="sidebar-logo-icon ">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-[120px] w-[120px] object-contain"
                        />
                    </div>
                </div>
            </a>
        </>
    );
};
