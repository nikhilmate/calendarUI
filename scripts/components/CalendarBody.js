import React, { Component } from 'react';
import { PlusLogo, DeleteIcon, EditIcon, CloseBtnIcon } from '../utils/Icons';
import {
    getDaysInMonth,
    getTitleDate,
    getWeeksInMonth,
    isHoliday,
    getMins,
    getHour,
    getFormat,
    keyGen
} from '../utils/Util';
import AppContext from '../store/AppContext';

class CalendarBody extends Component {
    constructor(props) {
        super(props);
    }
    static contextType = AppContext;

    createTaskHandler = (e, timestamp) => {
        let now = new Date(timestamp),
            min = getMins(now),
            hour = getHour(now),
            format = getFormat(now),
            date = now;
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'createTaskUpdate',
                triggerType: 'create',
                timestamp,
                min,
                hour,
                format,
                date
            });
    };

    onHoverOfHoliday = (e, holidayName) => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'updateTooltipInfo',
                tooltipFor: 'holiday',
                utils: {
                    holiday: holidayName
                },
                $elForTT: e.currentTarget
            });
    };

    onHoverOfCreateTask = (e) => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'updateTooltipInfo',
                tooltipFor: 'create',
                $elForTT: e.currentTarget
            });
    };

    onHoverOutCommon = () => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'resetTooltipInfo'
            });
    };

    filterTasks = (timstamp, type) => {
        if (timstamp) {
            let tasks = this.context.AppData.taskManager.tasks.filter(
                (task) => {
                    let taskTS = task.timestamp
                        ? Math.floor(task.timestamp)
                        : null;
                    if (taskTS) {
                        let taskDate = new Date(taskTS),
                            derivedTS = new Date(
                                taskDate.getFullYear(),
                                taskDate.getMonth(),
                                taskDate.getDate()
                            ).getTime();
                        if (derivedTS == timstamp) return true;
                        else return false;
                    } else return false;
                }
            );
            switch (type) {
                case 'assign':
                    let assignTasks = tasks.filter((task) => {
                        if (!JSON.parse(task.isFinished)) {
                            return true;
                        } else return false;
                    });
                    return assignTasks;
                case 'complete':
                    let completeTasks = tasks.filter((task) => {
                        if (JSON.parse(task.isFinished)) {
                            return true;
                        } else return false;
                    });
                    return completeTasks;
                default:
                    return [];
            }
        }
        return [];
    };

    onHoverOfTasks = (e, type, taskArr) => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'updateTooltipInfo',
                tooltipFor: type,
                utils: {
                    tasks: taskArr
                },
                $elForTT: e.currentTarget
            });
    };

    renderCalenderUI = () => {
        let tempNow = new Date(),
            context_month = this.context.AppData.calendarState.currentView
                .month,
            context_year = this.context.AppData.calendarState.currentView.year,
            context_isLogged = this.context.AppData.isLogged,
            allRow = [],
            allCol = [],
            year = context_year !== null ? context_year : tempNow.getFullYear(),
            month = context_month !== null ? context_month : tempNow.getMonth(),
            date = 1,
            colIndex = 0,
            newMonth = 1,
            today = new Date(),
            prev_month = month == 0 ? 11 : month - 1,
            prev_year = prev_month == 11 ? year - 1 : year,
            prev_days = getDaysInMonth(prev_month, prev_year),
            cur_days = getDaysInMonth(month, year),
            firstDay = new Date(year, month).getDay(),
            weeksInMonth = getWeeksInMonth(year, month);
        for (let i = 0; i < weeksInMonth; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    // prev month days
                    let tempDate = prev_days - firstDay + colIndex + 1;
                    allCol.push(
                        <td
                            title={getTitleDate(
                                new Date(prev_year, prev_month, tempDate)
                            )}
                            key={keyGen()}
                            className="comn__cell static_cell"
                        >
                            <div className="info-wrap">
                                <span className="date__text">{tempDate}</span>
                            </div>
                        </td>
                    );
                } else if (date > cur_days) {
                    // next month days
                    allCol.push(
                        <td
                            title={getTitleDate(
                                new Date(year, month, date + newMonth - 1)
                            )}
                            key={keyGen()}
                            className="comn__cell static_cell"
                        >
                            <div className="info-wrap">
                                <span className="date__text">{newMonth}</span>
                            </div>
                        </td>
                    );
                    newMonth++;
                } else {
                    // current month days
                    let givenDate = new Date(year, month, date),
                        isHolidayCheck = isHoliday(month, date),
                        createVisible = false,
                        givenDateTimestamp = givenDate.getTime(),
                        createTaskTimestamp = new Date(
                            year,
                            month,
                            date,
                            today.getHours(),
                            today.getMinutes()
                        ).getTime(),
                        isCurrentDate;
                    if (
                        date === today.getDate() &&
                        year === today.getFullYear() &&
                        month === today.getMonth()
                    ) {
                        isCurrentDate = 'current-date';
                        if (context_isLogged) {
                            createVisible = true;
                        }
                    } else if (
                        givenDateTimestamp <
                        new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate()
                        ).getTime()
                    ) {
                        isCurrentDate = 'old-date';
                    } else {
                        isCurrentDate = '';
                        if (context_isLogged) {
                            createVisible = true;
                        }
                    }

                    // task utils
                    let assignedTasks = context_isLogged
                            ? this.filterTasks(givenDateTimestamp, 'assign')
                            : null,
                        finishedTasks = context_isLogged
                            ? this.filterTasks(givenDateTimestamp, 'complete')
                            : null,
                        isAssign =
                            assignedTasks && assignedTasks.length > 0
                                ? true
                                : false,
                        isComplete =
                            finishedTasks && finishedTasks.length > 0
                                ? true
                                : false;
                    allCol.push(
                        <td
                            title={getTitleDate(new Date(year, month, date))}
                            key={keyGen()}
                            className="comn__cell month_date"
                            data-future-day={isCurrentDate}
                        >
                            <div className="info-wrap">
                                {!!createVisible && (
                                    <span
                                        key={keyGen()}
                                        className="plus-ico create-task-ico inline-flx"
                                        onClick={(e) =>
                                            this.createTaskHandler(
                                                e,
                                                createTaskTimestamp
                                            )
                                        }
                                        onMouseEnter={(e) =>
                                            this.onHoverOfCreateTask(e)
                                        }
                                        onMouseLeave={this.onHoverOutCommon}
                                    >
                                        <PlusLogo />
                                    </span>
                                )}
                                <span className="date__text">{date}</span>
                            </div>
                            {(isHolidayCheck || isAssign || isComplete) && (
                                <div className="task__status-wrap">
                                    <>
                                        {isHolidayCheck && (
                                            <span
                                                key={keyGen()}
                                                className="view-status-btn"
                                                data-task-status="holiday"
                                                onMouseEnter={(e) =>
                                                    this.onHoverOfHoliday(
                                                        e,
                                                        isHolidayCheck
                                                    )
                                                }
                                                onMouseLeave={
                                                    this.onHoverOutCommon
                                                }
                                            />
                                        )}
                                        {isAssign && (
                                            <span
                                                className="view-status-btn"
                                                data-task-status="assign"
                                                onMouseEnter={(e) =>
                                                    this.onHoverOfTasks(
                                                        e,
                                                        'assign',
                                                        assignedTasks
                                                    )
                                                }
                                            ></span>
                                        )}
                                        {isComplete && (
                                            <span
                                                className="view-status-btn"
                                                data-task-status="completed"
                                                onMouseEnter={(e) =>
                                                    this.onHoverOfTasks(
                                                        e,
                                                        'complete',
                                                        completeTasks
                                                    )
                                                }
                                            ></span>
                                        )}
                                    </>
                                </div>
                            )}
                        </td>
                    );
                    date++;
                }
                colIndex++;
            }
            allRow.push(
                <tr key={keyGen()} className="tabel__row">
                    {allCol}
                </tr>
            );
            allCol = [];
        }
        return allRow;
    };

    renderTooltipBody = () => {
        let renderArr = [],
            tooltipData = this.context.AppData.calendarState.tooltip,
            tooltipFor = tooltipData.tooltipFor,
            holidayName =
                tooltipData.utils && tooltipData.utils.hasOwnProperty('holiday')
                    ? tooltipData.utils.holiday
                    : '';
        if (tooltipFor == 'holiday') {
            if (holidayName) {
                renderArr.push(
                    <div key="holiday" className="comn-tooltip tt__holiday">
                        <div className="task-tooltip-inner">
                            <p className="tt-text tt__holiday-text">
                                {holidayName}
                            </p>
                        </div>
                    </div>
                );
            }
        } else if (tooltipFor == 'create') {
            renderArr.push(
                <div key="create" className="comn-tooltip tt__create-task">
                    <div className="task-tooltip-inner">
                        <p className="tt-text tt__ct-text">Create a task</p>
                    </div>
                </div>
            );
        } else {
            let tasks =
                    tooltipData.utils &&
                    tooltipData.utils.hasOwnProperty('tasks') &&
                    tooltipData.utils.tasks.length > 0
                        ? tooltipData.utils.tasks
                        : [],
                taskItem = [];
            tasks.map((task) => {
                let description = task.description,
                    _date = new Date(Math.floor(task.timestamp)),
                    hours = getHour(_date),
                    mins = getMins(_date),
                    format = getFormat(_date),
                    timeStr = `${hours} : ${mins} ${format.toUpperCase()}`,
                    _key = keyGen();
                if (tooltipFor == 'assign') {
                    taskItem.push(
                        <div key={keyGen()} className="task__info">
                            <div className="task__info-inner">
                                <div className="task__status">
                                    <input
                                        type="checkbox"
                                        name={_key}
                                        id={_key}
                                    />
                                    <label htmlFor={_key}></label>
                                </div>
                                <div className="task__desc">
                                    <h1 className="task__title">
                                        {description}
                                    </h1>
                                    <p className="task__deadline">{timeStr}</p>
                                </div>
                                <div className="task__actions">
                                    <a className="task__edit edit-task">
                                        <EditIcon />
                                    </a>
                                    <a className="task__delete delete-task">
                                        <DeleteIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                } else if (tooltipFor == 'completed') {
                    taskItem.push(
                        <div
                            key={keyGen()}
                            className="task__info task__completed"
                        >
                            <div className="task__info-inner">
                                <div className="task__status">
                                    <input
                                        type="checkbox"
                                        name={_key}
                                        id={_key}
                                    />
                                    <label htmlFor={_key}></label>
                                </div>
                                <div className="task__desc">
                                    <h1 className="task__title">
                                        {description}
                                    </h1>
                                    <p className="task__deadline">{timeStr}</p>
                                </div>
                                <div className="task__actions">
                                    <a className="task__delete delete-task">
                                        <DeleteIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    renderArr.push(<></>);
                }
            });
            if (tasks && tasks.length > 0) {
                renderArr.push(
                    <div key={keyGen()} className="comn-tooltip tt__task-list">
                        <div className="task-tooltip-inner">
                            <div
                                onClick={() => this.onHoverOutCommon()}
                                className="closeTooltipBtn"
                            >
                                <CloseBtnIcon />
                            </div>
                            <div className="task-list-wrap">{taskItem}</div>
                        </div>
                    </div>
                );
            }
        }
        return renderArr;
    };

    render() {
        let allRow = this.renderCalenderUI();
        let tooltipBody = this.renderTooltipBody();

        return (
            <div
                className="app__action-three wrap__calendar-body"
                onMouseLeave={this.onHoverOutCommon}
            >
                <table className="calender-viewport">
                    <thead key={keyGen()} className="calender__header">
                        <tr key="days" className="tabel__row">
                            <th key="sun" className="weekday comn__cell">
                                Sun
                            </th>
                            <th key="mon" className="weekday comn__cell">
                                Mon
                            </th>
                            <th key="tue" className="weekday comn__cell">
                                Tue
                            </th>
                            <th key="wed" className="weekday comn__cell">
                                Wed
                            </th>
                            <th key="thu" className="weekday comn__cell">
                                Thu
                            </th>
                            <th key="fri" className="weekday comn__cell">
                                Fri
                            </th>
                            <th key="sat" className="weekday comn__cell">
                                Sat
                            </th>
                        </tr>
                    </thead>
                    <tbody key="calendarbody" className="calender__body">
                        {allRow}
                    </tbody>
                </table>
                <div key="overlays" className="calender-overlay">
                    {tooltipBody}
                </div>
            </div>
        );
    }
}

export default CalendarBody;

// {/* <span
//     className="view-status-btn"
//     data-task-status="completed"
// />
// <span
//     className="view-status-btn"
//     data-task-status="assign"
// /> */}

// return (
//     <>
//         <div className="comn-tooltip tt__create-task">
//             <div className="task-tooltip-inner">
//                 <p className="tt-text tt__ct-text">Create a task</p>
//             </div>
//         </div>
//         <div className="comn-tooltip tt__holiday">
//             <div className="task-tooltip-inner">
//                 <p className="tt-text tt__holiday-text">
//                     adadasdj adjas ja djasdj aawdadjaa adasd
//                 </p>
//             </div>
//         </div>
//     </>
// );
