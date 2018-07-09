import React from 'react';
import PropTypes from 'prop-types';

const Button = ({nameClass, onClick, label, link}) => (
    <button className={nameClass} onClick={onClick} link={link}>{label}</button>
);

export default Button;

Button.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    link: PropTypes.string,
    nameClass: PropTypes.string
};