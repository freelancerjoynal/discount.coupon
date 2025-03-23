export const __ADMIN_MENU_ITEMS = [
    {
        // icon: "heroicons:rectangle-stack",
        title: "coupons",
        url: route("admin.coupons.index"),
    },
    {
        // icon: "heroicons:bookmark",
        title: "customers",
        url: route("admin.customers"),
    },
    {
        // icon: "heroicons:shopping-cart",
        title: "shops",
        url: route("admin.shops.index"),
    },
    {
        // icon: "heroicons-outline:view-list",
        title: "categories",
        url: route("admin.category.index"),
    },
    // {
    //     // icon: "heroicons:squares-2x2",
    //     title: "socialLink",
    //     url: route("admin.social.index"),
    // },
    // {
    //     // icon: "heroicons:envelope",
    //     title: "contacts",
    //     url: route("admin.contacts.view"),
    // },
    {
        // icon: "heroicons:key",
        title: "edit",
        url: route("admin.change-credential.index"),
    },
    // {
    //     // icon: "heroicons:bookmark",
    //     title: "notes",
    //     url: route("admin.note"),
    // },
];
