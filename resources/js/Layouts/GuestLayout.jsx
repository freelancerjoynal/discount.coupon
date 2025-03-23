import { ToastContainer } from "@/Components/shared/Toast/ToastContainer";
import { init } from "@/Plugins/template/app.js";
import { useEffect } from "react";
export default function Guest({ children }) {
    useEffect(() => {
        init();
    }, []);
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[rgb(251,251,251)]">
            <ToastContainer />
            {/* Main Content Starts */}
            <main className="w-full max-w-md p-4 sm:p-6">{children}</main>
            {/* Main Content Ends */}
        </div>
    );
}
