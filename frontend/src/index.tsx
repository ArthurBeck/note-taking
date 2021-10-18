import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppState from './context/AppState';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <AppState>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppState>
    </React.StrictMode>,
    document.getElementById('root')
);
