import React from 'react';
import PropTypes from 'prop-types';

const Input = ({nameClass, label, type, value, placeholder, onChange, name, id, iconClass, onClick, onMouseDown, onMouseUp}) => (
    <div className={nameClass}>
        <label htmlFor={id}>{label}</label>
        <div className="input-and-icon">
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                id={id}
                autoComplete={`new-${type}`}
            />
            <i
                className={iconClass}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            />
        </div>
    </div>
);

export default Input;

Input.propTypes = {
    onMouseUp: PropTypes.func,
    onChange: PropTypes.func,
    onMouseDown: PropTypes.func,
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    nameClass: PropTypes.string,
    iconClass: PropTypes.string,
    id: PropTypes.string
};

