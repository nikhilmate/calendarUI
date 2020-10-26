import React, { Component } from 'react';
import { Logo } from '../utils/Icons';
import UserActionWidget from './UserActionWidget';
import AppContext from '../store/AppContext';
import { signOut } from '../utils/ApiActions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetVisibility: false,
            widgetFor: 'sign_up',
            actionElement: false,
            isLogged: false
        };
        this.wrapperRef = React.createRef();
    }

    static contextType = AppContext;

    signInHandler = (e) => {
        let widgetVisibility,
            actionElement = e.currentTarget;
        if (
            this.state.widgetFor == 'sign_in' &&
            !!this.state.widgetVisibility
        ) {
            widgetVisibility = !this.state.widgetVisibility;
        } else {
            widgetVisibility = true;
        }
        this.setState({
            widgetVisibility,
            widgetFor: 'sign_in',
            actionElement
        });
    };

    signOutHandler = (e) => {
        try {
            signOut().then((res) => {
                if (res.success == true) {
                    typeof this.context.contextReducer == 'function' &&
                        this.context.contextReducer({
                            type: 'signOut'
                        });
                    window.location.reload();
                } else {
                    console.log('could not signout');
                }
            });
        } catch (error) {}
    };

    signUpHandler = (e) => {
        let widgetVisibility,
            actionElement = e.currentTarget;
        if (
            this.state.widgetFor == 'sign_up' &&
            !!this.state.widgetVisibility
        ) {
            widgetVisibility = !this.state.widgetVisibility;
        } else {
            widgetVisibility = true;
        }
        this.setState({
            widgetVisibility,
            widgetFor: 'sign_up',
            actionElement
        });
    };

    handleVisibility = (child_state) => {
        this.setState({ widgetVisibility: child_state.widgetVisibility });
    };

    render() {
        let { isLogged } = this.context.AppData;
        return (
            <header className="calendar__app-header">
                <div className="app__header-inner just-betwn align--center">
                    <div className="app__logo-wrap inline-flx">
                        <Logo />
                    </div>
                    <div
                        ref={this.wrapperRef}
                        className="wrap__user-action inline-flx align--center"
                    >
                        {isLogged && (
                            <button
                                onClick={this.signOutHandler}
                                className="btn__comn--user-action comn__btn btn__sign-out ml-30"
                            >
                                Sign Out
                            </button>
                        )}
                        {!isLogged && (
                            <>
                                <button
                                    onClick={this.signInHandler}
                                    className="btn__comn--user-action comn__btn btn__sign-in"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={this.signUpHandler}
                                    className="btn__comn--user-action comn__btn btn__sign-up ml-30"
                                >
                                    Sign Up
                                </button>
                                <UserActionWidget
                                    parentNode={this.wrapperRef}
                                    widgetVisibility={
                                        this.state.widgetVisibility
                                    }
                                    widgetFor={this.state.widgetFor}
                                    actionElement={this.state.actionElement}
                                    handleVisibility={this.handleVisibility}
                                />
                            </>
                        )}
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
