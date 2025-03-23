import React from "react";

export default function ShopCard({ shop }) {
  return (
    <a href={'shops/'+shop.slug} className="flex w-full flex-col">
      <div className="relative w-full overflow-hidden">
        <img
          src={shop.image || "https://via.placeholder.com/150"}
          alt={shop.name}
          className="w-full aspect-[4/3] object-cover object-center rounded-lg"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-[500] tracking-[-0.5px] text-[#333333] sm:text-xl">
          {shop.name}
        </h3>
        {shop.description && (
          <p className="mt-2 text-sm text-[#666666] line-clamp-2">
            {shop.description}
          </p>
        )}
      </div>
    </a>
  );
}
