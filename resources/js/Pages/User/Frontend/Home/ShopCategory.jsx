import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ShopCategory({ shopCategory }) {
    const { t } = useTranslation();

    // State to manage the number of categories to display
    const [visibleCategories, setVisibleCategories] = useState(10);

    // Function to load more categories
    const loadMore = () => {
        setVisibleCategories((prev) => prev + 5);
    };

    return (
        <section className="px-4 font-['Varela_Round'] sm:px-6 md:px-8 lg:px-10">
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
                {/* Show the See More button if there are more categories to show */}
                {visibleCategories < shopCategory.length && (
                    <div className="mt-6 flex justify-start">
                        <button
                            onClick={loadMore}
                            className="bg-green-700 text-base tracking-[-0.5px] text-[#666666] sm:text-lg sm:tracking-[-1px] md:text-xl lg:text-[30px]"
                            style={{
                                background: "green",
                                color: "white",
                                padding: "8px 19px",
                                borderRadius: "30px",
                            }}
                        >
                            {t("See More")}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
