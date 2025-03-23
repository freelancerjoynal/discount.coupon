import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear(); // Dynamically fetch the current year

    return (
        <footer className="footer" style={{ background: "rgb(48, 48, 48)" }}>
            <p className="text-sm">
                Copyright {currentYear} - Balash Coupons, Erbil.
                <a
                    className="text-primary-500 hover:underline"
                    href="https://getadmintoolkit.com"
                    target="_blank"
                ></a>
            </p>

            <p className="flex items-center gap-1 text-sm">
            </p>
        </footer>
    );
}