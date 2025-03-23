import { Container } from "@/Components/shared/Container";
import { OverviewGrid } from "@/Components/shared/OverviewGrid";
import { PageHeader } from "@/Components/shared/PageHeader";
import Table from "@/Components/shared/Table";
import sharedComposable from "@/Composables/sharedComposable";
import ShopLayout from "@/Layouts/shop/ShopLayout";
import { Icon } from "@iconify/react";
import { router } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "@/Components/shared/Modal";
import CreateModal from "@/Pages/Shop/CouponClaim/CreateModal";
import DashboardCredentials from "../Profile/DashboardCredentials";
import { CouponFilter } from "./CouponFilter";
import { useTranslation } from "react-i18next";

export default function Index({ coupons, overviews, user, shop }) {
    const { t } = useTranslation();
    const { deleteRow } = sharedComposable();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [couponClaim, setCouponClaim] = useState(false);
    const [loading, setLoading] = useState(false);
    const [claimingCouponId, setClaimingCouponId] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleClaimClick = (id) => {
        setLoading(true);
        setClaimingCouponId(id);
        postClaim(id); // Submit the claim
    };

    const postClaim = (id) => {
        router.post(
            route("shop.coupon.claim.shopper", id),
            { status: true },
            {
                onSuccess: () => {
                    setLoading(false);
                    setClaimingCouponId(null);
                    router.reload({
                        only: ["coupons"],
                    });
                },
                onError: () => {
                    setLoading(false);
                    setClaimingCouponId(null);
                },
            }
        );
    };

    useEffect(() => {
        if (!isModalOpen) {
            setCouponClaim(null);
        }
    }, [isModalOpen]);

    // useEffect(() => {
    //     // Function to call the background task endpoint
    //     const runBackgroundTask = async () => {
    //         try {
    //             const response = await fetch("/update-expired-claims", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "X-CSRF-TOKEN": document
    //                         .querySelector('meta[name="csrf-token"]')
    //                         .getAttribute("content"),
    //                 },
    //             });

    //             if (response.ok) {
    //                 const result = await response.json();
    //                 console.log("Task completed:", result);
    //             } else {
    //                 console.error(
    //                     "Error running background task:",
    //                     await response.text()
    //                 );
    //             }
    //         } catch (error) {
    //             console.error("Fetch error:", error);
    //         }
    //     };

    //     runBackgroundTask();
    // }, []);

    const columns = [
        {
            header: t("code"),
            accessor: "code",
        },
        {
            header: t("discount"),
            accessor: "discount",
        },
        {
            header: t("validFrom"),
            accessor: "valid_from",
            call: ({ value }) => moment(value).format("DD-MM-YYYY"),
        },
        {
            header: t("validTill"),
            accessor: "valid_to",
            call: ({ value }) => moment(value).format("DD-MM-YYYY"),
        },
        {
            header: t("status"),
            accessor: "status",
            call: ({ value }) => {
                let statusText = "";
                let badgeClass = "";

                // Determine the text and badge class based on the status value
                switch (value) {
                    case 0:
                        statusText = t("Verified");
                        badgeClass = "badge-info";
                        break;
                    case 1:
                        statusText = t("Active");
                        badgeClass = "badge-success";
                        break;
                    case 2:
                        statusText = t("Claimed");
                        badgeClass = "badge-warning";
                        break;
                    case 3:
                        statusText = t("Expired");
                        badgeClass = "badge-warning";
                        break;
                    default:
                        statusText = t("Unknown");
                        badgeClass = "badge-secondary";
                }

                return (
                    <span className={`badge ${badgeClass}`}>{statusText}</span>
                );
            },
        },
        {
            header: t("verify"),
            call: ({ original }) => (
                <>
                    {original.status == 2 && (
                        <div className="flex items-center">
                            {loading && claimingCouponId === original.id ? (
                                <Icon
                                    icon="mdi:loading"
                                    className="ml-2 animate-spin"
                                />
                            ) : (
                                <input
                                    type="checkbox"
                                    onChange={() =>
                                        handleClaimClick(original.id)
                                    }
                                />
                            )}
                        </div>
                    )}
                </>
            ),
        },
    ];

    return (
        <ShopLayout>
            <Container>
                <PageHeader />
                <OverviewGrid items={overviews} />
                <Table
                    tableData={coupons}
                    columns={columns}
                    SearchFilterBox={<CouponFilter />}
                />
                {/* <CouponFilter /> */}
                <section className="credential-section">
                    <DashboardCredentials user={user} shop={shop} />
                </section>
            </Container>

            {couponClaim && (
                <Modal
                    title="Claim Your Coupon"
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                >
                    <CreateModal
                        couponClaim={couponClaim}
                        onSuccess={() => setIsModalOpen(false)}
                    />
                </Modal>
            )}
        </ShopLayout>
    );
}
