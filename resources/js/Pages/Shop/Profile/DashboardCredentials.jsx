import { Container } from "@/Components/shared/Container";
import { InputGroup } from "@/Components/shared/InputGroup";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import ShopLayout from "@/Layouts/shop/ShopLayout";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function DashboardCredentials({ user, shop }) {
    const { t } = useTranslation();
    const [isEdit, setIsEdit] = useState(false);
    const [isEditImage, setIsEditImage] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        phone: user.phone,
        userName: user.name,
        shopName: shop.name,
        _method: "post",
    });

    const editCredits = () => {
        setIsEdit(true);
    };

    const updateCredits = (e) => {
        e.preventDefault();
        post(route("shop.shop.change.credit"), {
            onSuccess: () => {
                setIsEdit(false);
                setIsEditImage(false);
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
                    <div className="mb-3 flex items-center gap-2">
                        <span className="min-w-[100px] font-semibold text-gray-700">{t("shop")}: </span>
                        {isEdit ? (
                            <InputGroup
                                name="shopName"
                                formObject={data}
                                setFormObject={setData}
                                validationError={errors}
                            />
                        ) : (
                            <span className="text-gray-900"> {shop.name}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="min-w-[100px] font-semibold text-gray-700">{t("userName")}: </span>
                        {isEdit ? (
                            <InputGroup
                                name="userName"
                                formObject={data}
                                setFormObject={setData}
                                validationError={errors}
                            />
                        ) : (
                            <span className="text-gray-900"> {user.name}</span>
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

            <form onSubmit={updateCredits} className="mt-6">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-gray-200">
                            <img
                                src={shop.image || ""}
                                alt={shop.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">{t("photo")}</span>
                            {!isEditImage && (
                                <button 
                                    onClick={() => setIsEditImage(true)}
                                    className="ml-2 text-blue-600 hover:underline"
                                >
                                    ({t("edit")})
                                </button>
                            )}
                            {isEditImage && (
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setData({ ...data, image: e.target.files[0] })
                                        }
                                        className="block w-full cursor-pointer rounded-lg border border-gray-200 text-sm focus:outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {isEditImage && (
                        <div className="mt-4 flex gap-2">
                            <PrimaryButton type="submit" isLoading={processing}>
                                {t("update")}
                            </PrimaryButton>
                            <button
                                type="button"
                                onClick={() => setIsEditImage(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                {t("cancel")}
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
}
