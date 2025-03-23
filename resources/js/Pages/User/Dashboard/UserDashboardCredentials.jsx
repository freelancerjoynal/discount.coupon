import { Container } from "@/Components/shared/Container";
import { InputGroup } from "@/Components/shared/InputGroup";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import ShopLayout from "@/Layouts/shop/ShopLayout";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function UserDashboardCredentials({ user }) {
    const { t } = useTranslation();
    const [isEdit, setIsEdit] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        phone: user.phone,
        password: "",
        _method: "post",
    });

    const editCredits = () => {
        setIsEdit(true);
    };

    const updateCredits = (e) => {
        e.preventDefault();
        post(route("user.user.change.credit"), {
            onSuccess: () => {
                setIsEdit(false);
            },
        });
    };

    useEffect(() => {
        // Function to call the background task endpoint
        const runBackgroundTask = async () => {
            try {
                const response = await fetch("/update-expired-claims", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Task completed:", result);
                } else {
                    console.error(
                        "Error running background task:",
                        await response.text()
                    );
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        runBackgroundTask();
    }, []);

    return (
        <>
            <h4 className="mt-5 text-xl font-bold text-[#333333]">{t("credential")}</h4>
            <form onSubmit={updateCredits}>
                <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="min-w-[100px] font-semibold text-gray-700">Mobile: </span>
                        {isEdit ? (
                            <InputGroup
                                name="phone"
                                formObject={data}
                                setFormObject={setData}
                                validationError={errors}
                            />
                        ) : (
                            <span className="text-gray-900"> {user.phone}</span>
                        )}
                        {isEdit ? (
                            ""
                        ) : (
                            <button 
                                onClick={() => setIsEdit(true)}
                                className="ml-2 text-blue-600 hover:underline"
                            >
                                ({t("edit")})
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="min-w-[100px] font-semibold text-gray-700">{t("password")}: </span>
                        {isEdit ? (
                            <InputGroup
                                name="password"
                                type="password"
                                formObject={data}
                                setFormObject={setData}
                                validationError={errors}
                            />
                        ) : (
                            <span className="text-gray-900"> ******</span>
                        )}
                        {isEdit ? (
                            ""
                        ) : (
                            <button 
                                onClick={() => setIsEdit(true)}
                                className="ml-2 text-blue-600 hover:underline"
                            >
                                ({t("edit")})
                            </button>
                        )}
                    </div>
                </div>
                {isEdit && (
                    <div className="mt-4">
                        <PrimaryButton type="submit" isLoading={processing}>
                            {t("update")}
                        </PrimaryButton>
                    </div>
                )}
            </form>
        </>
    );
}
