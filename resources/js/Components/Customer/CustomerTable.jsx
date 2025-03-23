import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "@inertiajs/react";
import moment from "moment";
import sharedComposable from "@/Composables/sharedComposable";

export function CustomerTable({ customers }) {
    const { deleteRow } = sharedComposable();

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="bg-gray-50 text-left font-bold">
                            <th className="px-6 pb-4 pt-5">Name</th>
                            <th className="px-6 pb-4 pt-5">Email</th>
                            <th className="px-6 pb-4 pt-5">Phone</th>
                            <th className="px-6 pb-4 pt-5">Registered</th>
                            <th className="px-6 pb-4 pt-5">Total Claims</th>
                            <th className="px-6 pb-4 pt-5">Verified Claims</th>
                            <th className="px-6 pb-4 pt-5">Active Claims</th>
                            <th className="px-6 pb-4 pt-5">Login Count</th>
                            <th className="px-6 pb-4 pt-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.data.map((customer) => (
                            <tr
                                key={customer.id}
                                className="focus-within:bg-gray-50 hover:bg-gray-50"
                            >
                                <td className="border-t">
                                    <span className="flex items-center px-6 py-4">
                                        {customer.name}
                                    </span>
                                </td>
                                <td className="border-t">
                                    <span className="flex items-center px-6 py-4">
                                        {customer.email}
                                    </span>
                                </td>
                                <td className="border-t">
                                    <span className="flex items-center px-6 py-4">
                                        {customer.phone}
                                    </span>
                                </td>
                                <td className="flex items-center gap-0 border-t">
                                    <span className="px-6 py-4">
                                        {moment(customer.created_at).format(
                                            "MMM D, YYYY"
                                        )}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {moment(customer.created_at).fromNow()}
                                    </span>
                                </td>
                                <td className="border-t">
                                    <span className="flex items-center px-6 py-4">
                                        {customer.total_claims}
                                    </span>
                                </td>
                                <td className="border-t">
                                    <span className="flex items-center px-6 py-4">
                                        {customer.verified_claims}
                                    </span>
                                </td>
                                <td className="border-t">
                                    <span className="flex items-center px-6 py-4">
                                        {customer.active_claims}
                                    </span>
                                </td>
                                <td className="border-t">
                                    <span className="flex items-center px-6 py-4">
                                        {customer.login_count}
                                    </span>
                                </td>
                                <td className="border-t">
                                    <div className="flex items-center gap-2 px-6 py-4">
                                        <Link
                                            href={route(
                                                "admin.customers.edit",
                                                customer.id
                                            )}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Icon
                                                icon="heroicons:pencil-square"
                                                className="h-5 w-5"
                                            />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                deleteRow(
                                                    route(
                                                        "admin.customers.destroy",
                                                        customer.id
                                                    ),
                                                    "Customer has been deleted successfully"
                                                )
                                            }
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Icon
                                                icon="heroicons:trash"
                                                className="h-5 w-5"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {customers.data.length === 0 && (
                            <tr>
                                <td
                                    className="border-t px-6 py-4 text-center"
                                    colSpan="9"
                                >
                                    No customers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="border-t bg-gray-50 px-6 py-4">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-500 focus:ring-primary-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon icon="heroicons:magnifying-glass" className="h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        Showing {customers.from || 0} to {customers.to || 0} of{" "}
                        {customers.total || 0} results
                    </div>
                    <div className="flex gap-2">
                        {customers.links?.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                className={`rounded px-4 py-2 text-sm ${link.active
                                    ? "bg-primary-500 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {link.label
                                    .replace("&laquo;", "«")
                                    .replace("&raquo;", "»")}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}