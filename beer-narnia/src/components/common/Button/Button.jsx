import React from 'react';
import PropTypes from 'prop-types';

const Button = ({nameClass, onClick, label, link, icon}) => (
    <button className={nameClass} onClick={onClick} link={link}>{icon !== undefined ? <i className={icon}></i> : label}</button>
);

export default Button;

Button.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    link: PropTypes.string,
    nameClass: PropTypes.string,
    icon: PropTypes.string
};