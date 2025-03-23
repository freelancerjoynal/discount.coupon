import fb from "@/images/frontend/socialIcon/fb.png";
import insta from "@/images/frontend/socialIcon/insta.png";
import sp from "@/images/frontend/socialIcon/sp.png";
import twe from "@/images/frontend/socialIcon/twe.png";
import wp from "@/images/frontend/socialIcon/wp.png";

export default function Footer({ socials }) {
    const socialLinks = [
        {
            id: 1,
            image: fb,
        },
        {
            id: 2,
            image: insta,
        },
        {
            id: 3,
            image: sp,
        },
        {
            id: 4,
            image: twe,
        },
        {
            id: 5,
            image: wp,
        },
    ];

    return (
        <footer
            className="py-6 text-black"
            style={{ background: "rgb(251,251,251)" }}
        >
            <div className="container mx-auto flex flex-wrap items-center justify-center gap-4 text-center font-['Varela_Round'] text-[18px] font-[400] tracking-[-1px] text-[#000] sm:text-[20px] md:gap-5 md:text-[24px] lg:text-[28px] xl:text-[33px]">
                <p>&copy; 2024 - Balash Coupons, Erbil.</p>
                <a href="#" className="underline">
                    Terms of Use
                </a>
                <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                    {(
                        (socials && socials?.length && socials) ||
                        socialLinks
                    ).map((link) => (
                        <a
                            key={link.id}
                            href={link?.link ?? "#"}
                            target="_blank"
                            className="flex items-center justify-center"
                        >
                            <img
                                src={link.icon || link.image}
                                alt={link.id}
                                className="h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
