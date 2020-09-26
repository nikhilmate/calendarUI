import React, { Component } from 'react';
import { LeftArrow, ReloadIcon, RightArrow } from '../utils/Icons';
import AppContext from '../store/AppContext';

class CalendarLoad extends Component {
    constructor(props) {
        super(props);
    }
    static contextType = AppContext;

    prevCalendarHandler = () => {
        let context_month = this.context.AppData.calendarState.currentView
                .month,
            context_year = this.context.AppData.calendarState.currentView.year,
            month = context_month == 0 ? 11 : context_month - 1,
            year = context_month == 0 ? context_year - 1 : context_year;
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'changeCalendarView',
                month,
                year
            });
    };

    nextCalendarHandler = () => {
        let context_month = this.context.AppData.calendarState.currentView
                .month,
            context_year = this.context.AppData.calendarState.currentView.year,
            month = context_month == 11 ? 0 : context_month + 1,
            year = context_month == 11 ? context_year + 1 : context_year;
        this.context.contextReducer({
            type: 'changeCalendarView',
            month,
            year
        });
    };

    reloadCalendarHandler = () => {
        let tempNow = new Date(),
            month = tempNow.getMonth(),
            year = tempNow.getFullYear();
        this.context.contextReducer({
            type: 'changeCalendarView',
            month,
            year
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="app__action-two just-betwn calender-info">
                    <div className="wrap__task-labels inline-flx">
                        <div className="blk__task-label align-flx">
                            <span className="blk__label-ico inline-flx">
                                <svg
                                    className="dl-blk"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 18 18"
                                >
                                    <g fill="#D22525" fillRule="evenodd">
                                        <path
                                            fillRule="nonzero"
                                            d="M15.75 2.25H15V.75c0-.414-.336-.75-.75-.75h-.75c-.414 0-.75.336-.75.75v1.5h-7.5V.75C5.25.336 4.914 0 4.5 0h-.75C3.336 0 3 .336 3 .75v1.5h-.75C1.01 2.25 0 3.26 0 4.5v11.25C0 16.99 1.01 18 2.25 18h13.5c1.24 0 2.25-1.01 2.25-2.25V4.5c0-1.24-1.01-2.25-2.25-2.25zm0 14.25H2.25c-.414 0-.75-.336-.75-.75V6.78h15v8.97c0 .414-.336.75-.75.75z"
                                        />
                                        <path d="M5.4 9.45H12.600000000000001V13.95H5.4z" />
                                    </g>
                                </svg>
                            </span>
                            <span className="blk__label-text ml-10">
                                Created Task
                            </span>
                        </div>
                        <div className="blk__task-label align-flx">
                            <span className="blk__label-ico inline-flx">
                                <svg
                                    className="dl-blk"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                >
                                    <g fill="#7F7F7F" fillRule="evenodd">
                                        <path
                                            fillRule="nonzero"
                                            d="M14 2h-.667V.667c0-.368-.298-.667-.666-.667H12c-.368 0-.667.299-.667.667V2H4.667V.667C4.667.299 4.368 0 4 0h-.667c-.368 0-.666.299-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 12.667H2c-.368 0-.667-.299-.667-.667V6.027h13.334V14c0 .368-.299.667-.667.667z"
                                        />
                                        <path d="M4.8 8.4H11.2V12.4H4.8z" />
                                    </g>
                                </svg>
                            </span>
                            <span className="blk__label-text ml-10">
                                Completed Task
                            </span>
                        </div>
                        <div className="blk__task-label align-flx">
                            <span className="blk__label-ico inline-flx">
                                <svg
                                    className="dl-blk"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                >
                                    <g fill="#0953AE" fillRule="evenodd">
                                        <path
                                            fillRule="nonzero"
                                            d="M14 2h-.667V.667c0-.368-.298-.667-.666-.667H12c-.368 0-.667.299-.667.667V2H4.667V.667C4.667.299 4.368 0 4 0h-.667c-.368 0-.666.299-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 12.667H2c-.368 0-.667-.299-.667-.667V6.027h13.334V14c0 .368-.299.667-.667.667z"
                                        />
                                        <path d="M4.8 8.4H11.2V12.4H4.8z" />
                                    </g>
                                </svg>
                            </span>
                            <span className="blk__label-text ml-10">
                                US Public Holidays
                            </span>
                        </div>
                    </div>
                    <div className="wrap__calendar-change">
                        <a
                            className="btn__comn-cal-change inline-flx left-arrow"
                            title="Previous"
                            onClick={this.prevCalendarHandler}
                        >
                            <LeftArrow />
                        </a>
                        <a
                            id="btn__cal-reload"
                            className="btn__cal-reload inline-flx"
                            title="Reload"
                            onClick={this.reloadCalendarHandler}
                        >
                            <ReloadIcon />
                        </a>
                        <a
                            className="btn__comn-cal-change right-arrow inline-flx"
                            title="Next"
                            onClick={this.nextCalendarHandler}
                        >
                            <RightArrow />
                        </a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CalendarLoad;
