import React, { Component } from 'react';
import Select from './Select';
import { monthArray, getMonthName, getYear, getYearArr } from '../utils/Util';

let monthArr = monthArray;
let yearArr = getYearArr();
let newDate = new Date();
let currentMonth = getMonthName(newDate, true);
let currentYear = getYear(newDate);

class CalendarAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
    }

    dateChangeHandler(value) {
        console.log('APP: ', value);
    }

    // componentDidMount() {
    //     fetch('/api/user/register', {
    //         method: 'POST', // POST, PUT, DELETE, etc.
    //         body: JSON.stringify({
    //             email: 'ui-test@abc.com',
    //             password: 'ui-test'
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             console.log(res);
    //         });
    // }

    render() {
        return (
            <React.Fragment>
                <div className="calender-action-1 set-calender-action just-betwn">
                    <div className="date-setter-wrap align-flx">
                        <div className="comn-date-setter">
                            <Select
                                className="date-selector-wrap month-select"
                                name="month-select"
                                id="month-select"
                                options={monthArr}
                                defaultOption={currentMonth}
                                onChangeHandler={this.dateChangeHandler}
                            />
                        </div>
                        <div className="comn-date-setter ml-10">
                            <Select
                                className="date-selector-wrap year-select"
                                name="year-select"
                                id="year-select"
                                options={yearArr}
                                defaultOption={currentYear}
                                onChangeHandler={this.dateChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="task-btn-wrap">
                        <button
                            id="create-task-btn"
                            className="create-task-btn"
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
