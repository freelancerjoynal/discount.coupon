import { useEffect } from "react";
import UserGuestLayout from "@/Layouts/user/Guest/HomLayout";
import Footer from "./Footer";
import ShopCategory from "./ShopCategory";
import AllShops from "./AllShops";
import FavoriteShopCard from "./FavoriteShopCard";
import Hero from "@/Layouts/user/Guest/Hero";

export default function Dashboard({
    shopCategory,
    shops,
    socials,
    isLoggedIn,
    favoriteShop,
    favoriteShopCount,
    welcome,
    about,
    contact,
    note,
}) {
    // console.log(shopCategory);
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
                // console.error("Fetch error:", error);
            }
        };

        runBackgroundTask();
    }, []);

    return (
        <UserGuestLayout>
            {/* Hero Section */}
            {/* <Hero content={welcome} /> */}
            {/* Shops Section */}
            <ShopCategory shopCategory={shopCategory} />

            <Hero content={welcome} />

            {favoriteShopCount > 0 ? (
                <FavoriteShopCard
                    count={favoriteShopCount}
                    shop={favoriteShop}
                />
            ) : null}

            <AllShops combinedData={shops} />

            {/* Footer Section with Note */}
            <Footer
                socials={socials}
                about={about}
                contact={contact}
                note={note}
            />
            {/* Footer Buttons Section */}
        </UserGuestLayout>
    );
}
