import React from "react";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { Head } from "@inertiajs/react";
import Form from "./Form";
import { useTranslation } from "react-i18next";

export default function Edit({ note }) {
    const { t } = useTranslation();

    return (
        <AdminLayout>
            <Head title={t("Edit Note")} />
            <div className="container mx-auto py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold">{t("Edit Note")}</h1>
                </div>

                <div className="bg-white rounded shadow p-6">
                    <Form note={note} />
                </div>
            </div>
        </AdminLayout>
    );
}
