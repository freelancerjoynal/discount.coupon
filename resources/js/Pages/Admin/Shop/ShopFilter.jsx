import { InputGroup } from "@/Components/shared/InputGroup";
import { trans } from "@/TranslationsContext";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const ShopFilter = () => {
    const { t } = useTranslation();
    const { search } = usePage().props;

    const { data, setData, get, post, processing, errors } = useForm({
        search: search || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route("admin.filter.shop"), {
            params: {
                search: data.search,
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-between gap-y-4 md:flex-row md:gap-y-0"
        >
            <div
                className="relative flex bg-white rounded border border-[rgb(253,208,23)]"
                data-twe-input-wrapper-init
                data-twe-input-group-ref
            >
                <input
                    type="search"
                    className="peer-focus:text-primary dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-1 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:ring-0 focus:outline-none focus:placeholder:opacity-100 data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-300"
                    placeholder={t("search")}
                    aria-label="Search"
                    id="search-focus"
                    aria-describedby="basic-addon4"
                    value={data.search}
                    onChange={(e) => setData("search", e.target.value)}
                />

                <button
                    className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5  text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    type="submit"
                    id="button-addon4"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                >
                    <span className="[&>svg]:h-5 [&>svg]:w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </span>
                </button>
            </div>
        </form>
    );
};
