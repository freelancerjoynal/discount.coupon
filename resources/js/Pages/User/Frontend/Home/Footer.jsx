import About from "@/Layouts/user/Guest/About";
import Contact from "@/Layouts/user/Guest/Contact";
import { useTranslation } from "react-i18next";

export default function Footer({ socials, about, contact, note }) {
    const { t } = useTranslation();

    return (
        <section>
            <div
                style={{ background: "rgb(251,251,251)" }}
                className="px-8 py-6 text-black sm:px-0"
            >
                <About content={about} />
            </div>

            <div
                style={{ background: "rgb(251,251,251)" }}
                className="py-6 text-black"
            >
                <Contact content={contact} />
            </div>

            {/* {note?.content && (
                <div style={{ background: "rgb(48, 48, 48)" }} className="py-6 text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-semibold text-center mb-8 text-white">
                            {t("Note")}
                        </h2>
                        <div className="max-w-3xl mx-auto p-6" style={{ background: "rgb(35, 35, 35)" }}>
                            <div className="text-lg text-gray-300 leading-relaxed">
                                {note.content.split('\n').map((line, index) => (
                                    <p key={index} className="mb-4">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </section>
    );
}
