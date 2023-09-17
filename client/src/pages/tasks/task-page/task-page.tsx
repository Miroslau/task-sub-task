import React, {useEffect, useState} from 'react';
import {taskType} from "../../../types/task-type";
import {useNavigate, useParams} from "react-router-dom";
import {TASKS} from "../../../constants/routes";
import tasksAPI from "../../../api/tasks/tasksAPI";
import {Box, Button, Menu} from "@mui/material";
import Loader from "../../../components/loader/loader";
import Modal from "../../../components/modal/modal";
import Header from "../../../components/section-component/header/header";
import ButtonMui from "../../../components/ui-components/button-mui/button-mui";
import {AddCircleOutlineOutlined, Delete, Edit} from "@mui/icons-material";
import FlexBetween from "../../../components/section-component/flex-between/flex-between";
import subTasksAPI from "../../../api/sub-tasks/sub-tasksAPI";
import {DataGrid, GridApi, GridCellValue, GridColDef} from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import ModalMui from "../../../components/ui-components/modal-mui/modal-mui";
import useFormTask from "../../../hooks/use-form-task";
import {taskValidator} from "../../../validators/task-validator";
import Form from "../../../components/form/form";
import {subTaskForm} from "../../../constants/sub-task-form";

const DIALOG = {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
};

const STATUSTASK = ['Todo', 'InProgress', 'Done']

const TaskPage = () => {
    const [isOpenModal, setOpenModal] = useState(false);
    const [editTaskModal, setEditTaskModal] = useState(false);
    const [isStatusTaskOpen, setStatusTaskOpen] = React.useState<HTMLButtonElement | null>(null);
    const [task, setTask] = useState<taskType | null>(null);
    const [subTasks, setSubTasks] = useState<taskType[]>([]);
    const [idOfSubTask, setIdOfSubTask] = useState(0)
    const [isLoading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const getTaskById = async () => {
        setLoading(true);
        try {
            const { data: task } = await tasksAPI.getTaskById(Number(id));
            const { data: subTasks } = await subTasksAPI.getAllSubTasksByTaskId(task.id);
            setTask(task);
            setSubTasks(subTasks);
            setLoading(false);
        } catch (error) {
            console.log(error)
            navigate(`/${TASKS}`);
            setLoading(false)
        }
    }

    const createSubtask = () => {
        setLoading(true)
        // @ts-ignore
        const { id: taskId } = task;
        subTasksAPI.createSubTask({...taskModel, taskId})
            .then(({ data }) => {
                const { id, title, description, status } = data;
                setSubTasks((arr) => [...arr, {id, title, description, status}]);
                setLoading(false);
                closeModal();
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }

    const changeStatus = (status: string) => {
        setLoading(true)
        const idOfTask = idOfSubTask;
        subTasksAPI.changeStatusSubTask({status, idOfTask})
            .then(({ data }) => {
                const subTask = subTasks.map((task) => {
                    if (task.id === data.id) {
                        return {...task, status: data.status};
                    }

                    return task;
                })
                setSubTasks(subTask);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
                setStatusTaskOpen(null);
            })
    }

    const deleteSubTask = (id: number) => {
        setLoading(true);
        subTasksAPI.deleteSubTask(id)
            .then(({ data }) => {
                setSubTasks((current) => current.filter((task) => task.id !== data))
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }

    const updateSubTask = () => {
        setLoading(true);
        subTasksAPI.updateSubTask(idOfSubTask, taskModel)
            .then(({ data }) => {
                const { id, description, title } = data;
                const subTask = subTasks.map((task) => {
                    if (task.id === id) {
                        return {...task, title: title, description: description};
                    }

                    return task;
                });
                setSubTasks(subTask);
                setLoading(false);
                closeModal();
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }

    const closeModal = () => {
        setOpenModal(false);
        setEditTaskModal(false);
        handleClear();
    };

    const {
        handleChange,
        handleSubmit,
        taskModel,
        errors,
        handleClear,
        updateModes,
    } = useFormTask(createSubtask, taskValidator, setOpenModal);

    useEffect(() => {
        getTaskById();
    }, [])

    const handleClick = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
        setIdOfSubTask(id)
        setStatusTaskOpen(event.currentTarget);
    };

    const open = Boolean(isStatusTaskOpen);

    const taskTable: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.2,
        },
        {
            field: 'title',
            headerName: 'TITLE',
            flex: 0.5,
        },
        {
            field: 'description',
            headerName: 'DESCRIPTION',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'STATUS',
            flex: 0.5,
            renderCell: (params) => {

                const { row } = params;

                return (
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            variant="contained"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick.bind(this, row.id)}
                        >
                            {row?.status}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={isStatusTaskOpen}
                            open={open}
                            onClose={() => setStatusTaskOpen(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                STATUSTASK.map((status, index) => (<MenuItem key={index} onClick={changeStatus.bind(this, status)}>{status}</MenuItem>))
                            }
                        </Menu>
                    </div>
                )

            }
        },
        {
            field: 'edit',
            headerName: '',
            flex: 0.2,
            align: "center",
            renderCell: (params) => {
                const onClick = (e: any) => {
                    e.stopPropagation();
                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c: any) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c: any) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );

                    const {id, title, description, status} = thisRow
                    // @ts-ignore
                    setIdOfSubTask(id)
                    // @ts-ignore
                    updateModes({title, description})

                    setEditTaskModal(true)
                }

                return <Edit onClick={onClick}/>;
            }
        },
        {
            field: 'delete',
            headerName: '',
            flex: 0.2,
            align: "center",
            renderCell: (params) => {
                const onClick = (e: any) => {
                    e.stopPropagation();
                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c: any) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c: any) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );
                    // @ts-ignore
                    deleteSubTask(thisRow?.id)

                }

                return <Delete onClick={onClick}/>;
            }
        }
    ]

    return (
        <Box p="1.5rem 2.5rem">
            {
                isLoading && (
                    <Modal>
                        <Loader />
                    </Modal>
                )
            }
            <FlexBetween>
                <Header
                    title={task?.title}
                    titleColor="#fff6e0"
                    subTitleColor="#ffe3a3"
                    subtitle={task?.description} />
                <ButtonMui
                    title="Add sub task"
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    clickButton={setOpenModal}
                >
                    <AddCircleOutlineOutlined
                        sx={{
                            marginLeft: 1,
                        }}
                    />
                </ButtonMui>
            </FlexBetween>
            <FlexBetween pt='1.5rem'>
                <Header
                    title="ALL SUB-TASKS OF TASK"
                    titleColor="#fff6e0"
                    subTitleColor="#ffe3a3"
                    subtitle="See your list of subtasks" />
            </FlexBetween>
            <Box style={{ height: 400, width: '100%', paddingTop: 10 }}>
                <DataGrid
                    columns={taskTable}
                    rows={subTasks}
                />
            </Box>
            <ModalMui isOpen={isOpenModal} title="Add new Sub Task" onClose={closeModal} styles={DIALOG}>
                <Form
                    inputs={subTaskForm}
                    title="Add sub task"
                    model={taskModel}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleClear={handleClear} />
            </ModalMui>
            <ModalMui isOpen={editTaskModal} title="Edit current Sub Task" onClose={closeModal} styles={DIALOG}>
                <Form
                    inputs={subTaskForm}
                    title="Edit sub task"
                    model={taskModel}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={updateSubTask}
                    handleClear={handleClear} />
            </ModalMui>
        </Box>
    );
};

export default TaskPage;
