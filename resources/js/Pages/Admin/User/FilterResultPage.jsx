import { Container } from "@/Components/shared/Container";
import { Filter } from "@/Components/shared/Filter";
import { OverviewGrid } from "@/Components/shared/OverviewGrid";
import { PageHeader } from "@/Components/shared/PageHeader";
import Table from "@/Components/shared/Table";
import sharedComposable from "@/Composables/sharedComposable";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { Icon } from "@iconify/react";
import { Link } from "@inertiajs/react";
import React from "react";
import { UserFilter } from "./UserFilter";

export default function FilterResultPage({ users, search }) {
    const { deleteRow } = sharedComposable();

    const columns = [
        {
            header: "ID",
            accessor: "id",
        },
        {
            header: "Name",
            accessor: "name",
        },
        {
            header: "Phone",
            accessor: "phone",
        },
        {
            header: "Email",
            accessor: "email",
        },
        {
            header: "Role",
            call: ({ original }) => {
                let role = original.roles;
                if (role.length > 0) {
                    return role[0].name;
                }
                return "";
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
                                <li className="dropdown-list-item">
                                    <Link
                                        href={route(
                                            "admin.users.edit",
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
                                                    "admin.users.destroy",
                                                    original.id
                                                ),
                                                "User has been deleted successfully"
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
        <React.Fragment>
            <AdminLayout>
                <Container>
                    <PageHeader />
                    <Table tableData={users} columns={columns} />
                    <UserFilter search={search} />
                </Container>
            </AdminLayout>
        </React.Fragment>
    );
}
