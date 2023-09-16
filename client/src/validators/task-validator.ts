interface Error {
    [key: string]: string;
}

export const taskValidator = (values: any): Error => {
    const errors: Error = {};

    if (!values.title.trim()) {
        errors.title = "Title for task is required";
    }

    if (!values.description.trim()) {
        errors.plot = "Description for task is required";
    }

    return errors;
}
