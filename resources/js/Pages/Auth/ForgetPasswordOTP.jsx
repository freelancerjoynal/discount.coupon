import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import logo from "@/assets/images/updated_logo.png";
import { InputGroup } from "@/Components/shared/InputGroup";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ForgetPassword() {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors } = useForm({
        otp: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("forgetPasswordOtpCheck"));
    };

    const [resendText, setResendText] = useState(t("resendOtp"));

    const handleResendClick = () => {
        // Update the text to "Sending..."
        setResendText(t("sending"));

        // You might want to actually resend the OTP here, e.g., make an API call.
        // After sending, you could reset the text or handle it differently.

        // Simulating API call delay for demo purposes
        setTimeout(() => {
            setResendText(t("resendOtp"));
        }, 3000); // Change back to "Resend OTP" after 3 seconds
    };

    return (
        <GuestLayout>
            <Head title="OTP Code" />
            <div
                className="card mx-auto w-full max-w-md font-['Varela_Round']"
                style={{ background: "rgb(24 36 30)" }}
            >
                <form onSubmit={submit} className="card-body px-10 py-12">
                    <div className="flex flex-col items-center justify-center">
                        <img src={logo} alt="logo" className="h-16 w-auto" />
                        <h5 className="mt-4 text-white dark:text-white">
                            {t("enterOtp")}
                        </h5>
                    </div>
                    <div className="mt-6 flex flex-col gap-5 text-black">
                        {/* Email */}
                        <InputGroup
                            label={t("otp")}
                            name="otp"
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
                            {t("submit")}
                        </PrimaryButton>
                        <div className="relative mt-4 flex h-6 items-center justify-center py-4">
                            <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-600"></div>
                            <div className="t absolute w-10 bg-white text-center text-xs text-black dark:bg-slate-800 dark:text-black"></div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <p className="text-sm text-white dark:text-white">
                            <Link
                                href={route("resendForgetOtp")}
                                className="text-sm text-primary-500 hover:underline"
                                id="resendOtp"
                                onClick={handleResendClick}
                            >
                                {resendText}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
