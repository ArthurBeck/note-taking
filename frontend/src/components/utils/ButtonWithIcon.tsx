import React from 'react';
import './ButtonWithIcon.css'

export interface Props {
    className: string;
    onClick: () => void;
}

const ButtonWithIcon: React.FC<Props> = ({ className, onClick, children }) => (
    <button type="button" className={`button-with-icon ${className}`} onClick={onClick}>{children}</button>
);

export default ButtonWithIcon;
