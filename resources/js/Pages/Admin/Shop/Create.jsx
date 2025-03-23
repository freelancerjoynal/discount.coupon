import { Container } from "@/Components/shared/Container";
import { InputGroup } from "@/Components/shared/InputGroup";
import { PageHeader } from "@/Components/shared/PageHeader";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import { SelectGroup } from "@/Components/shared/SelectGroup";
import { TextAreaGroup } from "@/Components/shared/TextAreaGroup";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { useForm } from "@inertiajs/react";
import { shopStatus } from "./constant";
export default function Create({ users, category }) {
    const { data, setData, post, processing, errors } = useForm({
        position: "",
        phone: "",
        name: "",
        short_description: "",
        type: "",
        image: "",
        status: true,
    });

    const createShop = (e) => {
        e.preventDefault();
        post(route("admin.shops.store"));
    };

    // Transform category data into options format
    const categoryOptions = category.map((cat) => ({
        value: cat.category,
        label: cat.category,
    }));

    return (
        <AdminLayout>
            <Container>
                <PageHeader />
                <div className="card mx-auto max-w-[800px]">
                    <div className="card-body">
                        <form onSubmit={createShop}>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <InputGroup
                                    label="Position"
                                    placeholder="Enter Position"
                                    name="position"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <InputGroup
                                    label="Mobile"
                                    placeholder="Enter Shop Owner Number"
                                    name="phone"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <InputGroup
                                    label="Password"
                                    placeholder="12345678"
                                    name="password"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                    disabled={true}
                                />
                                <InputGroup
                                    label="Shop Name"
                                    placeholder="Enter Shop Name"
                                    name="name"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <SelectGroup
                                    label="Category"
                                    name="type"
                                    options={categoryOptions}
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                    className={"text-black"}
                                />
                                <div className="md:col-span-2">
                                    <InputGroup
                                        label="Title"
                                        name="short_description"
                                        type="text"
                                        placeholder="Enter Short Description"
                                        formObject={data}
                                        setFormObject={setData}
                                        validationError={errors}
                                    />
                                </div>
                                <InputGroup
                                    label="Image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <InputGroup
                                    label="Link"
                                    name="site_url"
                                    type="text"
                                    placeholder="https://example.com"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <SelectGroup
                                    label="Status"
                                    name="status"
                                    options={shopStatus}
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                    className={"text-black"}
                                />
                                <div className="md:col-span-2">
                                    <TextAreaGroup
                                        label="Description"
                                        name="description"
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
                                    Add
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </AdminLayout>
    );
}
