import React, { Component } from 'react';
import { PlusLogo } from '../utils/Icons';
import {
    getDaysInMonth,
    getTitleDate,
    getWeeksInMonth,
    isHoliday,
    getMins,
    getHour,
    getFormat
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
                            key={'td' + colIndex}
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
                            key={'td' + colIndex}
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
                    allCol.push(
                        <td
                            title={getTitleDate(new Date(year, month, date))}
                            key={'td' + colIndex}
                            className="comn__cell month_date"
                            data-future-day={isCurrentDate}
                        >
                            <div className="info-wrap">
                                {!!createVisible && (
                                    <span
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
                            {isHolidayCheck && (
                                <div className="task__status-wrap">
                                    <>
                                        {isHolidayCheck && (
                                            <span
                                                className="view-status-btn"
                                                data-task-status="holiday"
                                                data-holiday-name={
                                                    isHolidayCheck
                                                }
                                            />
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
                <tr key={'tr' + colIndex} className="tabel__row">
                    {allCol}
                </tr>
            );
            allCol = [];
        }
        return allRow;
    };

    render() {
        let allRow = this.renderCalenderUI();

        return (
            <div className="app__action-three wrap__calendar-body">
                <table className="calender-viewport">
                    <thead className="calender__header">
                        <tr className="tabel__row">
                            <th className="weekday comn__cell">Sun</th>
                            <th className="weekday comn__cell">Mon</th>
                            <th className="weekday comn__cell">Tue</th>
                            <th className="weekday comn__cell">Wed</th>
                            <th className="weekday comn__cell">Thu</th>
                            <th className="weekday comn__cell">Fri</th>
                            <th className="weekday comn__cell">Sat</th>
                        </tr>
                    </thead>
                    <tbody className="calender__body">{allRow}</tbody>
                </table>
                <div className="calender-overlay">
                    <div className="comn-tooltip tt__create-task">
                        <div className="task-tooltip-inner">
                            <p className="tt-text tt__ct-text">Create a task</p>
                        </div>
                    </div>
                    <div className="comn-tooltip tt__holiday">
                        <div className="task-tooltip-inner">
                            <p className="tt-text tt__holiday-text">
                                adadasdj adjas ja djasdj aawdadjaa adasd
                            </p>
                        </div>
                    </div>
                    <div className="comn-tooltip tt__task-list">
                        <div className="task-tooltip-inner">
                            <div className="task-list-wrap">
                                <div className="task__info">
                                    <div className="task__info-inner">
                                        <div className="task__status">
                                            <input
                                                type="checkbox"
                                                name="task__checkbox"
                                                id="task__checkbox1"
                                            />
                                            <label htmlFor="task__checkbox1" />
                                        </div>
                                        <div className="task__desc">
                                            <h1 className="task__title">
                                                Task title 1
                                            </h1>
                                            <p className="task__deadline">
                                                02 : 20 PM
                                            </p>
                                        </div>
                                        <div className="task__actions">
                                            <a className="task__edit edit-task">
                                                <svg
                                                    className="dl-blk"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={18}
                                                    height={18}
                                                    viewBox="0 0 18 18"
                                                >
                                                    <defs>
                                                        <filter id="z1yte48lya">
                                                            <feColorMatrix
                                                                in="SourceGraphic"
                                                                values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
                                                            />
                                                        </filter>
                                                    </defs>
                                                    <g
                                                        fill="none"
                                                        fillRule="evenodd"
                                                        filter="url(#z1yte48lya)"
                                                        transform="translate(-270)"
                                                    >
                                                        <g>
                                                            <path
                                                                fill="#FFF"
                                                                fillRule="nonzero"
                                                                d="M0 14.248L0 17.998 3.75 17.998 14.815 6.932 11.065 3.182zM17.705 2.627L15.37.293c-.39-.39-1.025-.39-1.415 0l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.026 0-1.416z"
                                                                transform="translate(270)"
                                                            />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <a className="task__delete delete-task">
                                                <svg
                                                    className="dl-blk"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={14}
                                                    height={18}
                                                    viewBox="0 0 14 18"
                                                >
                                                    <defs>
                                                        <filter id="xqov8ytv0a">
                                                            <feColorMatrix
                                                                in="SourceGraphic"
                                                                values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
                                                            />
                                                        </filter>
                                                    </defs>
                                                    <g
                                                        fill="none"
                                                        fillRule="evenodd"
                                                        filter="url(#xqov8ytv0a)"
                                                        transform="translate(-309)"
                                                    >
                                                        <g>
                                                            <path
                                                                fill="#FFF"
                                                                fillRule="nonzero"
                                                                d="M5.497 1.087h3.009v.506h1.086v-.577C9.592.456 9.137 0 8.577 0H5.426c-.56 0-1.015.456-1.015 1.016v.577h1.086v-.506zM12.101 5.897H1.902c-.28 0-.5.239-.477.518l.853 10.543c.047.589.538 1.042 1.128 1.042h7.191c.59 0 1.08-.453 1.128-1.042l.853-10.543c.023-.28-.197-.518-.477-.518zm-7.73 10.978l-.033.002c-.285 0-.524-.222-.542-.51L3.262 7.71c-.019-.3.209-.557.508-.576.299-.018.558.21.576.509L4.88 16.3c.019.3-.209.557-.508.575zm3.18-.542c0 .3-.243.543-.543.543-.3 0-.544-.243-.544-.543V7.677c0-.3.244-.543.544-.543.3 0 .543.243.543.543v8.656zm3.19-8.624l-.51 8.656c-.016.289-.256.511-.541.511h-.033c-.3-.018-.528-.275-.51-.575l.51-8.656c.018-.3.274-.528.574-.51.3.018.528.275.51.574zM13.98 4.22l-.357-1.069c-.094-.282-.358-.472-.655-.472H1.035c-.297 0-.56.19-.655.472l-.357 1.07c-.068.206.021.417.188.522.068.042.149.068.238.068h13.106c.088 0 .169-.026.237-.069.167-.105.257-.315.188-.521z"
                                                                transform="translate(309)"
                                                            />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="task__info task__completed">
                                    <div className="task__info-inner">
                                        <div className="task__status">
                                            <input
                                                type="checkbox"
                                                name="task__checkbox"
                                                id="task__checkbox2"
                                                defaultChecked
                                            />
                                            <label htmlFor="task__checkbox2" />
                                        </div>
                                        <div className="task__desc">
                                            <h1 className="task__title">
                                                Task title 1
                                            </h1>
                                            <p className="task__deadline">
                                                02 : 20 PM
                                            </p>
                                        </div>
                                        <div className="task__actions">
                                            <a className="task__edit edit-task">
                                                <svg
                                                    className="dl-blk"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={18}
                                                    height={18}
                                                    viewBox="0 0 18 18"
                                                >
                                                    <defs>
                                                        <filter id="z1yte48lya">
                                                            <feColorMatrix
                                                                in="SourceGraphic"
                                                                values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
                                                            />
                                                        </filter>
                                                    </defs>
                                                    <g
                                                        fill="none"
                                                        fillRule="evenodd"
                                                        filter="url(#z1yte48lya)"
                                                        transform="translate(-270)"
                                                    >
                                                        <g>
                                                            <path
                                                                fill="#FFF"
                                                                fillRule="nonzero"
                                                                d="M0 14.248L0 17.998 3.75 17.998 14.815 6.932 11.065 3.182zM17.705 2.627L15.37.293c-.39-.39-1.025-.39-1.415 0l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.026 0-1.416z"
                                                                transform="translate(270)"
                                                            />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <a className="task__delete delete-task">
                                                <svg
                                                    className="dl-blk"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={14}
                                                    height={18}
                                                    viewBox="0 0 14 18"
                                                >
                                                    <defs>
                                                        <filter id="xqov8ytv0a">
                                                            <feColorMatrix
                                                                in="SourceGraphic"
                                                                values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
                                                            />
                                                        </filter>
                                                    </defs>
                                                    <g
                                                        fill="none"
                                                        fillRule="evenodd"
                                                        filter="url(#xqov8ytv0a)"
                                                        transform="translate(-309)"
                                                    >
                                                        <g>
                                                            <path
                                                                fill="#FFF"
                                                                fillRule="nonzero"
                                                                d="M5.497 1.087h3.009v.506h1.086v-.577C9.592.456 9.137 0 8.577 0H5.426c-.56 0-1.015.456-1.015 1.016v.577h1.086v-.506zM12.101 5.897H1.902c-.28 0-.5.239-.477.518l.853 10.543c.047.589.538 1.042 1.128 1.042h7.191c.59 0 1.08-.453 1.128-1.042l.853-10.543c.023-.28-.197-.518-.477-.518zm-7.73 10.978l-.033.002c-.285 0-.524-.222-.542-.51L3.262 7.71c-.019-.3.209-.557.508-.576.299-.018.558.21.576.509L4.88 16.3c.019.3-.209.557-.508.575zm3.18-.542c0 .3-.243.543-.543.543-.3 0-.544-.243-.544-.543V7.677c0-.3.244-.543.544-.543.3 0 .543.243.543.543v8.656zm3.19-8.624l-.51 8.656c-.016.289-.256.511-.541.511h-.033c-.3-.018-.528-.275-.51-.575l.51-8.656c.018-.3.274-.528.574-.51.3.018.528.275.51.574zM13.98 4.22l-.357-1.069c-.094-.282-.358-.472-.655-.472H1.035c-.297 0-.56.19-.655.472l-.357 1.07c-.068.206.021.417.188.522.068.042.149.068.238.068h13.106c.088 0 .169-.026.237-.069.167-.105.257-.315.188-.521z"
                                                                transform="translate(309)"
                                                            />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="task__info">
                                    <div className="task__info-inner">
                                        <div className="task__status">
                                            <input
                                                type="checkbox"
                                                name="task__checkbox"
                                                id="task__checkbox3"
                                            />
                                            <label htmlFor="task__checkbox3" />
                                        </div>
                                        <div className="task__desc">
                                            <h1 className="task__title">
                                                Task title 1
                                            </h1>
                                            <p className="task__deadline">
                                                02 : 20 PM
                                            </p>
                                        </div>
                                        <div className="task__actions">
                                            <a className="task__edit edit-task">
                                                <svg
                                                    className="dl-blk"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={18}
                                                    height={18}
                                                    viewBox="0 0 18 18"
                                                >
                                                    <defs>
                                                        <filter id="z1yte48lya">
                                                            <feColorMatrix
                                                                in="SourceGraphic"
                                                                values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
                                                            />
                                                        </filter>
                                                    </defs>
                                                    <g
                                                        fill="none"
                                                        fillRule="evenodd"
                                                        filter="url(#z1yte48lya)"
                                                        transform="translate(-270)"
                                                    >
                                                        <g>
                                                            <path
                                                                fill="#FFF"
                                                                fillRule="nonzero"
                                                                d="M0 14.248L0 17.998 3.75 17.998 14.815 6.932 11.065 3.182zM17.705 2.627L15.37.293c-.39-.39-1.025-.39-1.415 0l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.026 0-1.416z"
                                                                transform="translate(270)"
                                                            />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <a className="task__delete delete-task">
                                                <svg
                                                    className="dl-blk"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={14}
                                                    height={18}
                                                    viewBox="0 0 14 18"
                                                >
                                                    <defs>
                                                        <filter id="xqov8ytv0a">
                                                            <feColorMatrix
                                                                in="SourceGraphic"
                                                                values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
                                                            />
                                                        </filter>
                                                    </defs>
                                                    <g
                                                        fill="none"
                                                        fillRule="evenodd"
                                                        filter="url(#xqov8ytv0a)"
                                                        transform="translate(-309)"
                                                    >
                                                        <g>
                                                            <path
                                                                fill="#FFF"
                                                                fillRule="nonzero"
                                                                d="M5.497 1.087h3.009v.506h1.086v-.577C9.592.456 9.137 0 8.577 0H5.426c-.56 0-1.015.456-1.015 1.016v.577h1.086v-.506zM12.101 5.897H1.902c-.28 0-.5.239-.477.518l.853 10.543c.047.589.538 1.042 1.128 1.042h7.191c.59 0 1.08-.453 1.128-1.042l.853-10.543c.023-.28-.197-.518-.477-.518zm-7.73 10.978l-.033.002c-.285 0-.524-.222-.542-.51L3.262 7.71c-.019-.3.209-.557.508-.576.299-.018.558.21.576.509L4.88 16.3c.019.3-.209.557-.508.575zm3.18-.542c0 .3-.243.543-.543.543-.3 0-.544-.243-.544-.543V7.677c0-.3.244-.543.544-.543.3 0 .543.243.543.543v8.656zm3.19-8.624l-.51 8.656c-.016.289-.256.511-.541.511h-.033c-.3-.018-.528-.275-.51-.575l.51-8.656c.018-.3.274-.528.574-.51.3.018.528.275.51.574zM13.98 4.22l-.357-1.069c-.094-.282-.358-.472-.655-.472H1.035c-.297 0-.56.19-.655.472l-.357 1.07c-.068.206.021.417.188.522.068.042.149.068.238.068h13.106c.088 0 .169-.026.237-.069.167-.105.257-.315.188-.521z"
                                                                transform="translate(309)"
                                                            />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalendarBody;
