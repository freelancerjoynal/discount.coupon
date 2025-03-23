import "./CustomResponsiveCss.css";
export default function Hero({ content }) {
    return (
        <section
            className="relative flex items-center justify-center px-4 font-['Varela_Round'] text-white sm:px-6 md:px-8 lg:px-10"
            style={{ background: "rgb(253, 208, 23)" }}
        >
            <div className="max-w-full py-5 text-center lg:max-w-[80%] xl:max-w-[70%]">
                <p
                    className="font-['Varela_Round'] sm:text-[30px] md:text-[25px] lg:text-[30px]"
                    style={{ color: "rgb(251, 251, 251)" }}
                >
                    {content}
                </p>
            </div>
        </section>
    );
}
