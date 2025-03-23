import React, { useState } from "react";
import ShopCard from "./ShopCard";
import { Icon } from "@iconify/react";
import FavoriteShops from "./FavoriteShops";
import { useTranslation } from "react-i18next";

export default function FavoriteShopCard({ shop, count }) {
    const [showAll, setShowAll] = useState(false);
    const { t } = useTranslation();

    const handleViewAll = () => {
        setShowAll(!showAll);
    };

    const displayedShops = showAll ? shop : shop.slice(0, 3);

    return (
        <section className="relative px-4 font-['Varela_Round'] sm:px-6 md:px-8 lg:px-10">
            <div className="container mx-auto">
                {/* <div className="my-8 flex items-center justify-center">
                    <div
                        className="flex items-center justify-center gap-3 border-b-4 border-white pb-3 md:pb-4"
                        style={{ width: "fit-content" }}
                    >
                        <span className="text-4xl font-[400] tracking-[-1px] text-[#ffffff] sm:text-[20px] sm:tracking-[-2px] md:text-[35px]">
                            {t("favourites")}
                        </span>
                    </div>
                </div> */}
                <div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
                    style={{ marginTop: "35px", marginBottom: "35px" }}
                >
                    {displayedShops.map((shop) => (
                        <FavoriteShops key={shop.id} shop={shop.shop} />
                    ))}
                </div>
            </div>
            <div className="mob-d absolute right-4 top-6 sm:right-6 md:right-8 lg:right-10">
                <button
                    onClick={handleViewAll}
                    className="flex items-center gap-2"
                >
                    <p className="text-base tracking-[-0.5px] text-[#ffffff] sm:text-lg sm:tracking-[-1px] md:text-xl lg:text-[30px]">
                        {showAll ? "view less" : `view all (${count})`}
                        {/* view all */}
                    </p>
                    <Icon
                        icon="mdi:chevron-right"
                        className="text-[#ffffff] sm:text-2xl md:text-3xl lg:text-4xl"
                    />
                </button>
            </div>
        </section>
    );
}
