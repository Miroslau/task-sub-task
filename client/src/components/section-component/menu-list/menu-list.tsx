import React, { FC } from "react";
import { Navigation } from "../../../constants/main-menu";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import { ChevronRightOutlined } from "@mui/icons-material";

interface MenuListProps {
    items: Navigation[];
    listStyle?: {};
    handleNavigate?: (text: string) => void;
    typographyStyle?: {};
    activeItem?: string;
}

const MenuList: FC<MenuListProps> = ({
                                         items,
                                         listStyle,
                                         handleNavigate,
                                         typographyStyle,
                                         activeItem,
                                     }) => {
    const theme = useTheme();

    return (
        <List sx={listStyle}>
            {items.map(({ text, icon }) => {
                    if (!icon) {
                        return (
                            <Typography key={text} sx={typographyStyle}>
                            {text}
                            </Typography>
                    );
                    }

                    const lcText = text.toLowerCase();

                    return (
                        <ListItem key={text} disablePadding>
                    <ListItemButton
                        onClick={handleNavigate?.bind(this, lcText)}
                    sx={{
                        backgroundColor:
                            activeItem === lcText ? "#ffedc2" : "transparent",
                                color: activeItem === lcText ? "#191F45" : "#fff6e0",
                    }}
                >
                    <ListItemIcon
                        sx={{
                        ml: "2rem",
                            color: activeItem === lcText ? "#191F45" : "#ffedc2",
                    }}
                >
                    {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {activeItem === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                    </ListItemButton>
                    </ListItem>
                );
                })}
            </List>
    );
};

export default MenuList;
