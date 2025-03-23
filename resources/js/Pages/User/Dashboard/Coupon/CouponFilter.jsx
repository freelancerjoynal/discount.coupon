import { InputGroup } from "@/Components/shared/InputGroup";
import { trans } from "@/TranslationsContext";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";

export const CouponFilter = () => {
    const { t } = useTranslation();

    const { data, setData, get, post, processing, errors } = useForm({
        search: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route("user.filter.coupon"));
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
                    placeholder={t("Search")}
                    aria-label="Search"
                    id="search-focus"
                    aria-describedby="basic-addon4"
                    onChange={(e) => setData("search", e.target.value)}
                />
            </div>

            <div className="itransems-center flex w-full justify-between gap-x-4 md:w-auto">


                <button type="submit" className="btn btn-primary">
                    <i data-feather="search" height="1rem" width="1rem"></i>
                    <span>{trans("Go")}</span>
                </button>
            </div>
        </form>
    );
};
