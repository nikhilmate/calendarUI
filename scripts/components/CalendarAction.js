import React, { Component } from 'react';
import Select from './Select';
import {
    monthArray,
    getMonthName,
    getMins,
    getHour,
    getFormat,
    getYear,
    getYearArr,
    getMonthIndex
} from '../utils/Util';
import AppContext from '../store/AppContext';

class CalendarAction extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = AppContext;

    monthChangeHandler = (monthIndex) => {
        let month = getMonthIndex(monthIndex);
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'changeCalendarView',
                month
            });
    };

    yearChangeHandler = (_year) => {
        let year = parseInt(_year);
        this.context.contextReducer({
            type: 'changeCalendarView',
            year
        });
    };

    componentDidMount() {
        let newDate = new Date();
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'changeCalendarView',
                month: newDate.getMonth(),
                year: newDate.getFullYear()
            });
    }

    createTaskHandler = () => {
        let now = new Date(),
            min = getMins(now),
            hour = getHour(now),
            format = getFormat(now);
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'createTaskUpdate',
                triggerType: 'create',
                timestamp: now.getTime(),
                min,
                hour,
                format,
                date: now
            });
    };

    createNoteHandler = () => {
        let now = new Date(),
            timestamp = now.getTime();
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer([
                {
                    type: 'updateTaskWidget',
                    ts: timestamp,
                    makeVisible: 'notes'
                },
                {
                    type: 'updateNoteState',
                    triggerType: 'create',
                    timestamp
                }
            ]);
    };

    render() {
        let tempNow = new Date(),
            context_month = this.context.AppData.calendarState.currentView
                .month,
            context_year = this.context.AppData.calendarState.currentView.year;
        let currMonth =
                context_month != null
                    ? getMonthName(context_month)
                    : getMonthName(tempNow.getMonth()),
            currYear = context_year !== null ? context_year : getYear(tempNow);
        return (
            <React.Fragment>
                <div className="app__action-one just-betwn">
                    <div className="wrap__date-setter inline-flx align--center">
                        <div className="comn__date-setter">
                            <Select
                                className="blk__date-selector month-select"
                                name="month-select"
                                id="month-select"
                                options={monthArray}
                                defaultOption={currMonth}
                                onChangeHandler={this.monthChangeHandler}
                            />
                        </div>
                        <div className="comn__date-setter ml-10">
                            <Select
                                className="blk__date-selector year-select"
                                name="year-select"
                                id="year-select"
                                options={getYearArr()}
                                defaultOption={currYear}
                                onChangeHandler={this.yearChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="wrap__task-btn">
                        <button
                            id="create-note--btn"
                            className="create-task--btn create-note--btn comn__btn"
                            onClick={this.createNoteHandler}
                        >
                            Create a note
                        </button>
                        <button
                            id="create-task--btn"
                            className="create-task--btn comn__btn"
                            onClick={this.createTaskHandler}
                        >
                            Create a task
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CalendarAction;
