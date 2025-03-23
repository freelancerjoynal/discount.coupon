import { Container } from "@/Components/shared/Container";
import { PageHeader } from "@/Components/shared/PageHeader";
import Table from "@/Components/shared/Table";
import UserLayout from "@/Layouts/user/UserLayout";
import moment from "moment";
import { CouponFilter } from "./CouponFilter";

export default function Index({ coupons }) {
    const columns = [
        {
            header: "Code",
            accessor: "coupon.code",
        },
        // {
        //     header: "Phone Number",
        //     accessor: "claim_for_user.user.phone",
        // },
        {
            header: "Purchased At",
            accessor: "created_at",
            call: ({ value }) => moment(value).format("DD-MM-YYYY"),
        },
        {
            header: "Status",
            accessor: "status",
            call: ({ value }) => {
                if (value) {
                    return <span className="badge badge-success">Active</span>;
                } else {
                    return (
                        <span className="badge badge-warning">Inactive</span>
                    );
                }
            },
        },
    ];

    return (
        <UserLayout>
            <Container>
                <PageHeader />
                {/* <CouponFilter /> */}
                <Table
                    tableData={coupons}
                    columns={columns}
                    SearchFilterBox={<CouponFilter />}
                />
                {!coupons.data?.length && <CouponFilter search={search} />}
            </Container>
        </UserLayout>
    );
}
