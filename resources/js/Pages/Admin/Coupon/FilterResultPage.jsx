import { Container } from "@/Components/shared/Container";
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

export default function FilterResultPage({ coupons, search }) {
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
            header: "Code",
            accessor: "code",
        },
        {
            header: "Shop",
            accessor: "shop.name",
        },
        {
            header: "Discount",
            accessor: "discount",
        },
        // {
        //     header: "Usage Limit",
        //     accessor: "usage_limit",
        // },
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
            header: "Purchased",
            accessor: "total_purchased",
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
            header: "Action",
            call: ({ original }) => (
                <div className="flex justify-end">
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
                                        <span>View</span>
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
                                        <span>Edit</span>
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
                                        <span>Delete</span>
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

                <Table
                    tableData={coupons}
                    columns={columns}
                    SearchFilterBox={<CouponFilter />}
                />
                {!coupons.data?.length && <CouponFilter search={search} />}
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
