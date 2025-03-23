import { Container } from "@/Components/shared/Container";
import { InputGroup } from "@/Components/shared/InputGroup";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { TextAreaGroup } from "@/Components/shared/TextAreaGroup";
import Table from "@/Components/shared/Table";
import { Icon } from "@iconify/react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
export default function ChangeCredential({ user, about, socials, note }) {
    const {
        data: passwordData,
        setData: setPasswordData,
        post: passwordPost,
        processing: passwordProcessing,
        errors: passwordErrors,
    } = useForm();

    const {
        data: emailData,
        setData: setEmailData,
        post: emailPost,
        processing: emailProcessing,
        errors: emailErrors,
    } = useForm({ email: user.email });

    const {
        data: phoneData,
        setData: setPhoneData,
        post: phonePost,
        processing: phoneProcessing,
        errors: phoneErrors,
    } = useForm();

    const {
        data: aboutData,
        setData: setAboutData,
        post: aboutPost,
        processing: aboutProcessing,
        errors: aboutErrors,
    } = useForm({
        welcome: about.welcome,
        about: about.about,
    });

    const changePassword = (e) => {
        e.preventDefault();
        passwordPost(route("admin.change-password.store"));
    };

    const changeEmail = (e) => {
        e.preventDefault();
        emailPost(route("admin.change-email.store"));
    };

    const changePhone = (e) => {
        e.preventDefault();
        phonePost(route("admin.change-phone.store"));
    };

    const editAbout = (e) => {
        e.preventDefault();
        aboutPost(route("admin.about-content.update"));
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

    const columns = [
        {
            header: "ID",
            accessor: "id",
        },
        {
            header: "Name",
            accessor: "name",
        },
        {
            header: "Link",
            accessor: "link",
        },
        {
            header: "Icon",
            call: ({ original }) => {
                return (
                    <img
                        src={original.icon}
                        className="h-12 w-20 object-cover"
                    ></img>
                );
            },
        },
        {
            header: "Action",
            call: ({ original }) => (
                <div className="flex">
                    <div className="dropdown" data-placement="bottom-start">
                        <div className="dropdown-toggle">
                            <Icon
                                className="w-30 text-lg"
                                icon="bi:three-dots-vertical"
                            />
                        </div>
                        <div className="dropdown-content w-40">
                            <ul className="dropdown-list">
                                <li className="dropdown-list-item">
                                    <Link
                                        href={route(
                                            "admin.social.edit",
                                            original.id
                                        )}
                                        className="dropdown-link"
                                    >
                                        <Icon
                                            className="h-6 text-slate-400"
                                            icon="material-symbols:edit-outline"
                                        />
                                        <span>Edit</span>
                                    </Link>
                                </li>

                                <li className="dropdown-list-item">
                                    <button
                                        className="dropdown-link"
                                        onClick={() =>
                                            deleteRow(
                                                route(
                                                    "admin.social.destroy",
                                                    original.id
                                                ),
                                                "Social Link has been deleted successfully"
                                            )
                                        }
                                    >
                                        <Icon
                                            className="h-6"
                                            icon="material-symbols:delete-outline"
                                        />
                                        <span>Delete</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    const { t } = useTranslation();
    const { data, setData, post, processing } = useForm({
        content: note?.content || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.note.update"));
    };

    return (
        <AdminLayout>
            <Container>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {/* Password section */}
                    <div>
                        <section className="bg-white">
                            <div className="container mx-auto px-6 text-center">
                                <div className="min-h-[330px] rounded-lg bg-gray-100 p-8 shadow-lg">
                                    <h2 className="mb-8 text-3xl font-bold">
                                        Change Password
                                    </h2>
                                    <form
                                        onSubmit={changePassword}
                                        className="text-left"
                                        method="POST"
                                    >
                                        <InputGroup
                                            label="Password"
                                            placeholder="Password"
                                            name="password"
                                            formObject={passwordData}
                                            setFormObject={setPasswordData}
                                            validationError={passwordErrors}
                                        />
                                        <InputGroup
                                            label="Confirm Password"
                                            placeholder="Confirm Password"
                                            name="password_confirmation"
                                            formObject={passwordData}
                                            setFormObject={setPasswordData}
                                            validationError={passwordErrors}
                                        />
                                        <div className="mt-4 lg:mt-8">
                                            <PrimaryButton
                                                className="w-full"
                                                isLoading={passwordProcessing}
                                            >
                                                Update
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Phone section */}
                    <div>
                        <section className="bg-white">
                            <div className="container mx-auto px-6 text-center">
                                <div className="min-h-[330px] rounded-lg bg-gray-100 p-8 shadow-lg">
                                    <h2 className="mb-8 text-3xl font-bold">
                                        Change Mobile
                                    </h2>
                                    <form
                                        onSubmit={changePhone}
                                        className="text-left"
                                        method="POST"
                                    >
                                        <InputGroup
                                            label="Mobile"
                                            placeholder="Mobile"
                                            name="phone"
                                            formObject={phoneData}
                                            setFormObject={setPhoneData}
                                            validationError={phoneErrors}
                                        />
                                        <div className="mt-4 lg:mt-[120px]">
                                            <PrimaryButton
                                                className="w-full"
                                                isLoading={phoneProcessing}
                                            >
                                                Update
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Note section */}
                <div className="container mx-auto py-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="ml-5 text-3xl font-semibold">
                            {t("Notes")}
                        </h1>
                        <button
                            type="button"
                            disabled={processing}
                            className="mr-7 rounded bg-[#fdd017] px-4 py-2 font-bold text-black hover:bg-[#e5bb15] focus:outline-none focus:ring-2 focus:ring-[#fdd017]"
                            onClick={handleSubmit}
                        >
                            {processing ? t("Updating...") : t("Update")}
                        </button>
                    </div>

                    <div className="w-full rounded-lg bg-white p-6 shadow-sm">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="w-full"
                        >
                            <div className="w-full">
                                <textarea
                                    className="min-h-[calc(100vh-250px)] w-full resize-none rounded-lg border p-4 focus:border-[rgb(253,208,23)] focus:ring-[rgb(253,208,23)]"
                                    placeholder={t("Enter your note here...")}
                                    value={data.content}
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Welcome section */}
                <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
                    <div>
                        <section className="bg-white">
                            <div className="container mx-auto px-6 text-center">
                                <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
                                    <h2 className="mb-8 text-3xl font-bold">
                                        Welcome & About Section
                                    </h2>
                                    <form onSubmit={editAbout}>
                                        <div className="grid grid-cols-1 gap-4 text-left">
                                            <InputGroup
                                                label="Welcome Text"
                                                name="welcome"
                                                placeholder="Welcome Text"
                                                formObject={aboutData}
                                                setFormObject={setAboutData}
                                                validationError={aboutErrors}
                                            />
                                            <div className="md:col-span-2">
                                                <TextAreaGroup
                                                    label="About Text"
                                                    name="about"
                                                    formObject={aboutData}
                                                    setFormObject={setAboutData}
                                                    validationError={
                                                        aboutErrors
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <PrimaryButton
                                                isLoading={aboutProcessing}
                                                type="submit"
                                            >
                                                Update
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="mt-3 flex justify-between">
                    <span className="text-white">Social Links</span>

                    <PrimaryButton key={"1"} url={"/admin/social/create"}>
                        <div className="flex items-center gap-2">
                            <Icon
                                className="h-4 w-4 text-white"
                                icon="heroicons:plus"
                            />
                            <span>Add Link</span>
                        </div>
                    </PrimaryButton>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
                    <Table tableData={socials} columns={columns} />
                </div>
            </Container>
        </AdminLayout>
    );
}
