import AdminLayout from "@/Layouts/admin/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useState } from "react";
import { Icon } from "@iconify/react";
import CustomerFilter from "@/Components/Customer/CustomerFilter";

export default function Index({ customers }) {
    const { t } = useTranslation();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const {
        data,
        setData,
        put,
        delete: destroy,
        post,
        processing,
    } = useForm({
        name: "",
        email: "",
        phone: "",
    });

    const openEditModal = (customer) => {
        setSelectedCustomer(customer);
        setData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(route("admin.customers.update", selectedCustomer.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setSelectedCustomer(null);
            },
            onError: (errors) => {
                if (errors.email) {
                    alert(t(errors.email));
                }
            },
        });
    };

    const openDeleteModal = (customer) => {
        setSelectedCustomer(customer);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        destroy(route("admin.customers.destroy", selectedCustomer.id), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelectedCustomer(null);
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={t("Customers")} />
            <div className="container mx-auto py-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="ml-5 text-3xl font-semibold">
                        {t("Customers")}
                    </h1>
                    <button
                        onClick={() => {
                            setData({
                                name: "",
                                email: "",
                                phone: "",
                            });
                            setIsCreateModalOpen(true);
                        }}
                        className="mr-5 rounded bg-[rgb(253,208,23)] px-4 py-2 font-bold text-black hover:bg-[rgb(253,208,23)] focus:bg-[rgb(253,208,23)] focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                        {t("Add Customer")}
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-50 text-left font-bold">
                                    <th className="px-6 pb-4 pt-5">
                                        {t("Name")}
                                    </th>
                                    <th className="px-6 pb-4 pt-5">
                                        {t("Email")}
                                    </th>
                                    <th className="px-6 pb-4 pt-5">
                                        {t("Mobile")}
                                    </th>
                                    <th className="px-6 pb-4 pt-5">
                                        {t("Registered")}
                                    </th>
                                    <th className="px-6 pb-4 pt-5">
                                        {t("Total Claims")}
                                    </th>
                                    <th className="px-6 pb-4 pt-5">
                                        {t("Verified Claims")}
                                    </th>
                                    <th className="px-6 pb-4 pt-5">
                                        {t("Active Claims")}
                                    </th>
                                    <th className="px-6 pb-4 pt-5">
                                        {t("Login Count")}
                                    </th>
                                    <th className="px-6 pb-4 pt-5">
                                        {t("Actions")}
                                    </th>
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
                                                {moment(
                                                    customer.created_at
                                                ).format("MMM D, YYYY")}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {moment(
                                                    customer.created_at
                                                ).fromNow()}
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
                                                <button
                                                    onClick={() =>
                                                        openEditModal(customer)
                                                    }
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <Icon
                                                        icon="heroicons:pencil-square"
                                                        className="h-5 w-5"
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openDeleteModal(
                                                            customer
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
                                            {t("No customers found.")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="border-t bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            {t("Showing")} {customers.from} {t("to")}{" "}
                            {customers.to} {t("of")} {customers.total}{" "}
                            {t("results")}
                        </div>

                        <div className="flex gap-2">
                            <div className="">
                                <CustomerFilter />
                            </div>
                            {customers.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`rounded px-4 py-2 text-sm ${
                                        link.active
                                            ? "bg-[rgb(253,208,23)] text-black"
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

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <Icon
                                            icon="heroicons:exclamation-triangle"
                                            className="h-6 w-6 text-red-600"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            {t("Delete Customer")}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {t(
                                                    "Are you sure you want to delete this customer? This action cannot be undone."
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={processing}
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    {processing
                                        ? t("Deleting...")
                                        : t("Delete")}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    {t("Cancel")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                            <form onSubmit={handleUpdate}>
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
                                        {t("Edit Customer")}
                                    </h3>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t("Name")}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t("Email")}
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t("Phone")}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        {processing
                                            ? t("Updating...")
                                            : t("Update")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsEditModalOpen(false)
                                        }
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                                    >
                                        {t("Cancel")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    post(route("admin.customers.store"), {
                                        onSuccess: () => {
                                            setIsCreateModalOpen(false);
                                        },
                                        onError: (errors) => {
                                            if (errors.email) {
                                                alert(t(errors.email));
                                            }
                                        },
                                    });
                                }}
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
                                        {t("Add Customer")}
                                    </h3>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t("Name")}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t("Email")}
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t("Password")}
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {t("Phone")}
                                        </label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        {processing
                                            ? t("Creating...")
                                            : t("Create")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsCreateModalOpen(false)
                                        }
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                                    >
                                        {t("Cancel")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
