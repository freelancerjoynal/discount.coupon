import { useTranslation } from "react-i18next";
export default function About({ content }) {
    const { t } = useTranslation();
    return (
        <section className="py-6 text-black" id="about">
            {/* <div className="my-8 flex items-start justify-center">
                <h2 className="border-b-4 border-white pb-6 text-center font-['Varela_Round'] text-4xl font-[400] tracking-[-1px] text-[#ffffff] sm:text-[40px] sm:tracking-[-2px] md:text-[45px]">
                    {t("aboutUs")}
                </h2>
            </div> */}
            <div className="container max-w-full py-5 lg:max-w-[80%] xl:max-w-[70%]">
                <p className="text-justify font-['Varela_Round'] sm:text-[30px] md:text-[25px] lg:text-[30px]">
                    {content}
                </p>
            </div>
        </section>
    );
}
