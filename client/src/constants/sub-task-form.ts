import Input from "../interfaces/input.interface";

export const subTaskForm: Input[] = [
    {
        id: 1,
        title: 'Title of sub task',
        model: 'title',
        required: true,
        placeholder: 'Enter a title for sub task',
        type: 'text',
        variant: 'outlined',
    },
    {
        id: 2,
        title: "Description for sub task",
        model: "description",
        required: true,
        placeholder: "Enter an description for sub task",
        type: "textarea",
        variant: "outlined",
    },
]
