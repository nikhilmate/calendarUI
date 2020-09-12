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
export const getMonthName = (date) => {
    let monthName = monthArray[date.getMonth()];
    return monthName;
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
