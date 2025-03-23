import { Container } from "@/Components/shared/Container";
import { OverviewGrid } from "@/Components/shared/OverviewGrid";
import { PageHeader } from "@/Components/shared/PageHeader";
import Table from "@/Components/shared/Table";
import sharedComposable from "@/Composables/sharedComposable";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { Icon } from "@iconify/react";
import { Link } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "@/Components/shared/Modal";
import CreateModal from "@/Pages/Admin/CouponClaim/CreateModal";
import { CouponFilter } from "./CouponFilter";
import { useTranslation } from "react-i18next";

export default function Index({ coupons, overviews }) {
    const { t } = useTranslation();
    const { deleteRow } = sharedComposable();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [couponClaim, setCouponClaim] = useState(false);

    const handleClaimClick = (couponClaim) => {
        setCouponClaim(couponClaim);
        openModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (!isModalOpen) {
            setCouponClaim(null);
        }
    }, [isModalOpen]);

    const columns = [
        {
            header: t("code"),
            accessor: "code",
        },
        {
            header: t("shop"),
            accessor: "shop.name",
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
        // {
        //     header: "Purchased",
        //     accessor: "total_purchased",
        // },
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
                        statusText = t("expired");
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
            header: t("action"),
            call: ({ original }) => (
                <div className="flex">
                    <div className="dropdown" data-placement="bottom-start">
                        <div className="dropdown-toggle">
                            <Icon
                                className="w-30 text-lg"
                                icon="bi:three-dots-vertical"
                            />
                        </div>
                        <div className="dropdown-content w-40">
                            <ul className="dropdown-list">
                                {/* <li className="dropdown-list-item">
                                    <button
                                        onClick={() =>
                                            handleClaimClick(original)
                                        }
                                        className="dropdown-link"
                                    >
                                        <Icon
                                            className="h-6 text-slate-400"
                                            icon="heroicons:rectangle-stack"
                                        />
                                        <span>Claim</span>
                                    </button>
                                </li> */}
                                {/* <li className="dropdown-list-item">
                                    <Link
                                        href={route(
                                            "admin.coupon-users",
                                            original.id
                                        )}
                                        className="dropdown-link"
                                    >
                                        <Icon
                                            className="h-6 text-slate-400"
                                            icon="heroicons:users"
                                        />
                                        <span>User</span>
                                    </Link>
                                </li> */}
                                <li className="dropdown-list-item">
                                    <Link
                                        href={route(
                                            "admin.coupons.show",
                                            original.id
                                        )}
                                        className="dropdown-link"
                                    >
                                        <Icon
                                            className="h-6 text-slate-400"
                                            icon="material-symbols:visibility-outline"
                                        />
                                        <span>{t("view")}</span>
                                    </Link>
                                </li>
                                <li className="dropdown-list-item">
                                    <Link
                                        href={route(
                                            "admin.coupons.edit",
                                            original.id
                                        )}
                                        className="dropdown-link"
                                    >
                                        <Icon
                                            className="h-6 text-slate-400"
                                            icon="material-symbols:edit-outline"
                                        />
                                        <span>{t("edit")}</span>
                                    </Link>
                                </li>

                                <li className="dropdown-list-item">
                                    <button
                                        className="dropdown-link"
                                        onClick={() =>
                                            deleteRow(
                                                route(
                                                    "admin.coupons.destroy",
                                                    original.id
                                                ),
                                                "Coupon has been deleted successfully"
                                            )
                                        }
                                    >
                                        <Icon
                                            className="h-6"
                                            icon="material-symbols:delete-outline"
                                        />
                                        <span>{t("delete")}</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Container>
                <PageHeader />
                <OverviewGrid items={overviews} />
                <Table
                    tableData={coupons}
                    columns={columns}
                    SearchFilterBox={<CouponFilter />}
                />
                {/* <CouponFilter /> */}
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
        </AdminLayout>
    );
}
