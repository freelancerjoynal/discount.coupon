import { Link } from "@inertiajs/react";
import React from "react";
import { useTranslation } from "react-i18next";

export const BreadCrumb = ({ segments }) => {
    const { t } = useTranslation();
    return (
        <ol className="breadcrumb">
            {segments.length
                ? segments.map((item, index) => (
                      <li key={index} className="breadcrumb-item">
                          <Link href="#">{t(item)}</Link>
                      </li>
                  ))
                : ""}
        </ol>
    );
};
