import React from "react";

const routeToTask = {
    name: 'Task',
    params: {
        id: 'id'
    },
    paramName: 'id',
    paramValue: 'id',
    props: true
}

const columns = [
    {
        title: 'TITLE',
        prop: 'title',
        route: routeToTask,
        hover: true,
        width: 'minmax(40px, 1fr)'
    },
    {
        title: 'DESCRIPTION',
        prop: 'title',
        hover: true,
        width: 'minmax(40px, 1fr)'
    }
]

export default columns
