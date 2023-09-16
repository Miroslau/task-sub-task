import React, { FC } from "react";
import { Container } from "./form-styled";
import ButtonMui from "../ui-components/button-mui/button-mui";
import Input from "../../interfaces/input.interface";
import TextInput from "./text-input/text-input";
import TextArea from "./text-area/text-area";

interface FormProps {
    inputs: Input[];
    model: any;
    errors: any;
    handleChange: (args?: any) => void;
    handleSubmit: (args?: any) => void;
    title: string;
    handleClear?: () => void;
    changeRating?: (args?: any) => void;
}

const Form: FC<FormProps> = ({
                                 inputs,
                                 model,
                                 errors,
                                 handleChange,
                                 changeRating,
                                 handleSubmit,
                                 title,
                             }) => {
    const DynamicComponent = (input: Input): React.FC | React.Component | any => {
        const type = input.type || "";
        switch (type) {
            case "text":
                return TextInput;
            case "textarea":
                return TextArea;
            default:
                return TextInput;
        }
    };

    return (
        <Container>
            {inputs.map((input) => {
                const Component = DynamicComponent(input);

                return (
                    <Component
                        key={input.id}
                        id={input.id}
                        value={model[`${input.model}`]}
                        name={input.model}
                        type={input.type}
                        title={input.title}
                        helperText={errors[`${input.model}`]}
                        variant={input.variant}
                        required={input.required}
                        changeRating={changeRating}
                        inputText={handleChange}
                        label={input.title}
                    />
                );
            })}
            <ButtonMui
                variant="outlined"
                color="secondary"
                title={title}
                clickButton={handleSubmit}
            />
        </Container>
    );
};

export default Form;
