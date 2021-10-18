import React from 'react';
import './Alert.css';

export interface Props {
    message: string;
}

const Alert: React.FC<Props> = ({ message }) => {

    return (
        <div className="alert">{message}</div>
    );
};

export default Alert;
