import { useTranslation } from "react-i18next";

export default function Contact({ content }) {
    const { t } = useTranslation();
    // const { data, setData, post, processing, errors } = useForm({
    //     name: '',
    //     phone: '',
    //     subject: '',
    //     message: '',
    // });
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [successMessage, setSuccessMessage] = useState('');

    // const submitContact = async (e) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     setSuccessMessage('');

    //     post(route("submit.contact"), {
    //         onSuccess: () => {
    //             setSuccessMessage('Your message was sent successfully!');
    //             setData({
    //                 name: '',
    //                 phone: '',
    //                 subject: '',
    //                 message: '',
    //             });
    //         },
    //         onFinish: () => setIsSubmitting(false),
    //     });
    // };

    return (
        <section className="py-6 text-black" id="contact">
            {/* <div className="my-8 flex items-start justify-center">
                <h2 className="border-b-4 border-white pb-6 text-center font-['Varela_Round'] text-4xl font-[400] tracking-[-1px] text-[#ffffff] sm:text-[40px] sm:tracking-[-2px] md:text-[45px]">
                    {t("contactUs")}
                </h2>
            </div> */}
            <div className="container py-5 lg:max-w-[80%] xl:max-w-[70%]">
                {/* <form className="px-4" onSubmit={submitContact}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                        <div>
                            <label className="text-white font-['Varela_Round']" htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                style={{ background:'#172820', color:'white' }}
                            />
                        </div>
                        <div>
                            <label className="text-white font-['Varela_Round']" htmlFor="phone">Phone No</label>
                            <input
                                id="phone"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none font-['Varela_Round']"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                style={{ background:'#172820', color:'white' }}
                            />
                        </div>
                        <div>
                            <label className="text-white font-['Varela_Round']" htmlFor="subject">Subject</label>
                            <input
                                id="subject"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none"
                                name="subject"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                required
                                style={{ background:'#172820', color:'white' }}
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="text-white dark:text-gray-200 font-['Varela_Round']" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none"
                            rows="10"
                            name="message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            required
                            style={{ background:'#172820', color:'white' }}
                        ></textarea>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600 font-['Varela_Round']"
                            disabled={processing || isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </div>
                </form> */}
                {/* {successMessage && (
                    <div className="mt-4 text-green-500 font-['Varela_Round']">
                        {successMessage}
                    </div>
                )} */}
                <div className="max-w-full py-5 text-center lg:max-w-[100%] xl:max-w-[100%]">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {content.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center"
                            >
                                <span className="font-['Varela_Round'] font-bold capitalize sm:text-[30px] md:text-[25px] lg:text-[30px]">
                                    {item.label}:
                                </span>
                                <span className="font-['Varela_Round'] sm:text-[25px] md:text-[25px] lg:text-[25px]">
                                    {item.content}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
