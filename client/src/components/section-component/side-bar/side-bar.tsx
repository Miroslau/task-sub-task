import React, { FC, useEffect, useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import FlexBetween from "../flex-between/flex-between";
import { Typography } from "./side-bar-styled";
import { ChevronLeft } from "@mui/icons-material";
import MenuList from "../menu-list/menu-list";
import { menuItems } from "../../../constants/main-menu";
import { useLocation, useNavigate } from "react-router-dom";

interface SideBarProps {
    isNonMobile?: boolean;
    drawerWidth?: string;
    isSideBarOpen?: boolean;
    setIsSideBarOpen?: (isSideBarOpen: boolean) => void;
}
const SideBar: FC<SideBarProps> = ({
                                       isNonMobile,
                                       drawerWidth,
                                       isSideBarOpen,
                                       setIsSideBarOpen,
                                   }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const drawerStyle = {
        width: drawerWidth,
        "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderWidth: isNonMobile ? 0 : "2px",
            boxSizing: "border-box",
            backgroundColor: "#21295c",
            color: "#ffedc2",
        },
    };

    const typographyStyle = {
        m: "2.25rem 0 1rem 3rem",
    };

    const handleNavigate = (text: string) => {
        navigate(`/${text}`);
        setActive(text);
    };

    return (
        <Box component="nav">
            <Drawer
                open={isSideBarOpen}
                onClose={setIsSideBarOpen?.bind(this, false)}
                variant="persistent"
                anchor="left"
                sx={drawerStyle}
            >
                <Box width="100%" p="1.5rem 2rem 2rem 3rem">
                    <FlexBetween color="#ffedc2">
                        <Box display="flex" alignItems="center" gap="0.5rem">
                            <Typography>Tasks of todo</Typography>
                        </Box>
                        {!isNonMobile && (
                            <IconButton
                                onClick={setIsSideBarOpen?.bind(this, !isSideBarOpen)}
                            >
                                <ChevronLeft />
                            </IconButton>
                        )}
                    </FlexBetween>
                </Box>
                <Box width="100%">
                    <MenuList
                        items={menuItems}
                        handleNavigate={handleNavigate}
                        activeItem={active}
                        typographyStyle={typographyStyle}
                        listStyle={{
                            width: "100%",
                            position: "relative",
                            overflow: "auto",
                            maxHeight: "100%",
                            paddingBottom: "50px !important",
                        }}
                    />
                </Box>
            </Drawer>
        </Box>
    );
};

export default SideBar;
