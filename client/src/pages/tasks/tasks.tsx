import React, {useEffect, useState} from 'react';
import {Box, Button, Menu} from "@mui/material";
import FlexBetween from "../../components/section-component/flex-between/flex-between";
import Header from "../../components/section-component/header/header";
import {AddCircleOutlineOutlined, Edit} from "@mui/icons-material";
import ButtonMui from '../../components/ui-components/button-mui/button-mui';
import {useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import {clearState, setStatus, setTask, clearTask, updateObjTask, changeStatusOfTask, taskSelector} from "../../store/slices/task-slice";
import {fetchTasks} from "../../store/actions/fetch.tasks";
import {DataGrid, GridApi, GridCellValue, GridColDef} from "@mui/x-data-grid";
import StatusEnum from "../../enums/status-enum";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/loader";
import useFormTask from "../../hooks/use-form-task";
import {taskValidator} from "../../validators/task-validator";
import ModalMui from "../../components/ui-components/modal-mui/modal-mui";
import Form from "../../components/form/form";
import {taskForm} from "../../constants/task-form";
import tasksAPI from "../../api/tasks/tasksAPI";
import { Delete } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";

const LIMIT_ITEMS = 8;

const DIALOG = {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
};

const STATUSTASK = ['Todo', 'InProgress', 'Done']

const Tasks = () => {
    const [isOpenModal, setOpenModal] = useState(false);
    const [isStatusTaskOpen, setStatusTaskOpen] = React.useState<HTMLButtonElement | null>(null);
    const [idOfTask, setIdOfTask] = useState(0)
    const [editTaskModal, setEditTaskModal] = useState(false);

    const dispatch = useAppDispatch();

    const { tasks, status } = useSelector(taskSelector);

    const createTask = () => {
        dispatch(setStatus(StatusEnum.LOADING));
        tasksAPI.createTask(taskModel)
            .then(({ data }) => {
                dispatch(setTask(data))
                dispatch(setStatus(StatusEnum.SUCCESS));
                closeModal();
            })
            .catch((error) => {
                console.error(error);
                dispatch(setStatus(StatusEnum.ERROR));
                closeModal();
            })
    }

    const updateTask = () => {
        dispatch(setStatus(StatusEnum.LOADING));
        tasksAPI.updateTask(idOfTask, taskModel)
            .then(({data}) => {
                dispatch(updateObjTask(data))
                dispatch(setStatus(StatusEnum.SUCCESS));
                closeModal();
            })
            .catch((error) => {
                console.error(error);
                dispatch(setStatus(StatusEnum.ERROR));
                closeModal();
            })
    }

    const changeStatus = (status: string) => {
        dispatch(setStatus(StatusEnum.LOADING));
        tasksAPI.changeStatusTask({status, idOfTask})
            .then(({data}) => {
                dispatch(changeStatusOfTask({idOfTask, status}))
                dispatch(setStatus(StatusEnum.SUCCESS));
                setStatusTaskOpen(null);
            })
            .catch((error) => {
                console.log(error);
                dispatch(setStatus(StatusEnum.ERROR));
                setStatusTaskOpen(null);
            })
    };

    const deleteTask = (id: number) => {
        dispatch(setStatus(StatusEnum.LOADING));
        tasksAPI.deleteTask(id)
            .then(({ data }) => {
                dispatch(clearTask(data))
                dispatch(setStatus(StatusEnum.SUCCESS));
            })
            .catch((error) => {
                console.error(error);
                dispatch(setStatus(StatusEnum.ERROR));
            })
    };
    const closeModal = () => {
        setOpenModal(false);
        setEditTaskModal(false)
        handleClear();
    };

    const getTasks = () => {
        dispatch(
            fetchTasks({
                limit: LIMIT_ITEMS,
                page: 0
            })
        )
    }

    const {
        handleChange,
        handleSubmit,
        taskModel,
        errors,
        handleClear,
        updateModes,
    } = useFormTask(createTask, taskValidator, setOpenModal);

    useEffect(() => {
        getTasks();
        dispatch(clearState());
    }, [])

    const handleClick = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
        setIdOfTask(id)
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
                    setIdOfTask(id)
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
                    deleteTask(thisRow?.id)

                }

                return <Delete onClick={onClick}/>;
            }
        }
    ]

    return (
        <Box p="1.5rem 2.5rem">
            {
                status === StatusEnum.LOADING && (
                    <Modal>
                        <Loader />
                    </Modal>
                )
            }
            <FlexBetween>
                <Header
                    title="ALL TASKS"
                    titleColor="#fff6e0"
                    subTitleColor="#ffe3a3"
                    subtitle="See your list of tasks" />
                <ButtonMui
                    title="Add task"
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
            <Box style={{ height: 400, width: '100%', paddingTop: 10 }}>
                <DataGrid
                    columns={taskTable}
                    rows={tasks}
                />
            </Box>
            <ModalMui
                isOpen={isOpenModal}
                title="Add new Task"
                onClose={closeModal}
                styles={DIALOG}>
                <Form
                    inputs={taskForm}
                    title="Add task"
                    model={taskModel}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleClear={handleClear} />
            </ModalMui>
            <ModalMui
                isOpen={editTaskModal}
                title="Edit current task"
                onClose={closeModal}
                styles={DIALOG}>
                <Form
                    inputs={taskForm}
                    title="Edit task"
                    model={taskModel}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={updateTask}
                    handleClear={handleClear} />
            </ModalMui>
        </Box>
    );
};

export default Tasks;
