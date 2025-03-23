import { Container } from "@/Components/shared/Container";
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
import { CouponFilter } from "./CouponFilter";

export default function Index({ coupons, search }) {
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

    const columns = [
        {
            header: "Code",
            accessor: "code",
        },
        {
            header: "Discount",
            accessor: "discount",
        },
        {
            header: "Valid From",
            accessor: "valid_from",
            call: ({ value }) => moment(value).format("DD-MM-YYYY"),
        },
        {
            header: "Valid Till",
            accessor: "valid_to",
            call: ({ value }) => moment(value).format("DD-MM-YYYY"),
        },
        {
            header: "Status",
            accessor: "status",
            call: ({ value }) => {
                if (value) {
                    return <span className="badge badge-success">Active</span>;
                } else {
                    return <span className="badge badge-info">Verified</span>;
                }
            },
        },
        {
            header: "Verify",
            call: ({ original }) => (
                <>
                    {original.status == 1 && (
                        <div className="flex items-center justify-end">
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
                {/* <CouponFilter /> */}
                <Table
                    tableData={coupons}
                    columns={columns}
                    SearchFilterBox={<CouponFilter search={search} />}
                />
                {!coupons.data?.length && <CouponFilter search={search} />}
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
