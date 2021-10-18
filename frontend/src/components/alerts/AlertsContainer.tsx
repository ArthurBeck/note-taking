import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Alert from './Alert';
import './AlertsContainer.css';

const AlertsContainer: React.FC = () => {
    const { alerts } = useAppContext();

    if (alerts.length === 0) {
        return null;
    }

    return (
        <div className="alerts-container">
            {alerts.map(alert => (
                <Alert message={alert} key={alert} />
            ))}
        </div>
    );
};

export default AlertsContainer;
