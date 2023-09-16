import React, { ElementType, FC, ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Theme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalMUi {
    children: ReactNode | null;
    isOpen: boolean | false;
    title: string;
    onClose: (args?: any) => void;
    styles?: any;
}

const colorStyle = {
    color: (theme?: Theme) => theme?.palette?.grey[500],
};

const ModalMui: FC<ModalMUi> = (props: ModalMUi) => {
    const { isOpen, children, styles, onClose, title } = props;

    return (
        <Dialog open={Boolean(isOpen)} onClose={onClose}>
            <DialogTitle sx={styles}>
                {title}
                <IconButton onClick={onClose} aria-label="close" sx={colorStyle}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent
                style={{
                    paddingTop: 5,
                }}
            >
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default ModalMui;
