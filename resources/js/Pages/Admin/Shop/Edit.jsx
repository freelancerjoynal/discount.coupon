import { Container } from "@/Components/shared/Container";
import { InputGroup } from "@/Components/shared/InputGroup";
import { PageHeader } from "@/Components/shared/PageHeader";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import { SelectGroup } from "@/Components/shared/SelectGroup";
import { TextAreaGroup } from "@/Components/shared/TextAreaGroup";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import { useForm } from "@inertiajs/react";
import { shopStatus } from "./constant";
export default function Edit({ shop, user, category }) {
    const { data, setData, post, processing, errors } = useForm({
        id: user.id,
        position: shop.position,
        phone: user.phone,
        name: shop.name,
        short_description: shop.short_description,
        type: shop.type,
        status: shop.status,
        description: shop.description,
        site_url: shop.site_url,
        _method: "put",
    });

    const editShop = (e) => {
        e.preventDefault();
        post(route("admin.shops.update", shop.id));
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
                        <form onSubmit={editShop}>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup
                                    label="Position"
                                    placeholder="Enter position"
                                    name="position"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <InputGroup
                                    label="Phone no"
                                    placeholder="Enter Shop Owner Number"
                                    name="phone"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
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
                                    label="Select Type"
                                    name="type"
                                    options={categoryOptions}
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                    className={"text-black"}
                                />
                                <div className="md:col-span-2">
                                    <InputGroup
                                        label="Short Description"
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
                                    except="image/*"
                                    placeholder="Enter Short Description"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <InputGroup
                                    label="Site Link (optional)"
                                    name="site_url"
                                    type="string"
                                    placeholder="https://example.com"
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                />
                                <SelectGroup
                                    label="Select Status"
                                    name="status"
                                    options={shopStatus}
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                    className={"text-black"}
                                />
                                {/* <SelectGroup
                                    label="Add Shop User"
                                    name="user_id"
                                    options={users}
                                    formObject={data}
                                    setFormObject={setData}
                                    validationError={errors}
                                /> */}
                                <div className="col-span-2">
                                    <TextAreaGroup
                                        label="Description (optional)"
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
