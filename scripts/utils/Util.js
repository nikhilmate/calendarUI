// self dependant module
// do not move any function from this module

export const monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
export const getMonthName = (monthIndex) => {
    let monthName = monthArray[monthIndex];
    return monthName;
};

export const getMonthIndex = (monthName) => {
    for (let i = 0; i < monthArray.length; i++) {
        if (
            monthName.toString().toLowerCase() ==
            monthArray[i].toString().toLowerCase()
        ) {
            return i;
        }
    }
    return null;
};

export const getYearArr = () => {
    let arr = [];
    for (let i = 1950; i <= 2050; i++) {
        arr.push(i);
    }
    return arr;
};

export const getYear = (date) => {
    return date.getFullYear();
};

export const setNewExp = () => {
    return new Date().getTime() + 86400000;
};

export const getCookie = (name) => {
    let matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const isHoliday = (month, date) => {
    const holidays = {
        // keys are formatted as month,day
        '1_1': "New Year's Day",
        '1_20': 'Martin Luther King Jr. Day',
        '5_25': 'Memorial Day',
        '7_3': 'Independence Day',
        '9_7': 'Labor Day',
        '11_11': 'Veterans Day',
        '11_26': 'Thanksgiving',
        '12_24': 'Feast of the Seven Fishes',
        '12_25': 'Christmas Day'
    };

    return holidays[month + 1 + '_' + date];
};

export const getWeeksInMonth = (year, month) => {
    let weeks = 0,
        firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();

    let start = 1;
    let end = 7 - firstDate.getDay();
    while (start <= numDays) {
        weeks += 1;
        start = end + 1;
        end = end + 7;
        if (end > numDays) end = numDays;
    }
    return weeks;
};
export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
};

export const getHourArr = () => {
    let hours = [];
    for (let i = 1; i <= 12; i++) {
        hours.push(i > 9 ? i : '0' + i);
    }
    return hours;
};

export const getMinArr = () => {
    let mins = [];
    for (let i = 0; i <= 59; i++) {
        mins.push(i > 9 ? i : '0' + i);
    }
    return mins;
};

export const getHour = (_dateInstance) => {
    let hours = _dateInstance.getHours();
    hours = hours % 12;
    return hours > 9 ? hours : hours == 0 ? 12 : '0' + hours;
};

export const getMins = (_dateInstance) => {
    let mins = _dateInstance.getMinutes();
    return mins < 10 ? '0' + mins : mins;
};

export const getFormat = (_dateInstance) => {
    return _dateInstance.getHours() >= 12 ? 'PM' : 'AM';
};

export const getFormatedHour = (hour, format) => {
    let tempHour;
    if (format == 'AM') tempHour = hour == 12 ? 0 : hour;
    else tempHour = hour == 12 ? hour : hour + 12;
    return tempHour;
};

export const getTitleDate = (_dateInstance) => {
    return _dateInstance.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const createTaskValidation = (taskObj) => {
    let error = '';
    if (!taskObj['description'] || !taskObj['description'].trim()) {
        error = 'Please add description.';
        return error;
    }
    if (!taskObj['date']) {
        error = 'Please select the date.';
        return error;
    }
    if (!taskObj['hour']) {
        error = 'Please select the hour.';
        return error;
    }
    if (!taskObj['min']) {
        error = 'Please select the minutes.';
        return error;
    }
    if (!taskObj['format']) {
        error = 'Please select the meridian.';
        return error;
    }
    return true;
};

export const dateIsValid = (targetDate, idealDate) => {
    if (targetDate + 60000 < idealDate) {
        return false;
    }
    return true;
};
