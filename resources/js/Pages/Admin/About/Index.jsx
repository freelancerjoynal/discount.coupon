import { Container } from "@/Components/shared/Container";
import { InputGroup } from "@/Components/shared/InputGroup";
import { PageHeader } from "@/Components/shared/PageHeader";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import { SelectGroup } from "@/Components/shared/SelectGroup";
import SwitchBox from "@/Components/shared/SwitchBox";
import { TextAreaGroup } from "@/Components/shared/TextAreaGroup";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { useForm } from "@inertiajs/react";
import moment from "moment";
import React, { useEffect } from "react";
export default function Index({ about }) {
    const { data, setData, post, processing, errors } = useForm({
        welcome: about.welcome,
        about: about.about,
        _method: "post",
    });

    const editAbout = (e) => {
        e.preventDefault();
        post(route("admin.about-content.update"));
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
        <AdminLayout>
            <Container>
                <PageHeader />
                <div className="card mx-auto mt-5 max-w-[800px]">
                    <div className="card-body">
                        <form onSubmit={editAbout}>
                            <div className="grid grid-cols-1 gap-4">
                                <InputGroup
                                    label="Welcome Text"
                                    name="welcome"
                                    placeholder="Welcome Text"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <div className="md:col-span-2">
                                    <TextAreaGroup
                                        label="About Text"
                                        name="about"
                                        formObject={data}
                                        setFormObject={setData}
                                        validationError={errors}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <PrimaryButton
                                    isLoading={processing}
                                    type="submit"
                                >
                                    Update
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </AdminLayout>
    );
}
