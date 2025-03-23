import { ToastContainer } from "@/Components/shared/Toast/ToastContainer";
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import About from "./About";
export default function HomLayout({ children }) {
    return (
        <div className="bg-white">
            <ToastContainer />
                {/* <div className="absolute inset-0 h-full bg-black bg-opacity-20 backdrop-blur-sm"></div> */}
                {/* Header */}
                <Header />

            <div>
                <div
                    className="relative bg-cover bg-center bg-no-repeat bg-white"
                    id="shops"
                >
                    <div className="relative flex flex-col gap-10 bg-white">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
