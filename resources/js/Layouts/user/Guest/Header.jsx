import { Icon } from "@iconify-icon/react";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import sharedComposable from "@/Composables/sharedComposable";
import logo from "@/assets/images/updated_logo.png";
import flag1 from "@/images/frontend/1.png";
import flag2 from "@/images/frontend/2.jpg";
import flag3 from "@/images/frontend/3.png";
import "./CustomResponsiveCss.css";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export default function Header() {
    const { logout } = sharedComposable();
    const auth = usePage().props?.auth;
    const [dashboard, setDashboard] = useState(route("login"));
    const { t } = useTranslation();

    useEffect(() => {
        if (auth.user && auth.role) {
            switch (auth.role) {
                case "admin":
                    setDashboard(route("admin.coupons.index"));
                    break;
                case "shop":
                    setDashboard(route("shop.coupons.index"));
                    break;
                case "user":
                    setDashboard(route("user.coupons.index"));
                    break;
                default:
                    setDashboard(route("login"));
                    break;
            }
        }
    }, [auth]);

    const urls = [
        {
            name: t("shops"),
            url: "/#shops",
        },
        {
            name: t("about"),
            url: "#about",
        },
        {
            name: t("contact"),
            url: "#contact",
        },
    ];

    if (auth?.user) {
        urls.push({
            name: auth.role === "admin" ? t("admin") : t("dashboard"),
            url: dashboard,
        });
    }

    const langs = [
        {
            id: "ar",
            // flag: "circle-flags:iq",
            flag: flag1,
            url: "/locale/ir",
        },
        {
            id: "iq",
            // flag: "circle-flags:ku",
            flag: flag2,
            url: "/locale/ar",
        },
        {
            id: "en",
            // flag: "circle-flags:uk",
            flag: flag3,
            url: "/locale/en",
        },
    ];

    const lanSwitch = (lng) => {
        console.log(lng);
        i18n.changeLanguage(lng);
    };

    // useEffect(() => {
    //     document.body.dir = i18n.dir();
    // }, [i18n, i18n.language]);

    const [isMobileMenu, setMobileMenu] = useState(false);

    // PWA install logic
    const [installPromptEvent, setInstallPromptEvent] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isIos, setIsIos] = useState(false);
    const [showIosPrompt, setShowIosPrompt] = useState(false);

    useEffect(() => {
        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIos(isIosDevice);

        // Listen for the 'beforeinstallprompt' event
        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            setInstallPromptEvent(event);
            setIsInstallable(true); // Show the install button
        });
    }, []);

    const handleInstallClick = () => {
        if (installPromptEvent) {
            installPromptEvent.prompt();
            installPromptEvent.userChoice.then((choiceResult) => {
                setInstallPromptEvent(null); // Reset the event after the user has responded
            });
        }
    };

    const handleShowIosInstructions = () => {
        setShowIosPrompt(true);
    };

    return (
        <header className="guest-header">
            <div className="container">
                <div className="flex w-full flex-col items-center gap-2 font-['Varela_Round'] md:gap-1 lg:h-24 lg:flex-row">
                    <div className="flex w-full items-center justify-between px-6 py-2 text-[rgb(251,251,251)]">
                        <div className="flex w-full items-center justify-between lg:w-auto">
                            <Link href={route("home")}>
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-[80px] w-[120px] lg:h-[150px] lg:w-[150px]"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenu(!isMobileMenu)}
                                className="flex items-center lg:hidden"
                                aria-label="Toggle Menu"
                            >
                                <Icon
                                    className="h-8 w-8 text-white"
                                    icon={
                                        isMobileMenu ? "mdi:close" : "mdi:menu"
                                    }
                                />
                            </button>
                        </div>
                        <div className="hidden basis-content lg:flex lg:w-full lg:flex-row lg:space-x-8">
                            <nav className="flex flex-wrap items-center justify-center lg:justify-start lg:space-x-14">
                                {urls.map((url, index) => (
                                    <Link
                                        key={index}
                                        href={url.url}
                                        className={`text-center text-2xl font-normal uppercase tracking-tight ${auth?.role === "admin" && url.name === t("admin") ? "text-[rgb(253,208,23)]" : "text-[rgb(251,251,251)]"} lg:text-3xl`}
                                    >
                                        {url.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="flex flex-row gap-6">
                                <div className="mt-4 flex flex-col items-center gap-3 lg:mt-0 lg:flex-row">
                                    {auth?.user ? (
                                        <button
                                            type="button"
                                            onClick={logout}
                                            className="flex items-center justify-center rounded-full bg-green-500 px-3 py-2 text-center text-lg font-normal uppercase tracking-tight text-white lg:px-6"
                                        >
                                            {t("logout")}
                                        </button>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("register")}
                                                className="flex items-center justify-center rounded-full bg-green-500 px-3 py-2 text-center text-lg font-normal uppercase tracking-tight text-white lg:px-6"
                                            >
                                                {t("register")}
                                            </Link>
                                            <Link
                                                href={dashboard}
                                                className="flex items-center justify-center rounded-full bg-[rgb(253,208,23)] px-3 py-2 text-center text-lg font-normal uppercase tracking-tight text-white lg:px-6"
                                            >
                                                {t("login")}
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <div className="hide-flag mt-4 flex flex-row gap-3 lg:mt-0">
                                    {langs.map((lang, index) => (
                                        <a
                                            onClick={() => lanSwitch(lang.id)}
                                            key={index}
                                            href={"#"}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                            }}
                                        >
                                            <img
                                                src={lang.flag}
                                                alt=""
                                                style={{
                                                    border: "2px solid rgb(253,208,23)",
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Transition
                        show={isMobileMenu}
                        enter="transition ease-in-out duration-300"
                        enterFrom="-translate-y-full"
                        enterTo="translate-y-0"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="translate-y-0"
                        leaveTo="-translate-y-full"
                    >
                        <div className="flex w-full flex-col items-center justify-center gap-6 py-4 lg:hidden">
                            <nav className="grid items-center justify-center">
                                {urls.map((url, index) => (
                                    <Link
                                        key={index}
                                        href={url.url}
                                        className={`text-center text-2xl font-normal uppercase tracking-tight ${auth?.role === "admin" && url.name === t("admin") ? "text-[rgb(253,208,23)]" : "text-[rgb(251,251,251)]"} lg:text-3xl`}
                                    >
                                        {url.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="mt-4 flex flex-col items-center gap-3">
                                {auth?.user ? (
                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="flex h-12 w-32 items-center justify-center rounded-full bg-[#725b36] text-center text-lg font-normal uppercase tracking-tight text-white lg:w-48 xl:w-60"
                                    >
                                        {t("logout")}
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            href={route("register")}
                                            className="flex h-12 w-32 items-center justify-center rounded-full bg-green-500 text-center text-lg font-normal uppercase tracking-tight text-white lg:w-48 xl:w-60"
                                        >
                                            {t("register")}
                                        </Link>
                                        <Link
                                            href={dashboard}
                                            className="flex h-12 w-32 items-center justify-center rounded-full bg-[rgb(253,208,23)] text-center text-lg font-normal uppercase tracking-tight text-white lg:w-48 xl:w-60"
                                        >
                                            {t("login")}
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="mt-4 flex flex-row gap-3">
                                {langs.map((lang, index) => (
                                    <a
                                        onClick={() => lanSwitch(lang.id)}
                                        key={index}
                                        href={"#"}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    >
                                        <img
                                            src={lang.flag}
                                            alt=""
                                            style={{
                                                border: "1px solid white",
                                                width: "50px",
                                                height: "50px",
                                            }}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Transition>
                </div>

                {/* PWA Install Button */}
                {isInstallable && (
                    <button
                        onClick={handleInstallClick}
                        className="fixed bottom-4 right-4 z-50 rounded-full bg-green-500 px-4 py-2 text-white shadow-lg"
                    >
                        Install our app
                    </button>
                )}

                {/* iOS Install Instructions */}
                {isIos && (
                    <button
                        onClick={handleShowIosInstructions}
                        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg"
                    >
                        Install our app
                    </button>
                )}

                {/* Modal or Instructions */}
                {showIosPrompt && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="rounded bg-white p-6 text-center shadow-lg">
                            <h2 className="text-xl font-semibold">
                                Install Our App
                            </h2>
                            <p className="mt-4">
                                To install this app, open Safari and tap the{" "}
                                <span className="font-bold">Share</span> button
                                (the box with an arrow). Then select{" "}
                                <span className="font-bold">
                                    "Add to Home Screen"
                                </span>
                                .
                            </p>
                            <button
                                onClick={() => setShowIosPrompt(false)}
                                className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
