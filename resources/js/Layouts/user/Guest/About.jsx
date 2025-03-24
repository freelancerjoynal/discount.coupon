import { useTranslation } from "react-i18next";

export default function About({ content }) {
    const { t } = useTranslation();
    return (
        <section className="py-6 text-black" id="about">
            <div className="container max-w-full py-5 lg:max-w-[80%] xl:max-w-[70%]">
                <p className="text-justify font-['Varela_Round'] sm:text-[30px] md:text-[25px] lg:text-[30px]">
                    {content}
                </p>
            </div>
        </section>
    );
}
