import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import logo from "@/assets/images/updated_logo.png";
import { InputGroup } from "@/Components/shared/InputGroup";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import "./loginCss.css";
import { useTranslation } from "react-i18next";

export default function ForgetPassword() {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors } = useForm({
        phone: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("forgetPasswordPhoneCheck"));
    };

    return (
        <GuestLayout>
            <Head title="Forget Password" />
            <div
                className="card mx-auto w-full max-w-md font-['Varela_Round']"
                style={{ background: "rgb(24 36 30)" }}
            >
                <form onSubmit={submit} className="card-body px-10 py-12">
                    <div className="flex flex-col items-center justify-center">
                        <img src={logo} alt="logo" className="h-16 w-auto" />
                        <h5 className="mt-4 text-white dark:text-white">
                            {t("forgetPassword")}
                        </h5>
                    </div>
                    <div className="login-forms mt-6 flex flex-col gap-5 text-black">
                        {/* Email */}
                        <InputGroup
                            label="Mobile"
                            name="phone"
                            formObject={data}
                            setFormObject={setData}
                            validationError={errors}
                        />
                    </div>
                    {/* Login Button */}
                    <div className="mt-8">
                        <PrimaryButton
                            type="submit"
                            className="w-full"
                            isLoading={processing}
                        >
                            {t("sendOtp")}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
