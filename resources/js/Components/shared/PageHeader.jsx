import { Head, usePage } from "@inertiajs/react";
import React, { useMemo } from "react";
import PrimaryButton from "@/Components/shared/PrimaryButton";
import { BreadCrumb } from "@/Components/shared/BreadCrumb";
import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";
export const PageHeader = ({ title, buttons, segments }) => {
    const { t } = useTranslation();
    const pageHeader = usePage().props.pageHeader ?? {};

    const props = useMemo(
        () => ({
            title: title || pageHeader?.title || "",
            buttons: buttons || pageHeader?.buttons || [],
            segments: segments || pageHeader?.segments || [],
        }),
        [pageHeader, title, buttons, segments]
    );

    return (
        <React.Fragment>
            <Head title={t(props.title)} />
            <div className="flex flex-col justify-between gap-y-1 sm:flex-row sm:gap-y-0">
                <h1 className="text-3xl font-semibold ml-5">{t(props.title)}</h1>
                <div className="flex flex-row gap-4">
                    {props.buttons.length ? (
                        setButtons(props.buttons)
                    ) : (
                        <BreadCrumb segments={props.segments} />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

const setButtons = (buttons) => {
    const { t } = useTranslation();
    function setTitle(button) {
        if (button.icon) {
            return (
                <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-white" icon={button.icon} />
                    <span>{t(button.title) || t(button.name)}</span>
                </div>
            );
        }

        return button.title || button.name;
    }
    return buttons.map((button, index) =>
        button?.target ? (
            <PrimaryButton
                key={index}
                url="#"
                data-toggle="drawer"
                data-target={button?.target}
            >
                {setTitle(button)}
            </PrimaryButton>
        ) : (
            <PrimaryButton key={index} url={button?.url}>
                {setTitle(button)}
            </PrimaryButton>
        )
    );
};
