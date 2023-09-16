import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

interface HeaderProps {
    title: string;
    titleColor: string;
    subTitleColor: string;
    subtitle?: string;
}

const Header: FC<HeaderProps> = ({
     title,
     subtitle,
     subTitleColor,
     titleColor,
    }) => {
    return (
        <Box>
            <Typography
                variant="h2"
                color={titleColor}
                fontWeight="bold"
                sx={{ mb: "5px" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={subTitleColor}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
