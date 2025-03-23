import { Icon } from "@iconify/react";
import moment from "moment";
import React, { useState } from "react";
import { Modal } from "@/Components/shared/Modal";
import { LoginForm } from "@/Components/Auth/LoginForm";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export const TopShop = ({ shop, coupon, isLoggedIn }) => {
    const { t } = useTranslation();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        shop: shop.id,
    });

    const handleFavoriteClick = () => {
        if (!isLoggedIn) {
            setIsLoginModalOpen(true);
        } else {
            submitAddToFavorite();
        }
    };

    const submitAddToFavorite = () => {
        post(route("add.to.favorite"));
    };

    const language = localStorage.getItem("i18nextLng");
    const textSizeClass =
        language === "iq" || language === "ar"
            ? "text-[20px]"
            : "text-base sm:text:lg lg:text-[39px]";

    return (
        <>
            <div className="hero-res-top relative flex flex-col gap-3 border-2 border-[#ffffff] px-4 py-5 sm:px-6 lg:mt-24 lg:flex-row lg:gap-5 lg:px-8 lg:py-10">
                <div className="absolute inset-0 bg-[#12161c] opacity-80 backdrop-blur-sm"></div>
                <div className="border-3 relative h-full w-full border-2 border-[#ffffff] bg-[#000000] sm:w-48 md:w-52 lg:w-64">
                    <div className="flex h-24 w-full items-center justify-center text-wrap p-3 lg:h-[270px]">
                        <p className="text-center text-2xl font-[400] uppercase tracking-[-1px] text-[#ffffff] sm:text-3xl sm:tracking-[-2px] lg:text-4xl lg:leading-[60px]">
                            {shop?.name}
                        </p>
                    </div>
                    <div className="flex h-12 w-full items-center justify-center border-t-2 border-[#ffffff] lg:h-16">
                        <a
                            href={shop?.url}
                            className={`${textSizeClass} font-[400] tracking-[-0.5px] text-[#ffffff] outline-none sm:tracking-[-1px]`}
                        >
                            {t("visitSite")}
                        </a>
                    </div>
                </div>
                <div className="relative flex flex-col gap-2 text-left lg:gap-6">
                    <h1 className="text-2xl font-[400] tracking-[-1px] text-[#ffffff] sm:text-3xl sm:tracking-[-2px] lg:text-6xl">
                        <span>{coupon?.title}</span>{" "}
                        <span>{t("voucherCode")} </span>
                        <span>{moment(coupon?.valid_to).format("YYYY")}</span>
                    </h1>
                    <p className="text-base font-[400] tracking-[-0.5px] text-[#e0e0e0] sm:text-lg sm:tracking-[-1px] lg:text-[39px]">
                        <span>{t("activeCodesAndDiscounts")}</span>{" "}
                        <span>-</span>
                        <span>
                            {moment(coupon?.valid_to).format("MMM YYYY")}
                        </span>
                    </p>
                    <button
                        className="lg:w-42 flex w-24 items-center gap-2 rounded-md border border-[#ffffff] px-2 py-1 text-[#ffffff] sm:w-32 sm:px-4"
                        onClick={handleFavoriteClick}
                        disabled={processing}
                    >
                        <Icon icon="mdi-light:heart" />
                        <span>{t("favourite")}</span>
                    </button>
                </div>
            </div>
            {shop && shop.coupons && Array.isArray(shop.coupons) && (
                <Modal
                    title="Login"
                    isOpen={isLoginModalOpen}
                    setIsOpen={setIsLoginModalOpen}
                    style={{ background: "rgb(24 36 30)" }}
                >
                    <LoginForm onSuccess={() => setIsLoginModalOpen(false)} />
                </Modal>
            )}
        </>
    );
};
