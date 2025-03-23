import { Icon } from "@iconify-icon/react";
import React from "react";
export default function Cards({ shop }) {
    return (
        <section className="relative px-4 font-['Varela_Round'] sm:px-6 md:px-8 lg:px-10">
            <div className="container mx-auto">
                <div className="my-4 flex items-center justify-center">
                    <div className="w-[180px] md:w-[200px] border-b-4 border-[#333333] pb-3 md:pb-4 flex justify-center items-center gap-3">
                        <img src={shop?.image} className="w-12 h-12 rounded-full object-fill" alt="" />
                        <span className="text-4xl font-[400] tracking-[-1px] text-[#333333] sm:text-[48px] sm:tracking-[-2px] md:text-[63px]">{shop?.name}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {shop?.coupons.map((list) => (
                        <a href="#" className="relative w-full" key={list.id}>
                            <div className="w-full">
                                <img
                                    src={
                                        list?.image ??
                                        "https://via.placeholder.com/150"
                                    }
                                    alt={list.name}
                                    className="cover-fill h-[150px] w-full object-cover sm:h-[200px] md:h-[250px]"
                                />
                            </div>
                            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 text-[#ffffff]">
                                <div className="text-left">
                                    <p className="text-xl font-[400] uppercase leading-tight tracking-[-0.5px] sm:text-2xl sm:tracking-[-1px] md:text-3xl">
                                        {list.name ?? list.title ?? ""}
                                    </p>
                                    <p className="text-sm font-[400] leading-tight tracking-[-0.5px] sm:text-base sm:tracking-[-1px] md:text-xl">
                                        {list.short_description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <div className="absolute right-4 top-6 sm:right-6 md:right-8 lg:right-10">
                <a href="#" className="flex items-center gap-2">
                    <p className="text-base tracking-[-0.5px] text-[#ffffff] sm:text-lg sm:tracking-[-1px] md:text-xl lg:text-[30px]">
                        view all {shop?.total_coupons}
                    </p>
                    {/* arrow icon */}
                    <Icon icon="mdi:chevron-right" className="text-[#ffffff] sm:text-2xl md:text-3xl lg:text-4xl" />
                </a>
            </div>
        </section>
    );
}
