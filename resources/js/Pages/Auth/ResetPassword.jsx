import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import logo from "@/assets/images/updated_logo.png";
import { InputGroup } from "@/Components/shared/InputGroup";
import PrimaryButton from "@/Components/shared/PrimaryButton";

export default function ResetPassword(){

    const { data, setData, post, processing, errors } = useForm({
        password: "",
        confirm_password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("resetPasswordUpdate"));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            <div className="card mx-auto w-full max-w-md font-['Varela_Round']" style={{background:"rgb(24 36 30)"}}>
                <form onSubmit={submit} className="card-body px-10 py-12">
                    <div className="flex flex-col items-center justify-center">
                        <img src={logo} alt="logo" className="h-16 w-auto" />
                        <h5 className="mt-4 text-white dark:text-white">Welcome Back</h5>
                        <p className="text-sm text-white dark:text-white">
                            Reset your password
                        </p>
                    </div>
                    <div className="mt-6 flex flex-col gap-5 text-white dark:text-white">
                        {/* Password */}
                        <InputGroup
                            label="Password"
                            name="password"
                            type="password"
                            formObject={data}
                            setFormObject={setData}
                            validationError={errors}
                        />
                        {/* Email */}
                        <InputGroup
                            label="Confirm Password"
                            name="confirm_password"
                            type="password"
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
                            Change Password
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    )
}
