import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {FC, useEffect} from "react";

interface SelectProps {
    value: string
}

export const SelectMui: FC<SelectProps> = ({ value }) => {
    const [item, setItem] = React.useState(value);

    const handleChange = (event: SelectChangeEvent) => {
        setItem(event.target.value);
    };

    useEffect(() => {
        if (item !== value) {
            setItem(value);
        }
    }, [item]);

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Age</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={item}
                label="Status"
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    );
}
