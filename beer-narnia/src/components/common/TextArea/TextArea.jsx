import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({label, value, placeholder, name, nameClass, onChange, iconClass, onMouseDown, onMouseUp, onClick, id}) => (
    <div className={nameClass}>
        <label htmlFor={id}>{label}</label>
        <div className="input-and-icon"><textarea value={value} placeholder={placeholder} onChange={onChange} name={name} id={id}/>
            <i className={iconClass} onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp}/>
        </div>
    </div>);


export default TextArea;

TextArea.propTypes = {
    onMouseUp: PropTypes.func,
    onChange: PropTypes.func,
    onMouseDown: PropTypes.func,
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    nameClass: PropTypes.string,
    iconClass: PropTypes.string,
    id: PropTypes.string
};