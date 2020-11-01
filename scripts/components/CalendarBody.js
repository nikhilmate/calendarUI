import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { PlusLogo } from '../utils/Icons';
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
import { FilterTasks } from '../utils/Filter';

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

    filterTasks = (timestamp, type) => {
        let tasks = this.context.AppData.taskManager.tasks;
        return FilterTasks({ tasks, timestamp, type });
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
                                        data-for="tooltip"
                                        data-tip="Create a task"
                                        key={keyGen()}
                                        className="plus-ico create-task-ico inline-flx"
                                        onClick={(e) =>
                                            this.createTaskHandler(
                                                e,
                                                createTaskTimestamp
                                            )
                                        }
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
                                                data-for="tooltip"
                                                data-tip={isHolidayCheck}
                                                key={keyGen()}
                                                className="view-status-btn"
                                                data-task-status="holiday"
                                            />
                                        )}
                                        {isAssign && (
                                            <span
                                                data-for="tooltip"
                                                data-tip="View assigned tasks"
                                                onClick={() =>
                                                    this.taskUtilsHandler(
                                                        givenDateTimestamp,
                                                        'assign'
                                                    )
                                                }
                                                className="view-status-btn"
                                                data-task-status="assign"
                                            ></span>
                                        )}
                                        {isComplete && (
                                            <span
                                                data-for="tooltip"
                                                data-tip="View completed tasks"
                                                onClick={() =>
                                                    this.taskUtilsHandler(
                                                        givenDateTimestamp,
                                                        'complete'
                                                    )
                                                }
                                                className="view-status-btn"
                                                data-task-status="completed"
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
    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    taskUtilsHandler = (timestamp, tooltipFor) => {
        if (timestamp && tooltipFor) {
            typeof this.context.contextReducer == 'function' &&
                this.context.contextReducer({
                    type: 'updateTaskWidget',
                    ts: timestamp,
                    tf: tooltipFor,
                    makeVisible: 'tasks'
                });
        }
    };

    render() {
        let allRow = this.renderCalenderUI();

        return (
            <div className="app__action-three wrap__calendar-body">
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
                <ReactTooltip
                    key={keyGen()}
                    place="top"
                    id="tooltip"
                    type="dark"
                    effect="solid"
                />
            </div>
        );
    }
}

export default CalendarBody;
