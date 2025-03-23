import React from "react";
import avatar from "@/Assets/images/avatar1.png";
import sharedComposable from "@/Composables/sharedComposable";
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";

export default function index() {
    const { t } = useTranslation();
    const { logout } = sharedComposable();
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
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="avatar h-[35px] w-[35px]">
                            <img
                                className="rounded-[50%] border-2 border-slate-100 object-cover h-full w-full"
                                src={user?.shop?.image || avatar}
                                alt="Shop Avatar"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="text-sm font-medium">
                                {user?.shop?.name || user?.name || "Shop User"}
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
        </header>
    );
}
