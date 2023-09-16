import httpClient from "../index";
import {changeStatus, createTask, taskType} from "../../types/task-type";
export default {
    getAllTasks(limit: number, page: number) {
        const query = `tasks?limit=${limit}&page=${page}`;
        return httpClient.get(query);
    },

    createTask({ title, description }: createTask) {
        return httpClient.post(`/tasks`, {
            title,
            description
        })
    },

    updateTask(id: number, body: taskType | createTask) {
        return httpClient.put(`tasks/${id}`, body);
    },

    changeStatusTask({ status, idOfTask }: changeStatus) {
        return httpClient.patch(`/tasks/${idOfTask}/status`, {
            status,
        })
    },

    deleteTask(id: number | undefined) {
        return httpClient.delete(`/tasks/${id}`);
    }
}
