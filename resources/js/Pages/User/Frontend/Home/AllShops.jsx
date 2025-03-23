import React from "react";
import ShopCategoryCard from "./ShopCategoryCard";

export default function AllShops({ combinedData }) {
    const sortedByAlphabetically = [...combinedData].sort((a, b) =>
        a.type.localeCompare(b.type)
    );

    return (
        <div>
            {sortedByAlphabetically.map((category, index) => (
                <ShopCategoryCard key={index} category={category} />
            ))}
        </div>
    );
}
