import React from "react";
import { useTranslation } from "react-i18next";

export default function Notes({ notes }) {
    const { t } = useTranslation();

    if (!notes?.length) return null;

    return (
        <section className="bg-[#111111] py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="bg-[#1A1A1A] rounded-lg p-6 shadow-lg"
                        >
                            {note.title && (
                                <h3 className="mb-4 font-['Varela_Round'] text-xl font-[400] tracking-[-1px] text-white sm:text-2xl">
                                    {note.title}
                                </h3>
                            )}
                            <p className="text-gray-300">{note.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
