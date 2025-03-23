import { useState } from "react";
import { useTranslation } from "react-i18next";
import ShopCard from "./ShopCard";

export default function ShopCategoryCard({ category }) {
    const [showAll, setShowAll] = useState(false);
    const { t } = useTranslation();

    const handleViewAll = () => {
        setShowAll(!showAll);
    };

    const displayedShops = showAll
        ? category.shops
        : category.shops.slice(0, 5);

    return (
        <section
            className="relative px-4 font-['Varela_Round'] sm:px-6 md:px-8 lg:px-10"
            id={category.type}
        >
            <div className="container mx-auto">
                <div className="my-8">
                    <div className="grid grid-cols-1 items-center justify-center gap-4 md:flex md:justify-between">
                        {/* Section Title */}
                        <div
                            className="mx-auto flex items-center justify-center gap-3 border-b-4 border-[#333333] pb-3 md:pb-4"
                            style={{ width: "fit-content" }}
                        >
                            {/* <span className="mt-16 text-4xl font-[400] tracking-[-1px] text-[#333333] sm:text-[20px] sm:tracking-[-2px] md:text-[35px]">
                                {category.type}
                            </span> */}
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleViewAll}
                            className="flex items-center justify-center gap-2"
                            style={{ marginTop: "25px" }}
                        >
                            {/* <p className="text-base tracking-[-0.5px] text-[#666666] sm:text-lg sm:tracking-[-1px] md:text-xl lg:text-[30px]">
                                {showAll
                                    ? `${t("viewLess")} ${category.total}`
                                    : `${t("viewAll")} ${category.total}`}
                            </p> */}
                            <img
                                className="h-10 w-10 rounded-full object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
                                src={
                                    category.img ??
                                    "https://via.placeholder.com/150"
                                }
                                alt={category.type}
                            />
                            <p className="text-base tracking-[-0.5px] text-[#666666] sm:text-lg sm:tracking-[-1px] md:text-xl lg:text-[30px]">
                                {showAll
                                    ? `${t("seeLess")} ${category.total}`
                                    : `${t("seeMore")} ${category.total}`}
                            </p>
                        </button>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 gap-5 rounded-lg sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    style={{ marginTop: "35px", marginBottom: "35px" }}
                >
                    {displayedShops.map((shop) => (
                        <ShopCard key={shop.id} shop={shop} />
                    ))}
                </div>
                <div className="mx-auto flex items-center justify-center">
                    <button
                        onClick={handleViewAll}
                        className="bg-green flex items-center justify-center gap-2"
                        style={{ marginTop: "25px" }}
                    >
                        <p
                            className="bg-green text-base tracking-[-0.5px] text-[#666666] sm:text-lg sm:tracking-[-1px] md:text-xl lg:text-[30px]"
                            style={{
                                background: "green",
                                color: "white",
                                padding: "8px 19px",
                                borderRadius: "30px",
                            }}
                        >
                            {showAll ? `${t("seeLess")} ` : `${t("seeMore")} `}
                        </p>
                    </button>
                </div>
            </div>
        </section>
    );
}
