import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { InputGroup } from "@/Components/shared/InputGroup";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import logo from "@/assets/images/updated_logo.png";
import { useTranslation } from "react-i18next";

export const LoginForm = ({ onSuccess }) => {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        phone: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("loginSubmit"));
    };

    return (
        <form
            onSubmit={submit}
            className="card-body px-10 py-12"
            style={{ background: "rgb(24 36 30)" }}
        >
            <div className="flex flex-col items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
                <h5 className="mt-4 text-white dark:text-white">
                    {t("welcomeBack")}
                </h5>
                <p className="text-sm text-white dark:text-white">
                    {t("enterDetail")}
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-5 [&_.label]:text-white">
                <InputGroup
                    label="Phone"
                    name="phone"
                    formObject={data}
                    setFormObject={setData}
                    validationError={errors}
                    className="text-white"
                />

                <InputGroup
                    label="Password"
                    name="password"
                    type="password"
                    formObject={data}
                    setFormObject={setData}
                    validationError={errors}
                    className="text-white"
                />
            </div>
            <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 bg-transparent text-red-500 shadow-sm transition-all duration-150 checked:hover:shadow-none focus:ring-0 focus:ring-offset-0 enabled:hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
                        id="remember-me"
                        value={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                    />
                    <label
                        htmlFor="remember-me"
                        className="label text-white"
                    >
                        {t("rememberMe")}
                    </label>
                </div>
                <a
                    href="#"
                    className="text-sm text-red-500 hover:text-red-600 hover:underline"
                >
                    {t("forgetPassword")}
                </a>
            </div>
            <div className="mt-8">
                <PrimaryButton
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600"
                    isLoading={processing}
                >
                    {t("login")}
                </PrimaryButton>
                <div className="relative mt-4 flex h-6 items-center justify-center py-4">
                    <div className="h-[1px] w-full bg-slate-600"></div>
                    <div className="absolute w-10 bg-[rgb(24,36,30)] text-center text-xs text-white">
                        {t("or")}
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <p className="text-sm text-white">
                    {t("noAccount")}?
                    <Link 
                        href={route('register')} 
                        className="ml-1 text-red-500 hover:text-red-600 hover:underline"
                    >
                        {t("signup")}
                    </Link>
                </p>
            </div>
        </form>
    );
};
