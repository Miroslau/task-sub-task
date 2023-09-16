import Input from "../interfaces/input.interface";

export const taskForm: Input[] = [
    {
        id: 1,
        title: 'Title of task',
        model: 'title',
        required: true,
        placeholder: 'Enter a title for task',
        type: 'text',
        variant: 'outlined',
    },
    {
        id: 2,
        title: "Description for task",
        model: "description",
        required: true,
        placeholder: "Enter an description for task",
        type: "textarea",
        variant: "outlined",
    },
]
