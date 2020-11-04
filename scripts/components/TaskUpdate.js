import React, { Component } from 'react';
import Select from './Select';
import { DatePickerIcon, DownArrow } from '../utils/Icons';
import {
    getMinArr,
    getHourArr,
    getMins,
    getHour,
    getFormat,
    createTaskValidation,
    dateIsValid,
    getFormatedHour
} from '../utils/Util';
import DatePickerComp from 'react-datepicker';
import CustomDateInput from './CustomDateInput';
import AppContext from '../store/AppContext';
import { createTask, getTaskDetails, updateTask } from '../utils/ApiActions';

class TaskUpdate extends Component {
    constructor(props) {
        super(props);
    }
    static contextType = AppContext;

    timeChangeHandler = (value, mode) => {
        switch (mode) {
            case 'hour':
                typeof this.context.contextReducer == 'function' &&
                    this.context.contextReducer({
                        type: 'createTaskUpdate',
                        hour: value
                    });
                break;
            case 'min':
                typeof this.context.contextReducer == 'function' &&
                    this.context.contextReducer({
                        type: 'createTaskUpdate',
                        min: value
                    });
                break;
            case 'format':
                typeof this.context.contextReducer == 'function' &&
                    this.context.contextReducer({
                        type: 'createTaskUpdate',
                        format: value
                    });
                break;
            default:
                break;
        }
    };

