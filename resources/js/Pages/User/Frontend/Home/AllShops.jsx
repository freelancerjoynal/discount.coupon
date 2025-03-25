import React from "react";
import ShopCategoryCard from "./ShopCategoryCard";

export default function AllShops({ combinedData }) {
    // Sort categories by position of the shops inside them
    const sortedByPosition = combinedData.map((category) => {
        // Sort the shops array by `position` (ascending order)
        const sortedShops = [...category.shops].sort((a, b) => {
            // Handle cases where `position` is `null` by treating nulls as highest values
            if (a.position === null) return 1;
            if (b.position === null) return -1;
            return a.position - b.position;
        });

        // Return the category with sorted shops
        return {
            ...category,
            shops: sortedShops,
        };
    });

    // console.log(sortedByPosition);

    return (
        <div>
            {sortedByPosition.map((category, index) => (
                <ShopCategoryCard key={index} category={category} />
            ))}
        </div>
    );
}
