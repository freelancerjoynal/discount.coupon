import React from "react";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Head } from "@inertiajs/react";

export default function Index({ note }) {
    const { t } = useTranslation();
    const { data, setData, post, processing } = useForm({
        content: note?.content || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.note.update"));
    };

    return (
        <AdminLayout>
            <Head title={t("Notes")} />
            <div className="container mx-auto py-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold ml-5">{t("Notes")}</h1>
                    <button
                        type="button"
                        disabled={processing}
                        className="bg-[#fdd017] hover:bg-[#e5bb15] text-black font-bold py-2 px-4 mr-7 rounded focus:outline-none focus:ring-2 focus:ring-[#fdd017]"
                        onClick={handleSubmit}
                    >
                        {processing ? t("Updating...") : t("Update")}
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 w-full">
                    <form onSubmit={(e) => e.preventDefault()} className="w-full">
                        <div className="w-full">
                            <textarea
                                className="w-full min-h-[calc(100vh-250px)] p-4 border rounded-lg resize-none focus:border-[rgb(253,208,23)] focus:ring-[rgb(253,208,23)]"
                                placeholder={t("Enter your note here...")}
                                value={data.content}
                                onChange={(e) => setData("content", e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
