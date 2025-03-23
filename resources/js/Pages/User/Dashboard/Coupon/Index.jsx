import { Container } from "@/Components/shared/Container";
import { OverviewGrid } from "@/Components/shared/OverviewGrid";
import { PageHeader } from "@/Components/shared/PageHeader";
import Table from "@/Components/shared/Table";
import UserLayout from "@/Layouts/user/UserLayout";
import moment from "moment";
import UserDashboardCredentials from "../UserDashboardCredentials";
import { useTranslation } from "react-i18next";

export default function Index({ coupons, overviews, user }) {
    const { t } = useTranslation();
    const columns = [
        {
            header: t("code"),
            accessor: "coupon.code",
        },
        // {
        //     header: "Phone Number",
        //     accessor: "claim_for_user.user.phone",
        // },
        {
            header: t("purchasedAt"),
            accessor: "created_at",
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
                        statusText = t("Claimed");
                        badgeClass = "badge-success";
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
    ];

    return (
        <UserLayout>
            <Container>
                <PageHeader />
                <OverviewGrid items={overviews} className="xl:grid-cols-3" />
                {/* <CouponFilter /> */}
                <Table
                    tableData={coupons}
                    columns={columns}
                    SearchFilterBox={<CouponFilter />}
                />
                <section className="credential-section">
                    <UserDashboardCredentials user={user} />
                </section>
            </Container>
        </UserLayout>
    );
}
