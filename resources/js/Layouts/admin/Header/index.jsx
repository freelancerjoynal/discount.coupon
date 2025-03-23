import React from "react";
import Dropdown from "@/Components/shared/Dropdown";
import composable from "@/Composables/sharedComposable";
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";

export default function index() {
    const { t } = useTranslation();
    const { logout } = composable();
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <header className="header" style={{ background: "rgb(48, 48, 48)", color: "white" }}>
            <div className="container-fluid flex items-center justify-between">
                {/* <!-- Sidebar Toggle & Search Starts --> */}
                <div className="flex items-center space-x-6 overflow-visible">
                    <button className="sidebar-toggle">
                        <span className="flex space-x-4">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="22"
                                width="22"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                ></path>
                            </svg>
                        </span>
                    </button>

                    {/* <!-- Mobile Search Starts --> */}
                    {/* <div className="sm:hidden">
                        <button
                            type="button"
                            data-trigger="search-modal"
                            className="flex items-center justify-center rounded-full text-slate-500 transition-colors duration-150 hover:text-primary-500 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300"
                        >
                            <i width="22" height="22" data-feather="search"></i>
                        </button>
                    </div> */}
                    {/* <!-- Mobile Search Ends --> */}

                    {/* <!-- Searchbar Start --> */}
                    {/* <button
                        type="button"
                        data-trigger="search-modal"
                        className="group hidden h-10 w-72 items-center overflow-hidden rounded-primary bg-slate-100 px-3 shadow-sm dark:border-transparent dark:bg-slate-700 sm:flex"
                    >
                        <i
                            className="text-slate-400"
                            width="1em"
                            height="1em"
                            data-feather="search"
                        ></i>
                        <span className="ml-2 text-sm text-slate-400">
                            Search
                        </span>
                    </button> */}
                </div>

                <div className="flex items-center">
                    <div className="dropdown" data-strategy="absolute">
                        <div className="dropdown-toggle px-3">
                            {/* <button
                                type="button"
                                className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-700 focus:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-slate-300"
                            >
                                <span className="fi fi-gb"></span>
                                <span className="hidden font-medium md:inline-block">
                                    English
                                </span>
                                <span className="inline-block font-medium md:hidden">
                                    EN
                                </span>
                            </button> */}
                        </div>

                        <div className="dropdown-content mt-3 w-40">
                            <ul className="dropdown-list">
                                <li className="dropdown-list-item">
                                    <button
                                        className="dropdown-btn"
                                        type="button"
                                    >
                                        <span className="fi fi-gb"></span>
                                        <span className="">English</span>
                                    </button>
                                </li>
                                <li className="dropdown-list-item">
                                    <button
                                        className="dropdown-btn"
                                        type="button"
                                    >
                                        <span className="fi fi-de"></span>
                                        <span className="">German</span>
                                    </button>
                                </li>
                                <li className="dropdown-list-item">
                                    <button
                                        className="dropdown-btn"
                                        type="button"
                                    >
                                        <span className="fi fi-gf"></span>
                                        <span className="">French</span>
                                    </button>
                                </li>
                                <li className="dropdown-list-item">
                                    <button
                                        className="dropdown-btn"
                                        type="button"
                                    >
                                        <span className="fi fi-sa"></span>
                                        <span className="">Arabic</span>
                                    </button>
                                </li>
                                <li className="dropdown-list-item">
                                    <button
                                        className="dropdown-btn"
                                        type="button"
                                    >
                                        <span className="fi fi-cn"></span>
                                        <span className="">Chinese</span>
                                    </button>
                                </li>
                                <li className="dropdown-list-item">
                                    <button
                                        className="dropdown-btn"
                                        type="button"
                                    >
                                        <span className="fi fi-bd"></span>
                                        <span className="">Bangla</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* <div
                        className="dropdown"
                        data-strategy="absolute"
                        id="theme-switcher-dropdown"
                    >
                        <button
                            className="dropdown-toggle px-3 text-slate-500 hover:text-slate-700 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-primary-500"
                            type="button"
                        >
                            <i
                                className="hidden dark:block"
                                width="24"
                                height="24"
                                data-feather="moon"
                            ></i>
                            <i
                                className="block dark:hidden"
                                width="24"
                                height="24"
                                data-feather="sun"
                            ></i>
                        </button>

                        <div className="dropdown-content mt-3 w-36">
                            <ul className="dropdown-list">
                                <li className="dropdown-list-item">
                                    <button
                                        type="buttton"
                                        className="dropdown-btn"
                                        data-theme-mode="light"
                                    >
                                        <i
                                            width="16"
                                            height="16"
                                            data-feather="sun"
                                        ></i>
                                        <span>Light</span>
                                    </button>
                                </li>

                                <li className="dropdown-list-item">
                                    <button
                                        type="buttton"
                                        className="dropdown-btn"
                                        data-theme-mode="dark"
                                    >
                                        <i
                                            width="16"
                                            height="16"
                                            data-feather="moon"
                                        ></i>
                                        <span>Dark</span>
                                    </button>
                                </li>

                                <li className="dropdown-list-item">
                                    <button
                                        type="buttton"
                                        className="dropdown-btn"
                                        data-theme-mode="system"
                                    >
                                        <i
                                            width="16"
                                            height="16"
                                            data-feather="monitor"
                                        ></i>
                                        <span>System</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div> */}

                    <div className="dropdown -mt-0.5" data-strategy="absolute">
                        <div
                            className="dropdown-toggle px-3"
                            style={{ display: "none" }}
                        >
                            <button className="relative mt-1 flex items-center justify-center rounded-full text-slate-500 transition-colors duration-150 hover:text-slate-700 focus:text-primary-500 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:text-primary-500">
                                <i
                                    width="24"
                                    height="24"
                                    data-feather="bell"
                                ></i>
                                <span className="absolute -right-1 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[11px] text-slate-200">
                                    5
                                </span>
                            </button>
                        </div>

                        <div
                            className="dropdown-content mt-3 hidden w-[17.5rem] divide-y dark:divide-slate-700 sm:w-80"
                            style={{ display: "none" }}
                        >
                            <div className="px-4 py-2">
                                <button
                                    className="btn btn-primary-plain btn-sm w-full"
                                    type="button"
                                >
                                    <span>View More</span>
                                    <i
                                        data-feather="arrow-right"
                                        width="1rem"
                                        height="1rem"
                                    ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="hidden md:block">
                                <div className="text-sm font-medium text-white">
                                    {user?.name || "Admin User"}
                                </div>
                            </div>
                        </div>
                        <div className="py-1">
                            <button
                                type="button"
                                onClick={logout}
                                className="btn btn-primary text-black"
                                style={{ background: "rgb(253, 208, 23)" }}
                            >
                                <span>{t("signOut")}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
