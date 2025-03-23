import { useState } from "react";
import { router } from "@inertiajs/react";

export default function CustomerFilter() {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.filter.customer"),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex-1">
                <div className="relative  flex rounded border border-[rgb(253,208,23)] bg-white">
                    <input
                        type="search"
                        placeholder="Search"
                        className="peer-focus:text-primary dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-1 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:outline-none focus:ring-0 focus:placeholder:opacity-100 data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black dark:placeholder:text-neutral-300"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        className="bg-primary shadow-primary-3 focus:bg-primary-accent-300 focus:shadow-primary-2 active:shadow-primary-2 dark:focus:shadow-dark-strong dark:active:shadow-dark-strong relative z-[2] -ms-0.5 flex items-center rounded-e px-5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:bg-primary-600 dark:shadow-black/30"
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
        </div>
    );
}
