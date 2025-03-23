import React, { useEffect, useState } from "react";
import board from "@/images/frontend/board.png";
import Cafe1 from "@/images/frontend/cafe1.jpg";
import cardLeft from "@/images/frontend/cardLeft.png";
import cardRight from "@/images/frontend/cardRightCoupon.png";
import cardRightBar from "@/images/frontend/cardRightBar.png";
import { Modal } from "@/Components/shared/Modal";
import { LoginForm } from "@/Components/Auth/LoginForm";
import moment from "moment";
import "./CouponCustom.css";
import { useTranslation } from "react-i18next";

export default function Coupons({ shop, isLoggedIn }) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [couponClicked, setCouponClicked] = useState("");
    const { t } = useTranslation();

    const handleCouponClick = (coupon) => {
        if (!isLoggedIn) {
            setIsLoginModalOpen(true);
        } else {
            // Update the coupon code in the state
            setCouponClicked(coupon.code);

            // Get the CSRF token from the meta tag
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            // Send the request to the server
            fetch("/coupon/claim", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken, // Include the CSRF token in the headers
                },
                body: JSON.stringify({
                    coupon_id: coupon.id,
                    coupon_code: coupon.code,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    // Optionally update the state or handle the response data
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    useEffect(() => {
        if (shop && shop.coupons && Array.isArray(shop.coupons)) {
            shop.coupons.map((coupon) => {
                const find = shop.coupons.find(
                    (shopCoupon) => shopCoupon.name === coupon.name
                );
                if (!find) {
                    shop.coupons.unshift(coupon);
                }
            });
        }
        setCouponClicked("");
    }, [shop]);

    useEffect(() => {
        // Function to call the background task endpoint
        const runBackgroundTask = async () => {
            try {
                const response = await fetch("/update-expired-claims", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    // console.log("Task completed:", result);
                } else {
                    // console.error(
                    //     "Error running background task:",
                    //     await response.text()
                    // );
                }
            } catch (error) {
                // console.error("Fetch error:", error);
            }
        };

        runBackgroundTask();
    }, []);

    const language = localStorage.getItem("i18nextLng");
    const textSizeClass =
        language === "iq" || language === "ar" ? "text-[14px]" : "";
    const flexDirectionClass =
        language === "ar" ? "flex-row-reverse" : "flex-row";

    return (
        <>
            <div className="font-['Varela_Round'] md:w-full lg:w-2/3 xl:w-2/3">
                {shop && shop.coupons && shop.coupons.length > 0 ? (
                    shop.coupons.map((coupon, index) =>
                        coupon.status !== 1 ? (
                            <div
                                className="coupon-wrapper relative mb-5 flex h-[197px] w-full transition-all duration-700 hover:scale-[1.02]  md:h-[220px]"
                                style={{ cursor: "pointer" }}
                                key={index}
                            >
                                <div className="coupon-red-sticker absolute left-[20%] top-[10%] z-10 w-[350px] md:top-[10px]">
                                    <img
                                        src={board}
                                        alt=""
                                        className="w-[260px] md:w-full"
                                    />
                                    <p className="absolute left-[36%] top-[50%] -translate-x-1/2 -translate-y-1/2 -rotate-[14deg] text-center text-[#ffffff] md:left-[49%] md:top-[48%] md:-rotate-[8deg]">
                                        <span className="text-[42px] text-xl uppercase md:text-[50px]">
                                            {t("claimed")}
                                        </span>
                                    </p>
                                </div>
                                <div className="coupon-left-card relative w-2/3 md:h-[220px]">
                                    <div className="absolute inset-0 z-10 bg-black bg-opacity-40"></div>
                                    <div className="coupon-text mt-[25px] md:mt-[15px]">
                                        <p className="text-[20px] font-[400] uppercase leading-tight tracking-[-1px] text-[#fff] md:text-[30px]">
                                            {coupon.name || coupon.title}
                                        </p>
                                        <p className="coupon-shot-dec w-4/5 text-wrap text-lg font-[400] leading-tight tracking-[-1px] text-[#fff] md:text-[25px]">
                                            {coupon.short_description}
                                        </p>
                                        <p className="text-wrap text-lg font-[400] leading-tight tracking-[-1px] text-[#fff] md:text-[25px]">
                                            {language === "ar" ? (
                                                <>
                                                    <span>
                                                        {moment(
                                                            coupon.valid_to
                                                        ).format("DD MMM")}
                                                    </span>
                                                    <span
                                                        style={{
                                                            marginLeft: "10px",
                                                        }}
                                                    >
                                                        {t("ends")}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        {t("ends")}
                                                    </span>
                                                    <span>
                                                        {moment(
                                                            coupon.valid_to
                                                        ).format("DD MMM")}
                                                    </span>
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <img
                                        src={coupon.image}
                                        alt="Card left"
                                        className="absolute bottom-0 right-0 h-full w-full object-cover"
                                    />
                                    <div className="coupon-dots">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                                <div className="coupon-right-card relative w-1/3 ">
                                    <div className="absolute inset-0 z-10 bg-black bg-opacity-40"></div>
                                    <div className="md:left[0px] absolute left-[-16px] top-[28px] flex h-[120px] w-[180px] -rotate-90 flex-col items-center gap-2 sm:left-[0px] md:h-[160px] md:justify-center md:gap-4">
                                        <div className="co-title text-[15px] font-normal uppercase md:text-xl">
                                            <span className="text-[#ff0000]">
                                                balash
                                            </span>{" "}
                                            <span className="text-[#000]">
                                                coupon
                                            </span>
                                        </div>
                                        <h5 className="coupon-code relative items-center justify-center rounded-md border-2 border-dashed border-[#000] bg-[#ffec75] text-xl font-normal uppercase">
                                            <span className="text-[#000]">
                                                {t("redeem")}
                                            </span>{" "}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => handleCouponClick(coupon)}
                                className="coupon-wrapper relative mb-5 flex h-[197px] w-full transition-all duration-700 hover:scale-[1.02]  md:h-[220px]"
                                style={{ cursor: "pointer" }}
                                key={index}
                            >
                                {couponClicked === coupon.code ? (
                                    <div className="coupon-red-sticker absolute left-[20%] top-[10%] z-10 w-[350px] md:top-[10px]">
                                        <img
                                            src={board}
                                            alt=""
                                            className="w-[260px] md:w-full"
                                        />
                                        <p className="absolute left-[36%] top-[48%] -translate-x-1/2 -translate-y-1/2 -rotate-[14deg] text-center text-[#ffffff] md:left-[49%] md:top-[48%] md:-rotate-[8deg]">
                                            <span className="text-[15px] uppercase md:text-xl">
                                                {coupon.code}
                                                <br />
                                                {t("enterCouponCodeCheckout")}
                                            </span>
                                        </p>
                                    </div>
                                ) : (
                                    ""
                                )}

                                <div className="coupon-left-card relative w-2/3 md:h-[220px]">
                                    {/* <div className="absolute inset-0 z-10 bg-black bg-opacity-20"></div> */}
                                    <div className="coupon-text mt-[25px] md:mt-[15px]">
                                        <p className="text-[20px] font-[400] uppercase leading-tight tracking-[-1px] text-[#fff] md:text-[30px]">
                                            {coupon.name || coupon.title}
                                        </p>
                                        <p className="coupon-shot-dec w-4/5 text-wrap text-lg font-[400] leading-tight tracking-[-1px] text-[#fff] md:text-[25px]">
                                            {coupon.short_description}
                                        </p>
                                        <p className="text-wrap text-lg font-[400] leading-tight tracking-[-1px] text-[#fff] md:text-[25px]">
                                            {language === "ar" ? (
                                                <>
                                                    <span>
                                                        {moment(
                                                            coupon.valid_to
                                                        ).format("DD MMM")}
                                                    </span>
                                                    <span
                                                        style={{
                                                            marginLeft: "10px",
                                                        }}
                                                    >
                                                        {t("ends")}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        {t("ends")}
                                                    </span>
                                                    <span>
                                                        {moment(
                                                            coupon.valid_to
                                                        ).format("DD MMM")}
                                                    </span>
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <img
                                        src={coupon.image}
                                        alt="Card left"
                                        className="absolute bottom-0 right-0 h-full w-full object-cover"
                                    />
                                    <div className="coupon-dots">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                                <div className="coupon-right-card relative w-1/3 ">
                                    {/* <div className="absolute inset-0 z-10 bg-black bg-opacity-20"></div> */}
                                    <div className="absolute left-[-16px] top-[28px] flex h-[120px] w-[180px] -rotate-90 flex-col items-center gap-2 sm:left-[0px] md:left-[0px] md:h-[160px] md:justify-center md:gap-4">
                                        <div className="co-title text-[15px] font-normal uppercase md:text-xl">
                                            <span className="text-[#ff0000]">
                                                balash
                                            </span>{" "}
                                            <span className="text-[#000]">
                                                coupon
                                            </span>
                                        </div>
                                        <h5 className="coupon-code relative items-center justify-center rounded-md border-2 border-dashed border-[#ffec75] text-xl font-normal uppercase">
                                            <span className="text-[#000]">
                                                {coupon.code}
                                            </span>{" "}
                                            {couponClicked !== coupon.code ? (
                                                <>
                                                    <img
                                                        className="coupon-code-hider"
                                                        src={cardRightBar}
                                                        alt=""
                                                    />
                                                    <span
                                                        className={`${textSizeClass} get-coupon-code font-['Varela_Round'] text-[#000]`}
                                                    >
                                                        {t("getCode")}
                                                    </span>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                ) : (
                    <p className="text-xl font-[400] uppercase leading-tight tracking-[-1px] text-white">
                        {t("noCoupon")}
                    </p>
                )}
            </div>

            {shop && shop.coupons && Array.isArray(shop.coupons) && (
                <Modal
                    title="Login"
                    isOpen={isLoginModalOpen}
                    setIsOpen={setIsLoginModalOpen}
                >
                    <LoginForm onSuccess={() => setIsLoginModalOpen(false)} />
                </Modal>
            )}
        </>
    );
}
