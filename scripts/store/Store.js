import React, { Component } from 'react';
import AppContext from './AppContext';
import ContextReducer from './ContextReducer';
import { getCookie } from '../utils/Util';
import { isLoggedCheck } from '../utils/ApiActions';

const initState = {
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
        tooltipFor: null
    }
};

class AppProvider extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, initState);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log((this.state, nextState, this.state) !== nextState);
        if (this.state !== nextState) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        let curfToken = getCookie('XSRF-TOKEN');
        if (curfToken) {
            this.setState({ curfToken });
        }
        this.setIsLogged();
    }

    setIsLogged = () => {
        try {
            isLoggedCheck()
                .then((res) => {
                    if (res.hasOwnProperty('success')) {
                        if (res.success == true) {
                            this.setState((prevState) => ({
                                ...prevState,
                                userDetails: {
                                    email: res.user.email
                                },
                                taskManager: {
                                    tasks: res.tasks
                                },
                                isLogged: true
                            }));
                        } else if (!res.success && !!res.errors) {
                            this.setState((prevState) => ({
                                ...prevState,
                                userDetails: {
                                    email: null
                                },
                                taskManager: {
                                    tasks: []
                                },
                                isLogged: false
                            }));
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState((prevState) => ({
                        ...prevState,
                        userDetails: {
                            email: null
                        },
                        taskManager: {
                            tasks: []
                        },
                        isLogged: false
                    }));
                });
        } catch (error) {
            console.log(error);
        }
    };

    contextReducer = (params) => {
        // reducer
        this.setState(ContextReducer(this.state, params));
        console.log(params);
    };

    render() {
        let contextValue = {
            AppData: this.state,
            contextReducer: (params) => this.contextReducer(params)
        };
        return (
            <AppContext.Provider value={contextValue}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default AppProvider;
