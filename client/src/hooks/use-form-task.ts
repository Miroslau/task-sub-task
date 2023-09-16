import {createTask, taskType} from "../types/task-type";
import {useCallback, useEffect, useState} from "react";

const useFormTask = (
    callback: any,
    validateErrors: any,
    callBackFunction: any,
    task?: taskType  | createTask |  null
) => {
    const [taskModel, setTaskModel] = useState<createTask>({
        title: '',
        description: ''
    })

    useEffect(() => {
        if (task) {
            const taskDTO = {
                title: task?.title,
                description: task?.description,
            };

            setTaskModel(taskDTO);
        }
    }, [task]);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setTaskModel({ ...taskModel, [name]: value });
        },
        [taskModel]
    );

    const updateModes = useCallback((dto: taskType) => {
        setTaskModel(dto);
    }, [taskModel])

    const handleClear = () => {
        setTaskModel({
            title: "",
            description: "",
        });
        callBackFunction();
    };

    const handleSubmit = useCallback(() => {
        setErrors(validateErrors(taskModel));
        setIsSubmitting(true);
    }, [taskModel]);

    const clearError = () => {
        setErrors({});
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback(taskModel);
        }
    }, [errors]);

    return {
        handleChange,
        handleSubmit,
        taskModel,
        errors,
        clearError,
        handleClear,
        updateModes,
    };
}

export default useFormTask;
