const ACTION = {
    signIn: 'signIn',
    signOut: 'signOut',
    updateTaskList: 'updateTaskList',
    createTaskUpdate: 'createTaskUpdate',
    resetTaskUpdate: 'resetTaskUpdate',
    changeCalendarView: 'changeCalendarView',
    updateTooltipInfo: 'updateTooltipInfo',
    resetTooltipInfo: 'resetTooltipInfo'
};

const initialState = {
    userDetails: {
        email: null
    },
    isLogged: false,
    taskManager: {
        tasks: []
    },
    curfToken: null,
    taskState: {
        createTaskDetails: {
            timestamp: null,
            triggerType: 'create', //create/update
            description: null,
            date: null,
            hour: null,
            min: null,
            format: null,
            error: null
        }
    },
    calendarState: {
        currentView: {
            month: null,
            year: null
        },
        tooltip: {
            tooltipFor: null,
            utils: null,
            $elForTT: null
        }
    }
};

export default (state, payload) => {
    if (payload.hasOwnProperty('type')) {
        switch (payload.type) {
            case ACTION.signIn:
                let { user } = payload,
                    _tasks = payload.tasks;
                return Object.assign({}, state, {
                    userDetails: Object.assign({}, state.userDetails, {
                        email: user.email
                    }),
                    taskManager: Object.assign({}, state.taskManager, {
                        tasks: _tasks
                    }),
                    isLogged: true
                });

            case ACTION.updateTaskList:
                let { tasks } = payload;
                return Object.assign({}, state, {
                    taskManager: { tasks }
                });

            case ACTION.signOut:
                return Object.assign({}, initialState);

            case ACTION.createTaskUpdate:
                let timestamp = payload.hasOwnProperty('timestamp')
                        ? payload.timestamp
                        : state.taskState.createTaskDetails.timestamp,
                    triggerType = payload.hasOwnProperty('triggerType')
                        ? payload.triggerType
                        : state.taskState.createTaskDetails.triggerType,
                    description = payload.hasOwnProperty('description')
                        ? payload.description
                        : state.taskState.createTaskDetails.description,
                    date = payload.hasOwnProperty('date')
                        ? payload.date
                        : state.taskState.createTaskDetails.date,
                    hour = payload.hasOwnProperty('hour')
                        ? payload.hour
                        : state.taskState.createTaskDetails.hour,
                    min = payload.hasOwnProperty('min')
                        ? payload.min
                        : state.taskState.createTaskDetails.min,
                    format = payload.hasOwnProperty('format')
                        ? payload.format
                        : state.taskState.createTaskDetails.format,
                    error = payload.hasOwnProperty('error')
                        ? payload.error
                        : state.taskState.createTaskDetails.error;
                return Object.assign({}, state, {
                    taskState: Object.assign({}, state.taskState, {
                        createTaskDetails: {
                            timestamp,
                            triggerType,
                            description,
                            date,
                            hour,
                            min,
                            format,
                            error
                        }
                    })
                });

            case ACTION.resetTaskUpdate:
                return Object.assign({}, state, {
                    taskState: Object.assign({}, state.taskState, {
                        createTaskDetails: Object.assign(
                            {},
                            initialState.taskState.createTaskDetails
                        )
                    })
                });

            case ACTION.changeCalendarView:
                let month = payload.hasOwnProperty('month')
                        ? payload.month
                        : state.calendarState.currentView.month,
                    year = payload.hasOwnProperty('year')
                        ? payload.year
                        : state.calendarState.currentView.year;
                return Object.assign({}, state, {
                    calendarState: Object.assign({}, state.calendarState, {
                        currentView: { month, year }
                    })
                });

            case ACTION.updateTooltipInfo:
                let tooltipFor = payload.hasOwnProperty('tooltipFor')
                        ? payload.tooltipFor
                        : null,
                    utils = payload.hasOwnProperty('utils')
                        ? payload.utils
                        : null,
                    $elForTT = payload.hasOwnProperty('$elForTT')
                        ? payload.$elForTT
                        : null;
                return Object.assign({}, state, {
                    calendarState: Object.assign({}, state.calendarState, {
                        tooltip: { tooltipFor, utils, $elForTT }
                    })
                });

            case ACTION.resetTooltipInfo:
                return Object.assign({}, state, {
                    calendarState: Object.assign({}, state.calendarState, {
                        tooltip: {
                            tooltipFor: null,
                            utils: null,
                            $elForTT: null
                        }
                    })
                });

            default:
                return state;
        }
    }
};
