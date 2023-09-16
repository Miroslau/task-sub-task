import React, { FC, useEffect, useState } from "react";
import { TextField } from "@mui/material";

interface TextAreaProps {
    id: number;
    label?: string;
    className?: any;
    variant?: "outlined" | "standard" | "filled" | undefined;
    value: string;
    name?: string;
    type: string;
    required: boolean;
    placeholder?: string;
    inputText?: (args?: any) => void;
    helperText?: string;
}

const TextArea: FC<TextAreaProps> = ({
                                         id,
                                         variant = "outlined",
                                         value,
                                         label,
                                         className,
                                         helperText,
                                         name,
                                         type,
                                         required,
                                         placeholder,
                                         inputText,
                                     }) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        if (value !== currentValue) {
            setCurrentValue(value);
        }
    }, [value]);

    const onChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setCurrentValue(event.target?.value);
    };

    return (
        <TextField
            className={className}
            error={!!helperText}
            id={id.toString()}
            label={label}
            value={currentValue}
            helperText={helperText}
            variant={variant}
            name={name}
            type={type}
            onBlur={inputText}
            placeholder={placeholder}
            required={required}
            onChange={onChangeHandler}
            multiline
            rows={5}
        />
    );
};

export default TextArea;
