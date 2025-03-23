import { ToastContainer } from "@/Components/shared/Toast/ToastContainer";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function ShopLayout({ children }) {
    return (
        <div style={{background:"rgb(20,30,25)"}}>
            <ToastContainer />

            <div>
                {/* Header */}
                <Header />

                <div className="relative flex flex-col gap-10 px-8 py-8 font-['Varela_Round'] lg:px-20">
                    <div className="absolute inset-0 bg-[#12161c] bg-opacity-20 backdrop-blur-sm" style={{background:"rgb(20,30,25)"}}></div>
                    {children}
                </div>
            </div>

            <Footer />
        </div>
    );
}
