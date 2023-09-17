import {combineReducers} from "@reduxjs/toolkit";
import taskReducer from "./task-reducer";

const rootReducer = combineReducers({
    task: taskReducer,
})

export default rootReducer;
