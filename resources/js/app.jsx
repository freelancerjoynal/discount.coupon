import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = import.meta.env.VITE_APP_NAME || "Balash Coupons";

// Function to dynamically load the Google Translate script
const loadGoogleTranslate = () => {
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
};

// Google Translate initialization function
const googleTranslateElementInit = () => {
    if (window.google) {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en", // Default language
                includedLanguages: "en,es,fr,bn,ar", // Supported languages
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element" // Target element ID
        );
    }
};

createInertiaApp({
    title: (title) => `${title} ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <div id="app-container">
                    <App {...props} />
                    {/* Google Translate widget */}
                    <div id="google_translate_element" style={{ marginTop: "20px" }}></div>
                </div>
            </>
        );

        // Load Google Translate script and initialize
        loadGoogleTranslate();
        window.googleTranslateElementInit = googleTranslateElementInit;
    },
    progress: {
        color: "#4B5563",
    },
});
