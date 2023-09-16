import StatusEnum from "../enums/status-enum";

export type resultType<Pagination> = {
    results: Pagination[];
    total: number;
    page_total: number;
};

export type taskType = {
    id: number;
    title: string;
    description: string;
    status: string;
}

export type createTask = {
    title: string;
    description: string;
}

export type changeStatus = {
    idOfTask: number,
    status: string,
}

export type taskParams = {
    limit: number;
    page: number;
};

export type taskSliceState = {
    tasks: taskType[],
    status: StatusEnum,
    errorMessage: unknown;
    totalTasks: number;
    totalPages: number;
}
