import RouteType from "../types/routeType";
import {TASK, TASKS} from "../constants/routes";
import Tasks from "../pages/tasks/tasks";
import TaskPage from "../pages/tasks/task-page/task-page";

const routes: RouteType[] = [
    {
        path: TASKS,
        Component: Tasks
    },
    {
        path: TASK,
        Component: TaskPage
    },
];

export default routes;
