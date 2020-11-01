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
                            // onClick={() =>
                            //     this.statusTaskHandler(task.id)
                            // }
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
                                // onClick={() =>
                                //     this.editTaskHandler(
                                //         task.id,
                                //         task.timestamp
                                //     )
                                // }
                            >
                                <EditIcon />
                            </a>
                        )}
                        <a
                            className="btn__ti-delete"
                            // onClick={() =>
                            //     this.deleteTaskHandler(
                            //         task.id,
                            //         task.timestamp
                            //     )
                            // }
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
            case 'finished':
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
                style={{ display: makeVisible ? 'block' : 'none' }}
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
                            className={
                                'wrap__tab-link ' +
                                (tempVisible === 'tasks' && 'tabActive')
                            }
                        >
                            Tasks
                        </div>
                        <div
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
                            {tempTasks && tempTasks.length > 0 ? (
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
                                                    console.log(e)
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
                                                    console.log(date)
                                                }
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                customInput={
                                                    <CustomDateInput />
                                                }
                                            />
                                            <span className="date__picker-arrow inline-flx">
                                                <DownArrow />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="wrap__task-list">
                                        {taskList}
                                    </div>
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
