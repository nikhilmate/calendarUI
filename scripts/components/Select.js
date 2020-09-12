import React, { Component } from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onSelectHandler = this.onSelectHandler.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps || this.state.value !== nextState.value) {
            console.log('changing props');
            return true;
        }
        return false;
    }

    onSelectHandler(event) {
        console.log(event);
        let value = event.currentTarget.value;
        this.setState({ value });
        this.props.onChangeHandler(value);
    }

    render() {
        let options =
            typeof this.props.options == 'object' &&
            this.props.options.length > 0
                ? this.props.options
                : [];
        let defaultOption = this.props.defaultOption
            ? this.props.defaultOption
            : options[0];
        return (
            <select
                onChange={this.onSelectHandler}
                className={this.props.className}
                name={this.props.name}
                id={this.props.id}
                defaultValue={defaultOption}
            >
                {options.map((option, i) => {
                    return (
                        <option key={i} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        );
    }
}

export default Select;
