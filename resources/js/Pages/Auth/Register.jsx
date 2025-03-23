import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { InputGroup } from "@/Components/shared/InputGroup";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import logo from "@/assets/images/updated_logo.png";
import { PasswordInput } from "@/Components/shared/PasswordInput";
import { useTranslation } from "react-i18next";

export default function Register() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        user_type: "user",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div
                className="card mx-auto w-full max-w-md font-['Varela_Round']"
                style={{ background: "rgb(24 36 30)" }}
            >
                <form onSubmit={submit} className="card-body px-10 py-12">
                    <div className="flex flex-col items-center justify-center">
                        <img src={logo} alt="logo" className="h-24 w-auto" />
                        <p className="text-sm text-white">{t("enterDetail")}</p>
                    </div>

                    <div className="login-forms mt-6 flex flex-col gap-5 [&_.label]:text-white">
                        {/* Name */}
                        <InputGroup
                            label={t("name")}
                            name="name"
                            formObject={data}
                            setFormObject={setData}
                            validationError={errors}
                        />

                        {/* Phone */}
                        <InputGroup
                            label="Mobile"
                            name="phone"
                            formObject={data}
                            setFormObject={setData}
                            validationError={errors}
                            required
                        />

                        {/* Password */}
                        <PasswordInput
                            label={t("password")}
                            data={data}
                            setData={setData}
                            errors={errors}
                        />

                        {/* Confirm Password */}
                        <InputGroup
                            label={t("confirmPassword")}
                            name="password_confirmation"
                            type="password"
                            formObject={data}
                            setFormObject={setData}
                            validationError={errors}
                        />
                    </div>

                    <div className="mt-2 flex">
                        <div className="flex items-center gap-1.5">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 bg-transparent text-red-500 shadow-sm transition-all duration-150 checked:hover:shadow-none focus:ring-0 focus:ring-offset-0 enabled:hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
                                id="remember-me"
                            />
                            <label
                                htmlFor="remember-me"
                                className="label text-white"
                            >
                                {t("iAccept")}
                            </label>
                        </div>
                        <a
                            href="#"
                            className="ml-2 text-sm text-red-500 hover:text-red-600 hover:underline"
                        >
                            {t("termCondition")}
                        </a>
                    </div>

                    {/* Register Button */}
                    <div className="mt-8">
                        <PrimaryButton
                            type="submit"
                            className="w-full bg-red-500 hover:bg-red-600"
                            isLoading={processing}
                        >
                            {t("register")}
                        </PrimaryButton>
                        <div className="relative mt-4 flex h-6 items-center justify-center py-4">
                            <div className="h-[1px] w-full bg-slate-600"></div>
                            <div className="absolute w-10 bg-[rgb(24,36,30)] text-center text-xs text-white">
                                {t("or")}
                            </div>
                        </div>
                    </div>

                    {/* Already Have An Account */}
                    <div className="mt-4 flex justify-center">
                        <p className="text-sm text-white">
                            {t("haveAccount")}?
                            <Link
                                href={route("login")}
                                className="ml-1 text-red-500 hover:text-red-600 hover:underline"
                            >
                                {t("login")}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
