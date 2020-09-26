import React, { Component } from 'react';
import Select from './Select';
import { DatePickerIcon, DownArrow } from '../utils/Icons';
import {
    getMinArr,
    getHourArr,
    getMins,
    getHour,
    getFormat
} from '../utils/Util';

import AppContext from '../store/AppContext';

class TaskUpdate extends Component {
    constructor(props) {
        super(props);
    }
    static contextType = AppContext;

    timeChangeHandler = (e, mode) => {
        switch (mode) {
            case 'hour':
                break;
            case 'min':
                break;
            case 'format':
                break;

            default:
                break;
        }
    };

    // typeof this.context.contextReducer == 'function' &&
    // this.context.contextReducer({
    //     type: 'signOut'
    // });

    render() {
        let { timestamp } = this.context.AppData.taskState.createTaskDetails,
            now = !!timestamp ? new Date(timestamp) : new Date(),
            newState = {
                currentMin: getMins(now),
                currentHour: getHour(now),
                currentFormat: getFormat(now)
            };
        let formatArr = ['AM', 'PM'],
            mins = getMinArr(),
            hours = getHourArr(),
            currentMin = newState.currentMin,
            currentHour = newState.currentHour,
            currentFormat = newState.currentFormat,
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
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        placeholder="mm/dd/yyyy"
                                        name="dateinput"
                                        className="date__picker-input"
                                        id="date__picker-input"
                                        required
                                        // readOnly="true"
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
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="form__col wid-50">
                                <button
                                    className="comn__form-btn btn__create-form"
                                    id="btn__create-form"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                        <p className="form__error-para" id="form__error-para" />
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskUpdate;
