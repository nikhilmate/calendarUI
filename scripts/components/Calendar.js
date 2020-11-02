import React from 'react';

import CalendarAction from './CalendarAction';
import CalendarLoad from './CalendarLoad';
import CalendarBody from './CalendarBody';
import TaskUpdate from './TaskUpdate';
import TaskListUtil from './TaskListUtil';

const Calendar = (props) => (
    <section className="wrap__main-body">
        <div className="calendar__app comn-content-box">
            <div className="calendar__app-inner pos-reltv">
                <CalendarAction />
                <CalendarLoad />
                <CalendarBody />
                <TaskUpdate />
                <TaskListUtil />
            </div>
        </div>
    </section>
);

export default Calendar;
