import tasksAPI from "../../api/tasks/tasksAPI";
import {createAsyncThunk} from "@reduxjs/toolkit";

import {taskType, taskParams, resultType} from "../../types/task-type";

export const fetchTasks = createAsyncThunk<resultType<taskType>, taskParams>(
    "task/fetchTasks", async (params, thunkAPI) => {
        try {
            const { limit, page } = params;

            const { status, data } = await tasksAPI.getAllTasks(limit, page);

            if (status !== 200) {
                return thunkAPI.rejectWithValue(data);
            }

            return data;

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    })
