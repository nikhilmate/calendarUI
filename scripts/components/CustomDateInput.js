import React, { forwardRef } from 'react';

const CustomDateInput = (props) => (
    <input
        autoComplete="off"
        type="text"
        placeholder="mm/dd/yyyy"
        name="dateinput"
        className="date__picker-input"
        id="date__picker-input"
        value={props.value}
        onClick={props.onClick}
        readOnly={true}
    />
);

export default forwardRef(CustomDateInput);
