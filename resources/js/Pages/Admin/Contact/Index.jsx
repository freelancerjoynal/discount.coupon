import { Container } from "@/Components/shared/Container";
import { Filter } from "@/Components/shared/Filter";
import { PageHeader } from "@/Components/shared/PageHeader";
import Table from "@/Components/shared/Table";
import sharedComposable from "@/Composables/sharedComposable";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { Icon } from "@iconify/react";
import { Link } from "@inertiajs/react";
import React, {useEffect} from "react";

export default function Index({ contact }) {
    const { deleteRow } = sharedComposable();

    useEffect(() => {
        // Function to call the background task endpoint
        const runBackgroundTask = async () => {
            try {
                const response = await fetch('/update-expired-claims', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Task completed:', result);
                } else {
                    console.error('Error running background task:', await response.text());
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        runBackgroundTask();
    }, []);

    const columns = [
        {
            header: "Label",
            accessor: "label",
        },
        {
            header: "Content",
            accessor: "content",
        },
        {
            header: "Action",
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
                                <li className="dropdown-list-item">
                                    <Link
                                        href={route(
                                            "admin.contact.edit",
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
                                                    "admin.contact.delete",
                                                    original.id
                                                ),
                                                "Item has been deleted successfully"
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
                <Table tableData={contact} columns={columns} />
            </Container>
        </AdminLayout>
    );
}
