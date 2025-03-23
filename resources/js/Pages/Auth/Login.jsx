import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import logo from "@/assets/images/updated_logo.png";
import { InputGroup } from "@/Components/shared/InputGroup";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import "./loginCss.css";
import { useTranslation } from "react-i18next";

export default function Login() {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors } = useForm({
        // Default country code
        phone: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("loginSubmit"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div
                className="card mx-auto w-full max-w-md font-['Varela_Round']"
                style={{ background: "rgb(24 36 30)" }}
            >
                <form onSubmit={submit} className="card-body px-10 py-12">
                    <div className="flex flex-col items-center justify-center">
                        <img src={logo} alt="logo" className="h-24 w-auto" />
                        <h5 className="mt-4 text-white ">{t("welcomeBack")}</h5>
                        <p className="text-sm text-white">{t("enterDetail")}</p>
                    </div>
                    <div className="login-forms mt-6 flex flex-col gap-5 text-white">
                        {/* Phone */}
                        <InputGroup
                            label="Mobile"
                            name="phone"
                            formObject={data}
                            setFormObject={setData}
                            validationError={errors}
                        />

                        {/* Password */}
                        <InputGroup
                            label={t("password")}
                            name="password"
                            type="password"
                            formObject={data}
                            setFormObject={setData}
                            validationError={errors}
                        />
                    </div>
                    {/* Remember & Forgot*/}
                    <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 bg-transparent text-primary-500 shadow-sm transition-all duration-150 checked:hover:shadow-none focus:ring-0 focus:ring-offset-0 enabled:hover:shadow disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600"
                                id="remember-me"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                            />
                            <label
                                htmlFor="remember-me"
                                className="label text-white dark:text-white"
                            >
                                {t("rememberMe")}
                            </label>
                        </div>
                        <a
                            href={route("forgetPassword")}
                            className="text-sm text-red-500 hover:text-red-600 hover:underline"
                        >
                            {t("forgetPassword")}
                        </a>
                    </div>
                    {/* Login Button */}
                    <div className="mt-8">
                        <PrimaryButton
                            type="submit"
                            className="w-full bg-red-500 hover:bg-red-600 focus:bg-red-600"
                            isLoading={processing}
                        >
                            {t("login")}
                        </PrimaryButton>
                        <div className="relative mt-4 flex h-6 items-center justify-center py-4">
                            <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-600"></div>
                            <div className="t absolute w-10 bg-white text-center text-xs text-black dark:bg-slate-800 dark:text-black">
                                {t("or")}
                            </div>
                        </div>
                    </div>
                    {/* Don't Have An Account */}
                    <div className="mt-4 flex justify-center">
                        <p className="text-sm text-white dark:text-white">
                            {t("noAccount")}?
                            <Link
                                href={route("register")}
                                className="ml-1 text-sm text-red-500 hover:underline"
                            >
                                {t("signup")}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
