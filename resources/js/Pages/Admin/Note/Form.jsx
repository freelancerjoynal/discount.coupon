import React from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function Form({ note, action }) {
    const { t } = useTranslation();
    const { data, setData, post, put, processing, errors } = useForm({
        title: note?.title || "",
        content: note?.content || "",
        status: note?.status ?? true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (note) {
            put(route("admin.notes.update", note.id));
        } else {
            post(route("admin.notes.store"));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="mb-6">
                <label className="block mb-2">
                    {t("Title")}
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
                    />
                </label>
                {errors.title && (
                    <div className="text-red-500 mt-1">{errors.title}</div>
                )}
            </div>

            <div className="mb-6">
                <label className="block mb-2">
                    {t("Content")}
                    <textarea
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
                        rows="6"
                    />
                </label>
                {errors.content && (
                    <div className="text-red-500 mt-1">{errors.content}</div>
                )}
            </div>

            <div className="mb-6">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={data.status}
                        onChange={(e) => setData("status", e.target.checked)}
                        className="rounded border-gray-300 text-primary-500 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500"
                    />
                    <span className="ml-2">{t("Active")}</span>
                </label>
                {errors.status && (
                    <div className="text-red-500 mt-1">{errors.status}</div>
                )}
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                    {t("Cancel")}
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600"
                >
                    {processing ? t("Saving...") : t("Save")}
                </button>
            </div>
        </form>
    );
}
