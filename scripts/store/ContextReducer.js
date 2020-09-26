const ACTION = {
    signIn: 'signIn',
    signOut: 'signOut',
    updateTaskList: 'updateTaskList',
    createTaskUpdate: 'createTaskUpdate',
    changeCalendarView: 'changeCalendarView'
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
            timestamp: null
        }
    },
    calendarState: {
        currentView: {
            month: null,
            year: null
        },
        tooltipFor: null
    }
};

export default (state, payload) => {
    if (payload.hasOwnProperty('type')) {
        switch (payload.type) {
            case ACTION.signIn:
                const { user } = payload;
                return Object.assign({}, state, {
                    userDetails: Object.assign({}, state.userDetails, {
                        email: user.email
                    }),
                    isLogged: true
                });

            case ACTION.updateTaskList:
                const { tasks } = payload;
                return Object.assign({}, state, { tasks });

            case ACTION.signOut:
                return Object.assign({}, initialState);

            case ACTION.createTaskUpdate:
                const { timestamp } = payload;
                return Object.assign({}, state, {
                    taskState: Object.assign({}, state.taskState, {
                        createTaskDetails: { timestamp }
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

            default:
                return state;
        }
    }
};
