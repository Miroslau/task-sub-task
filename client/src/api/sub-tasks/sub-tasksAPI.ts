import httpClient from "../index";
import {changeStatus, createSubTask, createTask, taskType} from "../../types/task-type";

export default {
    getAllSubTasksByTaskId(id: number) {
        return httpClient.get(`sub-tasks/by-task/${id}`);
    },

    createSubTask({ title, description, taskId}: createSubTask) {
        return httpClient.post(`/sub-tasks`, {
            title,
            description,
            taskId,
        })
    },

    updateSubTask(id: number, body: taskType | createTask) {
        return httpClient.put(`sub-tasks/${id}`, body);
    },

    changeStatusSubTask({ status, idOfTask }: changeStatus) {
        return httpClient.patch(`/sub-tasks/${idOfTask}/status`, {
            status,
        })
    },

    deleteSubTask(id: number | undefined) {
        return httpClient.delete(`/sub-tasks/${id}`);
    }
}
