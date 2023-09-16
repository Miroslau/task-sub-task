import RouteType from "../types/routeType";
import {TASKS} from "../constants/routes";
import Tasks from "../pages/tasks/tasks";

const routes: RouteType[] = [{
    path: TASKS,
    Component: Tasks
}];

export default routes;
