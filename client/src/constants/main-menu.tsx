import { AssessmentOutlined } from "@mui/icons-material";
import React from "react";

export type Navigation = {
    text: string;
    icon: React.FC | any;
};

export const menuItems: Navigation[] = [
    {
        text: "Menu",
        icon: null,
    },
    {
        text: "Tasks",
        icon: <AssessmentOutlined />,
    }
];
