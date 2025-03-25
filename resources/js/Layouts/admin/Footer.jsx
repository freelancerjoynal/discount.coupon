import React from "react";

export default function Footer() {
    return (
        <footer className="footer fixed bottom-0 w-full" style={{ background: "rgb(48, 48, 48)" }}>
            <p className="text-sm">
                Copyright {new Date().getFullYear()} - Balash Coupons, Erbil.
                <a
                    className="text-primary-500 hover:underline"
                    href="https://getadmintoolkit.com"
                    target="_blank"
                ></a>
            </p>

            <p className="flex items-center gap-1 text-sm">
                {/* Add any additional content here */}
            </p>
        </footer>
    );
}
