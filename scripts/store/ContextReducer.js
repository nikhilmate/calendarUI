const ACTION = {
    signIn: 'signIn',
    signOut: 'signOut',
    updateTaskList: 'updateTaskList',
    updateNotes: 'updateNotes',
    createTaskUpdate: 'createTaskUpdate',
    resetTaskUpdate: 'resetTaskUpdate',
    changeCalendarView: 'changeCalendarView',
    updateTaskWidget: 'updateTaskWidget',
    resetTaskWidget: 'resetTaskWidget',
    updateNoteState: 'updateNoteState',
    resetNoteState: 'resetNoteState'
};

const initialState = {
    userDetails: {
        email: null
    },
    isLogged: false,
    taskManager: {
        tasks: []
    },
    noteManager: {
        notes: []
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
            error: null,
            id: null
        },
        taskWidget: {
            ts: null,
            tf: null,
            makeVisible: false
        }
    },
    noteState: {
        triggerType: null, //create/update
        timestamp: null,
        noteDesc: null,
        id: null,
        error: null
    },
    calendarState: {
        currentView: {
            month: null,
            year: null
        }
    }
};

export default (state, payload) => {
    let stepState = Object.assign(state);
    try {
        if (payload instanceof Array) {
            payload.map((payloadObj) => {
                const nextState = setStateInContext(stepState, payloadObj);
                stepState = Object.assign(nextState);
            });
        } else {
            stepState = setStateInContext(stepState, payload);
        }
    } catch (error) {
        console.log(error);
    }
    return stepState;
};

const setStateInContext = (state, payload) => {
    if (payload.hasOwnProperty('type')) {
        switch (payload.type) {
            case ACTION.signIn:
                let { user } = payload,
                    _tasks = payload.tasks,
                    _notes = payload.notes;
                return Object.assign({}, state, {
                    userDetails: Object.assign({}, state.userDetails, {
                        email: user.email
                    }),
                    taskManager: Object.assign({}, state.taskManager, {
                        tasks: _tasks
                    }),
                    noteManager: Object.assign({}, state.noteManager, {
                        notes: _notes
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
                        : state.taskState.createTaskDetails.error,
                    id = payload.hasOwnProperty('id')
                        ? payload.id
                        : state.taskState.createTaskDetails.id;
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
                            error,
                            id
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

            case ACTION.updateTaskWidget:
                let ts = payload.hasOwnProperty('ts')
                        ? payload.ts
                        : state.taskState.taskWidget.ts,
                    tf = payload.hasOwnProperty('tf')
                        ? payload.tf
                        : state.taskState.taskWidget.tf,
                    makeVisible = payload.hasOwnProperty('makeVisible')
                        ? payload.makeVisible
                        : state.taskState.taskWidget.makeVisible;
                return Object.assign({}, state, {
                    taskState: Object.assign({}, state.taskState, {
                        taskWidget: { ts, tf, makeVisible }
                    })
                });

            case ACTION.resetTaskWidget:
                return Object.assign({}, state, {
                    taskState: Object.assign({}, state.taskState, {
                        taskWidget: { ts: null, tf: null, makeVisible: false }
                    })
                });

            case ACTION.updateNotes:
                let { notes } = payload;
                return Object.assign({}, state, {
                    noteManager: { notes }
                });

            case ACTION.updateNoteState:
                let timestamp2 = payload.hasOwnProperty('timestamp')
                        ? payload.timestamp
                        : state.noteState.timestamp,
                    triggerType2 = payload.hasOwnProperty('triggerType')
                        ? payload.triggerType
                        : state.noteState.triggerType,
                    noteDesc = payload.hasOwnProperty('noteDesc')
                        ? payload.noteDesc
                        : state.noteState.noteDesc,
                    id2 = payload.hasOwnProperty('id')
                        ? payload.id
                        : state.noteState.id,
                    error2 = payload.hasOwnProperty('error')
                        ? payload.error
                        : state.noteState.error;
                return Object.assign({}, state, {
                    noteState: Object.assign({}, state.noteState, {
                        timestamp: timestamp2,
                        triggerType: triggerType2,
                        noteDesc,
                        id: id2,
                        error: error2
                    })
                });

            case ACTION.resetNoteState:
                return Object.assign({}, state, {
                    noteState: Object.assign({}, state.noteState, {
                        timestamp: null,
                        triggerType: null,
                        noteDesc: null,
                        id: null,
                        error: null
                    })
                });

            default:
                return state;
        }
    }
};
