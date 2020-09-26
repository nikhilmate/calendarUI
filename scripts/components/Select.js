import React, { Component } from 'react';

class Select extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.defaultOption !== nextProps.defaultOption) {
            return true;
        }
        return false;
    }

    onSelectHandler = (event) => {
        let value = event.currentTarget.value;
        this.props.onChangeHandler(value);
    };

    render() {
        let options =
            typeof this.props.options == 'object' &&
            this.props.options.length > 0
                ? this.props.options
                : [];
        let defaultOption = this.props.defaultOption
            ? this.props.defaultOption.toString()
            : options[0];

        return (
            <select
                onChange={this.onSelectHandler}
                className={this.props.className}
                name={this.props.name}
                id={this.props.id}
                value={defaultOption}
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
