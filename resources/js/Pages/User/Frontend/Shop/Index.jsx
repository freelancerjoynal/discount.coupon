import React, { useEffect, useState } from "react";
import ShopLayout from "@/Layouts/user/Guest/ShopLayout";
import { TopShop } from "./TopShop";
import Coupons from "./Coupons";
import { Shops } from "./Shops";

export default function Index({ shop, otherShops, isLoggedIn }) {
    const [currentShop, setCurrentShop] = useState(shop);

    useEffect(() => {
        setCurrentShop(shop);
    }, [shop]);

    const handleSelectShop = (selectedShop) => {
        setCurrentShop(selectedShop);
        router.get(`/shop/${selectedShop.slug}`, undefined, {
            replace: true,
            preserveScroll: true,
        });
    };

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
                    console.log("Task completed:", result);
                } else {
                    console.error(
                        "Error running background task:",
                        await response.text()
                    );
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        runBackgroundTask();
    }, []);

    return (
        <ShopLayout>
            {/* Top Selected Shop Section */}
            <TopShop
                shop={currentShop}
                coupon={
                    currentShop?.coupons?.length ? currentShop.coupons[0] : null
                }
                isLoggedIn={isLoggedIn}
            />

            {/* Coupons and Shops Section */}
            <section className="relative flex flex-col gap-6 md:flex-row md:gap-0">
                {/* Coupons */}
                <Coupons shop={currentShop} isLoggedIn={isLoggedIn} />
                {/* Shops */}
                <Shops
                    shop={currentShop}
                    setShop={handleSelectShop}
                    shops={otherShops}
                />
            </section>
        </ShopLayout>
    );
}
