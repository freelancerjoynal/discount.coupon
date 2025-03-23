import { Container } from "@/Components/shared/Container";
import { InputGroup } from "@/Components/shared/InputGroup";
import { PageHeader } from "@/Components/shared/PageHeader";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({});

    const claimACoupon = (e) => {
        e.preventDefault();
        post(route("admin.coupon-claims.store"));
    };
    return (
        <AdminLayout>
            <Container>
                <PageHeader />
                <section className="bg-white py-10">
                    <div className="container mx-auto px-6 text-center">
                        <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
                            <h2 className="mb-8 text-4xl font-bold">
                                Claim Your Coupon
                            </h2>
                            <p className="mb-8 text-lg">
                                Enter your coupon code below to claim your
                                discount.
                            </p>
                            <form
                                onSubmit={claimACoupon}
                                className="text-left"
                                method="POST"
                            >
                                <InputGroup
                                    label="Coupon Code"
                                    placeholder="Pizza coupon"
                                    name="coupon_code"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <InputGroup
                                    label="Customer PHone Number"
                                    placeholder="Enter customer phone number"
                                    name="phone"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <div className="mt-4 lg:mt-8">
                                    <PrimaryButton
                                        className="w-full"
                                        isLoading={processing}
                                    >
                                        Claim
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Container>
        </AdminLayout>
    );
}
