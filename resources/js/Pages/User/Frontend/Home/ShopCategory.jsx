import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ShopCategory({ shopCategory }) {
    const { t } = useTranslation();
    // Sort shopCategory alphabetically by category name
    // const sortedCategories = [...shopCategory].sort((a, b) =>
    //     a.category.localeCompare(b.category)
    // );

    // State to manage the number of categories to display on mobile
    const [visibleCategories, setVisibleCategories] = useState(5);

    // Function to load more categories on mobile
    const loadMore = () => {
        setVisibleCategories((prev) => prev + 5);
    };

    return (
        <>
            <section className="hidden px-4 font-['Varela_Round'] sm:px-6 md:block md:px-8 lg:px-10">
                <div className="container mx-auto">
                    {/* <div className="my-8 flex items-start justify-center">
                        <h2 className="border-b-4 border-[#333333] pb-6 text-center text-4xl font-[400] tracking-[-1px] text-[#333333] sm:text-[40px] sm:tracking-[-2px] md:text-[45px]">
                            {t("Categories")}
                        </h2>
                    </div> */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {shopCategory.map((category) => (
                            <a
                                href={"#" + category.category}
                                className="flex flex-col items-center p-4 text-center"
                                key={category.id}
                            >
                                <div className="relative h-24 w-24 overflow-hidden rounded-2xl sm:h-28 sm:w-28 md:h-32 md:w-32">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={
                                            category.img ??
                                            "https://via.placeholder.com/150"
                                        }
                                        alt={category.category}
                                    />
                                </div>
                                <h3 className="mt-2 text-lg font-[400] tracking-[-1px] text-[#333333] sm:text-xl md:text-2xl">
                                    {category.category}
                                </h3>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 font-['Varela_Round'] sm:px-6 md:hidden md:px-8 lg:px-10">
                <div className="container mx-auto">
                    <div className="my-8 flex items-start justify-center">
                        <h2 className="w-[150px] border-b-4 border-[#333333] pb-6 text-center text-4xl font-[400] tracking-[-1px] text-[#333333] sm:w-[200px] sm:text-[40px] sm:tracking-[-2px] md:text-[45px]">
                            {t("shops")}
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {shopCategory
                            .slice(0, visibleCategories)
                            .map((category) => (
                                <a
                                    href={"#" + category.category}
                                    className="flex flex-col items-center p-4 text-center"
                                    key={category.id}
                                >
                                    <img
                                        className="h-20 w-20 rounded-lg object-cover sm:h-28 sm:w-28 md:h-32 md:w-32"
                                        src={
                                            category.img ??
                                            "https://via.placeholder.com/150"
                                        }
                                        alt={category.category}
                                    />
                                    <h3 className="mt-4 text-base font-[400] tracking-[-0.5px] text-[#333333] sm:text-lg sm:tracking-[-1px] md:text-xl">
                                        {category.category}
                                    </h3>
                                </a>
                            ))}
                    </div>
                    {/* Show See More button only on mobile devices and if there are more categories to show */}
                    {visibleCategories < shopCategory.length && (
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={loadMore}
                                className="rounded-md bg-pink-500 px-6 py-2 font-['Varela_Round'] leading-5 text-white focus:outline-none"
                            >
                                {t("See More")}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
