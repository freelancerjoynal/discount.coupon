import React from "react";
import { useTranslation } from "react-i18next";

export default function Note({ note }) {
    const { t } = useTranslation();

    if (!note?.content) {
        return null;
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    {t("Note")}
                </h2>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
                    <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
                        {note.content.split('\n').map((line, index) => (
                            <p key={index} className="mb-4">
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
