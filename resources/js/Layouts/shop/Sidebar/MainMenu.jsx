import React from "react";
import { Link } from "@inertiajs/react";
import { SubMenu } from "./SubMenu";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

export const MainMenu = ({ item }) => {
    const { t } = useTranslation();

    // Get the current URL and the menu item URL without the domain
    const currentPath = window.location.pathname;
    const menuPath = new URL(item.url, window.location.origin).pathname;
    const isActive = currentPath === menuPath;

    return (
        <>
            {item.child ? (
                <SubMenu item={item} />
            ) : (
                <li>
                    <Link
                        href={item.url}
                        className={`sidebar-menu group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out ${
                            isActive
                            ? "!bg-[rgb(253,208,23)] !text-black active"
                            : "text-white hover:bg-[rgb(253,208,23)] hover:text-black"
                        }`}
                    >
                        {item.icon && (
                            <Icon
                                icon={item.icon}
                                className={`h-5 w-5 ${isActive ? "text-black" : ""}`}
                            />
                        )}
                        <span className="sidebar-menu-text">{t(item.title)}</span>
                    </Link>
                </li>
            )}
        </>
    );
};
