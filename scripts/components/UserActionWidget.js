import React, { Component } from 'react';
import AppContext from '../store/AppContext';
import { signUp, signIn } from '../utils/ApiActions';
// import { setNewExp } from '../utils/Util';

class UserActionWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
            email: '',
            password: ''
        };
    }

    static contextType = AppContext;

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.widgetVisibility !== this.props.widgetVisibility ||
            nextProps.widgetFor !== this.props.widgetFor ||
            this.state !== nextState
        ) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    handleClick = (e) => {
        if (this.props.parentNode.current.contains(e.target)) {
            return;
        }
        let wrapper = document.querySelector('.wrap__user-action--widget');
        if (wrapper) {
            wrapper.classList.remove('showWidget');
            this.props.handleVisibility({ widgetVisibility: false });
        }
    };

    formSubmitHandler = async (e) => {
        e.preventDefault(e);
        let emailPattern = /^([a-zA-Z0-9_.+-]{2,20})+\@(([a-zA-Z0-9-]{2,20})+\.)+([a-zA-Z0-9]{2,20})+$/,
            passPattern = /^(?=.*[0-9a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            validEmail = emailPattern.test(this.state.email),
            validPass = passPattern.test(this.state.password);

        if (validEmail && validPass) {
            let config = {
                body: {
                    email: this.state.email,
                    password: this.state.password
                },
                headers: {
                    'XSRF-TOKEN': this.context.AppData.curfToken
                }
            };
            if (this.props.widgetFor == 'sign_up') {
                this.signUpHandler(config);
            } else if (this.props.widgetFor == 'sign_in') {
                this.signInHandler(config);
            }
        }
    };

    signInHandler = (config) => {
        try {
            signIn(config)
                .then((res) => {
                    if (res.hasOwnProperty('success')) {
                        if (!!res.success) {
                            typeof this.context.contextReducer == 'function' &&
                                this.context.contextReducer({
                                    type: 'signIn',
                                    user: {
                                        email: res.user.email
                                    },
                                    tasks: res.tasks
                                });
                        } else if (!res.success && !!res.errors) {
                            this.setState({
                                errorMsg: res.errors[0]
                            });
                            this.removeErrorState();
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        errorMsg: err.errors[0]
                    });
                    this.removeErrorState();
                });
        } catch (error) {
            console.log(error);
        }
    };

    signUpHandler = (config) => {
        signUp(config)
            .then((res) => {
                if (res.hasOwnProperty('success')) {
                    if (!!res.success) {
                        this.context.contextReducer({
                            type: 'signIn',
                            user: {
                                email: res.user.email
                            }
                        });
                    } else if (!res.success && !!res.errors) {
                        this.setState({
                            errorMsg: res.errors[0]
                                ? res.errors[0]
                                : 'Email Already present'
                        });
                        this.removeErrorState();
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: err.errors[0]
                });
            });
    };

    removeErrorState = () => {
        setTimeout(() => {
            this.setState({
                errorMsg: ''
            });
        }, 3000);
    };

    render() {
        let widgetVisibility = this.props.widgetVisibility ? 'showWidget' : '',
            titleH1 = this.props.widgetFor == 'sign_up' ? 'Sign Up' : 'Sign In';

        return (
            <div
                ref={(node) => (this.node = node)}
                className={
                    'wrap__user-action--widget ' +
                    widgetVisibility +
                    ' ' +
                    this.props.widgetFor
                }
            >
                <div className="user-action--widget-inner">
                    <h1 className="h1__ua--widget-title mb-15">{titleH1}</h1>
                    <form
                        className="form__user-action"
                        onSubmit={this.formSubmitHandler}
                    >
                        <div className="wrap__form-grp mb-15">
                            <input
                                type="text"
                                id="form_email"
                                className="input__comn--form-input"
                                placeholder="Email ID"
                                onChange={(e) =>
                                    this.setState({ email: e.target.value })
                                }
                                required={true}
                                autoComplete="off"
                                value={this.state.email}
                            />
                        </div>
                        <div className="wrap__form-grp mb-15">
                            <input
                                id="form_password"
                                type="password"
                                autoComplete="off"
                                className="input__comn--form-input"
                                placeholder="Secret"
                                onChange={(e) =>
                                    this.setState({ password: e.target.value })
                                }
                                required={true}
                                value={this.state.password}
                            />
                        </div>
                        <div className="wrap__form-grp">
                            <input
                                type="submit"
                                className="btn__widget-form comn__btn"
                                value="Submit"
                            />
                        </div>
                        {this.state.errorMsg != '' && (
                            <p className="p__widget-errorMsg">
                                {this.state.errorMsg}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}

export default UserActionWidget;
