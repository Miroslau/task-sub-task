import {taskSliceState} from "../../types/task-type";
import StatusEnum from "../../enums/status-enum";
import {createSlice} from "@reduxjs/toolkit";
import {fetchTasks} from "../actions/fetch.tasks";
import {RootState} from "../index";
const initialState: taskSliceState = {
    errorMessage: "",
    tasks: [],
    totalTasks: 0,
    totalPages: 0,
    status: StatusEnum.LOADING,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTask(state, { payload }) {
            state.tasks.push({ ...payload });
        },
        clearTask(state, { payload }) {
            state.tasks.splice(state.tasks.findIndex((task) => task.id === payload), 1);
        },
        changeStatusOfTask(state, {payload}) {
            let idx = state.tasks.findIndex((task) => task.id === payload.idOfTask)
            if (idx >= 0) {
                state.tasks[idx].status = payload.status
            }
        },
        updateObjTask(state, {payload}) {
            let idx = state.tasks.findIndex((task) => task.id === payload.id)
            if (idx >= 0) {
                state.tasks[idx] = payload
            }
        },
        setStatus(state, { payload }) {
            state.status = payload;
        },
        clearState(state) {
            state.tasks = [];
            state.totalTasks = 0;
            state.totalPages = 0;
            state.errorMessage = "";
            state.status = StatusEnum.LOADING;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state, { payload }) => {
            state.status = StatusEnum.LOADING;
            state.tasks = [];
            state.totalTasks = 0;
            state.totalPages = 0;
        });

        builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
            state.tasks = payload?.results;
            state.totalTasks = payload?.total;
            state.totalPages = payload?.page_total;
            state.status = StatusEnum.SUCCESS;
        });

        builder.addCase(fetchTasks.rejected, (state, { payload }) => {
            state.status = StatusEnum.ERROR;
            state.tasks = [];
            state.totalTasks = 0;
            state.totalPages = 0;
            state.errorMessage = payload;
        });
    }
});

export const { setTask, changeStatusOfTask, clearTask, updateObjTask , clearState, setStatus } = taskSlice.actions;

export const taskSelector = (state: RootState) => state.task;