    datePickerChangeHandler = (date) => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'createTaskUpdate',
                date
            });
    };

    cancelCreateTaskHandler = () => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer([
                {
                    type: 'resetTaskUpdate'
                },
                {
                    type: 'resetTaskWidget'
                }
            ]);
    };

    descriptionChangeHandler = (e) => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'createTaskUpdate',
                description: e.target.value
            });
    };

    createTaskXHR = (config) => {
        let noFoundError = `Couldn't create task. Please try again.`;
        try {
            createTask(config)
                .then((res) => {
                    if (res.hasOwnProperty('success')) {
                        if (res.success == true) {
                            this.fetchAllTasks();
                            this.cancelCreateTaskHandler();
                        } else if (res.success == false && !!res.errors) {
                            this.setError(noFoundError);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setError(noFoundError);
                });
        } catch (error) {
            console.log(error);
            this.setError(noFoundError);
        }
    };

    updateTaskXHR = (config) => {
        let noFoundError = `Couldn't update the task. Please try again.`;
        try {
            updateTask(config)
                .then((res) => {
                    if (res.hasOwnProperty('success')) {
                        if (res.success == true) {
                            this.fetchAllTasks();
                            this.cancelCreateTaskHandler();
                        } else if (res.success == false && !!res.errors) {
                            this.setError(noFoundError);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setError(noFoundError);
                });
        } catch (error) {
            console.log(error);
            this.setError(noFoundError);
        }
    };

    fetchAllTasks = () => {
        let noFoundError = `Couldn't fetch tasks. Please try again.`;
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
                            this.setError(noFoundError);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setError(noFoundError);
                });
        } catch (error) {
            console.log(error);
            this.setError(noFoundError);
        }
    };

    taskUpdateHandler = () => {
        let {
            triggerType,
            description,
            date,
            hour,
            min,
            format,
            id
        } = this.context.AppData.taskState.createTaskDetails;
        let isValid = createTaskValidation(
            this.context.AppData.taskState.createTaskDetails
        );
        if (isValid === true) {
            let curTime = new Date();
            switch (triggerType) {
                case 'create':
                    let tempHour1 = getFormatedHour(parseInt(hour), format),
                        temp1 = new Date(date).setHours(
                            parseInt(tempHour1),
                            parseInt(min),
                            0
                        ),
                        targetTime1 = new Date(temp1),
                        isValidDate = dateIsValid(targetTime1, curTime);
                    if (isValidDate) {
                        this.createTaskXHR({
                            body: {
                                description,
                                timestamp: targetTime1.getTime(),
                                isFinished: false
                            },
                            headers: {
                                'XSRF-TOKEN': this.context.AppData.curfToken
                            }
                        });
                    } else {
                        this.setError('Please select date in future');
                    }
                    break;
                case 'update':
                    let tempHour2 = getFormatedHour(parseInt(hour), format),
                        temp2 = new Date(date).setHours(
                            parseInt(tempHour2),
                            parseInt(min),
                            0
                        ),
                        targetTime2 = new Date(temp2);
                    if (description && targetTime2 && id) {
                        this.updateTaskXHR({
                            body: {
                                task_id: id,
                                description,
                                timestamp: targetTime2.getTime(),
                                isFinished: false
                            },
                            headers: {
                                'XSRF-TOKEN': this.context.AppData.curfToken
                            }
                        });
                    } else this.setError('Please enter the valid details');
                default:
                    break;
            }
        } else if (typeof isValid == 'string' && isValid != '') {
            this.setError(isValid);
        }
    };

    setError = (error) => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'createTaskUpdate',
                error
            });

        setTimeout(() => {
            typeof this.context.contextReducer == 'function' &&
                this.context.contextReducer({
                    type: 'createTaskUpdate',
                    error: null
                });
        }, 4000);
    };

    render() {
        let tempNow = new Date();
        let {
                timestamp,
                triggerType,
                description,
                date,
                hour,
                min,
                format,
                error
            } = this.context.AppData.taskState.createTaskDetails,
            now = !!timestamp ? Math.floor(timestamp) : tempNow.getTime(),
            nowDate = new Date(now),
            newState = {
                currentMin: getMins(nowDate),
                currentHour: getHour(nowDate),
                currentFormat: getFormat(nowDate)
            };
        let formatArr = ['AM', 'PM'],
            mins = getMinArr(),
            hours = getHourArr(),
            currentMin = min ? min : newState.currentMin,
            currentHour = hour ? hour : newState.currentHour,
            currentFormat = format ? format : newState.currentFormat,
            activeOverlay = !!timestamp && 'active__overlay';
        return (
            <div
                className={
                    'calender-action-4 create-task-overlay ' + activeOverlay
                }
            >
                <div className="create-task-widget">
                    <div className="ct-widget-inner">
                        <div className="form__row full-row">
                            <label htmlFor="input__create-task">
                                Create a task
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                className="ct-widget-input mt-10"
                                id="input__create-task"
                                name="input__create-task"
                                placeholder="Enter Task Description…"
                                onChange={this.descriptionChangeHandler}
                                value={!!description ? description : ''}
                            />
                        </div>
                        <div className="form__row mt-20 form-flx">
                            <div className="form__col wid-50">
                                <label htmlFor="date__picker-wrap">Date</label>
                                <div
                                    id="date__picker-ct"
                                    name="date__picker-wrap"
                                    className="date__picker-wrap mt-10"
                                >
                                    <span className="date__picker-ico inline-flx">
                                        <DatePickerIcon />
                                    </span>
                                    <DatePickerComp
                                        selected={date ? date : now}
                                        onChange={(date) =>
                                            this.datePickerChangeHandler(date)
                                        }
                                        minDate={tempNow}
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
                            <div className="form__col wid-50">
                                <label htmlFor="time__picker-hr">Time</label>
                                <div className="time__picker-wrap form-flx mt-10">
                                    <div className="time__picker-num">
                                        <Select
                                            className="time__picker-select"
                                            name="time__picker-hour"
                                            id="time__picker-hr"
                                            options={hours}
                                            defaultOption={currentHour}
                                            onChangeHandler={(e) =>
                                                this.timeChangeHandler(
                                                    e,
                                                    'hour'
                                                )
                                            }
                                        />
                                        <span className="colon-space"> : </span>
                                        <Select
                                            className="time__picker-select"
                                            name="time__picker-min"
                                            id="time__picker-min"
                                            options={mins}
                                            defaultOption={currentMin}
                                            onChangeHandler={(e) =>
                                                this.timeChangeHandler(e, 'min')
                                            }
                                        />
                                    </div>
                                    <div className="time__picker-format ml-10">
                                        <Select
                                            className="time-meridian"
                                            id="time__format-picker"
                                            name="time__format"
                                            options={formatArr}
                                            defaultOption={currentFormat}
                                            onChangeHandler={(e) =>
                                                this.timeChangeHandler(
                                                    e,
                                                    'format'
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form__row mt-20 full-row form-flx">
                            <div className="form__col wid-50">
                                <button
                                    className="comn__form-btn btn__cancel-form"
                                    id="btn__cancel-form"
                                    onClick={this.cancelCreateTaskHandler}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="form__col wid-50">
                                <button
                                    className="comn__form-btn btn__create-form"
                                    id="btn__create-form"
                                    onClick={this.taskUpdateHandler}
                                >
                                    {triggerType == 'create'
                                        ? 'Create'
                                        : 'Update'}
                                </button>
                            </div>
                        </div>
                        <p className="form__error-para" id="form__error-para">
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskUpdate;
