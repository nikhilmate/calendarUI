import React, { Component } from 'react';
import AppContext from '../store/AppContext';
import Select from './Select';

import {
    CloseBtnIcon,
    DeleteIcon,
    EditIcon,
    NotesIcon,
    TaskListIcon,
    DatePickerIcon,
    DownArrow
} from '../utils/Icons';
import { getMins, getHour, getFormat, keyGen } from '../utils/Util';
import DatePickerComp from 'react-datepicker';
import CustomDateInput from './CustomDateInput';
import { FilterTasks } from '../utils/Filter';
import { deleteTask, getTaskDetails, updateTask } from '../utils/ApiActions';

class TaskListUtil extends Component {
    constructor(props) {
        super(props);
        this.taskStatus = ['All', 'Assigned', 'Completed'];
    }
    static contextType = AppContext;

    filterTasks = (timestamp, type) => {
        let tasks = this.context.AppData.taskManager.tasks;
        return FilterTasks({ tasks, timestamp, type });
    };

    taskListItem = (task) => {
        let description = task.description ? task.description : '...',
            _date = new Date(Math.floor(task.timestamp)),
            hours = getHour(_date),
            mins = getMins(_date),
            format = getFormat(_date),
            timeStr = `${hours} : ${mins} ${format.toUpperCase()}`,
            _key = keyGen(),
            isComplete = JSON.parse(task.isFinished) ? true : false;

        return (
            <div
                key={keyGen()}
                className={
                    isComplete
                        ? 'wrap__task-item task__completed'
                        : 'wrap__task-item'
                }
            >
                <div className="wrap__task-item-inner">
                    <div className="wrap__ti-status">
                        <input
                            type="checkbox"
                            name={_key}
                            id={_key}
                            defaultChecked={isComplete}
                            onClick={(e) => this.statusTaskHandler(e, task.id)}
                        />
                        <label htmlFor={_key}></label>
                    </div>
                    <div className="wrap__ti-desc">
                        <h1 className="ti-title">{description}</h1>
                        <p className="ti-deadline">{timeStr}</p>
                    </div>
                    <div className="wrap__ti-action">
                        {!isComplete && (
                            <a
                                className="btn__ti-edit"
                                onClick={() =>
                                    this.editTaskHandler(
                                        task.id,
                                        task.timestamp,
                                        description
                                    )
                                }
                            >
                                <EditIcon />
                            </a>
                        )}
                        <a
                            className="btn__ti-delete"
                            onClick={() => this.deleteTaskHandler(task.id)}
                        >
                            <DeleteIcon />
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    generateTaskUI = () => {
        let parsedData = this.context.AppData.taskState.taskWidget,
            ts = parsedData ? parsedData.ts : new Date().getTime(),
            tf = parsedData ? parsedData.tf : 'assign',
            tooltipContent = [];

        let assignedTasks = this.filterTasks(ts, 'assign'),
            finishedTasks = this.filterTasks(ts, 'complete'),
            allTasks = this.filterTasks(ts, 'all');

        switch (tf) {
            case 'assign':
                assignedTasks.map((task) => {
                    let tempTasks = this.taskListItem(task);
                    tooltipContent.push(
                        <React.Fragment key={keyGen()}>
                            {tempTasks}
                        </React.Fragment>
                    );
                });
                break;
            case 'complete':
                finishedTasks.map((task) => {
                    let tempTasks = this.taskListItem(task);
                    tooltipContent.push(
                        <React.Fragment key={keyGen()}>
                            {tempTasks}
                        </React.Fragment>
                    );
                });
                break;
            case 'all':
                allTasks.map((task) => {
                    let tempTasks = this.taskListItem(task);
                    tooltipContent.push(
                        <React.Fragment key={keyGen()}>
                            {tempTasks}
                        </React.Fragment>
                    );
                });
                break;

            default:
                break;
        }

        return tooltipContent;
    };

    closeListWidget = () => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'resetTaskWidget'
            });
    };

    tabsCategHandler = (categ) => {
        if (['tasks', 'notes'].indexOf(categ) !== -1) {
            typeof this.context.contextReducer == 'function' &&
                this.context.contextReducer({
                    type: 'updateTaskWidget',
                    makeVisible: categ
                });
        }
    };

    taskStatusHandler = (status) => {
        if (status) {
            let tempStatus = ['all', 'assign', 'complete'].filter(
                (__status) => {
                    return status.toLowerCase().includes(__status);
                }
            );
            typeof this.context.contextReducer == 'function' &&
                this.context.contextReducer({
                    type: 'updateTaskWidget',
                    tf: tempStatus[0] ? tempStatus[0] : 'assign'
                });
        }
    };

    editTaskHandler = (id, timestamp, description) => {
        timestamp = Math.floor(timestamp);
        let now = new Date(timestamp),
            min = getMins(now),
            hour = getHour(now),
            format = getFormat(now),
            date = now;
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer([
                {
                    type: 'createTaskUpdate',
                    triggerType: 'update',
                    timestamp,
                    description,
                    min,
                    hour,
                    format,
                    date,
                    id
                },
                {
                    type: 'resetTaskWidget'
                }
            ]);
    };

    datePickerHandler = (date) => {
        if (date) {
            let ts = new Date(date),
                tempDate = ts ? ts.getTime() : new Date().getTime();
            typeof this.context.contextReducer == 'function' &&
                this.context.contextReducer({
                    type: 'updateTaskWidget',
                    ts: tempDate
                });
        }
    };

    statusTaskHandler = (e, id) => {
        try {
            let token = this.context.AppData.curfToken,
                isFinished = !!e.currentTarget.checked ? true : false;
            if (token) {
                const config = {
                    body: {
                        task_id: id,
                        isFinished
                    },
                    headers: {
                        'XSRF-TOKEN': token
                    }
                };
                updateTask(config)
                    .then((res) => {
                        if (res.hasOwnProperty('success')) {
                            if (res.success == true) {
                                this.fetchAllTasks();
                            } else if (res.success == false && !!res.errors) {
                                console.log(res);
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    fetchAllTasks = () => {
        try {
            getTaskDetails()
                .then((res) => {
                    if (res.hasOwnProperty('success')) {
                        if (!!res.success) {
                            this.context.contextReducer({
                                type: 'updateTaskList',
                                tasks: res.tasks
                            });
                        } else if (!res.success && !!res.errors) {
                            console.log(res);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    deleteTaskHandler = (id) => {
        let token = this.context.AppData.curfToken;
        try {
            if (id && token) {
                const config = {
                    body: {
                        task_id: id
                    },
                    headers: {
                        'XSRF-TOKEN': token
                    }
                };
                deleteTask(config)
                    .then((res) => {
                        if (res.hasOwnProperty('success')) {
                            if (res.success == true) {
                                this.fetchAllTasks();
                            } else if (res.success == false && !!res.errors) {
                                console.log(res);
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        let { ts, tf, makeVisible } = this.context.AppData.taskState.taskWidget,
            tempVisible = !makeVisible ? 'tasks' : makeVisible;

        let taskListFor = tf ? tf : 'assign',
            tempTf = this.taskStatus.filter((status) => {
                return status.toLowerCase().includes(taskListFor.toLowerCase());
            }),
            tempStatusOption =
                tempTf && tempTf.length > 0 ? tempTf[0] : 'Assign';

        let tempNow = new Date(),
            now = tempNow.getTime(),
            tempDate = ts ? Math.floor(ts) : now;

        let tempTasks = this.filterTasks(tempDate, taskListFor);

        let taskList = this.generateTaskUI();
        return (
            <div
                className="calender-action-4 taskListUtil"
                style={{
                    display: makeVisible ? 'block' : 'none'
                }}
            >
                <div className="wrap__tasklist-util">
                    <div
                        onClick={() => this.closeListWidget()}
                        className="btn__tasklist-util-close"
                    >
                        <CloseBtnIcon />
                    </div>
                    <div className="wrap__tabs-categ">
                        <div
                            onClick={() => this.tabsCategHandler('tasks')}
                            className={
                                'wrap__tab-link ' +
                                (tempVisible === 'tasks' && 'tabActive')
                            }
                        >
                            Tasks
                        </div>
                        <div
                            onClick={() => this.tabsCategHandler('notes')}
                            className={
                                'wrap__tab-link ' +
                                (tempVisible === 'notes' && 'tabActive')
                            }
                        >
                            Notes
                        </div>
                    </div>
                    <div className="wrap__tabs-content">
                        <div
                            key={keyGen()}
                            className={
                                'section__task-details wrap__comn-detail ' +
                                (tempVisible == 'tasks' && 'tabActive')
                            }
                        >
                            <div className="wrap__tmp1">
                                <div className="wrap__task-status">
                                    <div className="wrap__select-task-status">
                                        <Select
                                            className="select__task-status"
                                            name="select__task-status"
                                            id="select__task-status"
                                            options={this.taskStatus}
                                            defaultOption={tempStatusOption}
                                            onChangeHandler={(e) =>
                                                this.taskStatusHandler(e)
                                            }
                                        />
                                    </div>
                                    <div className="wrap__task-date-picker">
                                        <span className="date__picker-ico inline-flx">
                                            <DatePickerIcon />
                                        </span>
                                        <DatePickerComp
                                            selected={tempDate}
                                            onChange={(date) =>
                                                this.datePickerHandler(date)
                                            }
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            customInput={<CustomDateInput />}
                                        />
                                        <span className="date__picker-arrow inline-flx">
                                            <DownArrow />
                                        </span>
                                    </div>
                                </div>
                                {tempTasks && tempTasks.length > 0 ? (
                                    <div className="wrap__task-list">
                                        {taskList}
                                    </div>
                                ) : (
                                    <div className="wrap__not-found">
                                        <div className="wrap__nf-icon">
                                            <TaskListIcon />
                                        </div>
                                        <h1 className="wrap__nf-desc">
                                            Not Found.
                                        </h1>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            key={keyGen()}
                            className={
                                'section__notes-details wrap__comn-detail ' +
                                (tempVisible == 'notes' && 'tabActive')
                            }
                        >
                            <div className="wrap__not-found">
                                <div className="wrap__nf-icon">
                                    <NotesIcon />
                                </div>
                                <h1 className="wrap__nf-desc">Not Found.</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskListUtil;
