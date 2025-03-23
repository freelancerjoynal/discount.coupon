import React from "react";
import { useTranslation } from "react-i18next";
export default function Shops({ shops }) {
    const { t } = useTranslation();

    return (
        <section className="px-4 font-['Varela_Round'] sm:px-6 md:px-8 lg:px-10">
            <div className="container mx-auto">
                {/* <div className="my-4 flex items-start justify-center">
                    <h2 className="w-[150px] border-b-4 border-white pb-6 text-center text-4xl font-[400] tracking-[-1px] text-[#ffffff] sm:w-[200px] sm:text-[48px] sm:tracking-[-2px] md:text-[63px]">
                        {t("shops")}
                    </h2>
                </div> */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
                    {shops.map((shop) => (
                        <a
                            href={"#" + shop.category}
                            className="flex flex-col items-center p-4 text-center"
                            key={shop.id}
                        >
                            <img
                                className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28 md:h-32 md:w-32"
                                src={
                                    shop.img ??
                                    "https://via.placeholder.com/150"
                                }
                                alt={shop.category}
                            />
                            <h3 className="mt-4 text-base font-[400] tracking-[-0.5px] text-[#ffffff] sm:text-lg sm:tracking-[-1px] md:text-xl">
                                {shop.category}
                            </h3>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
