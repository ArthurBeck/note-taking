import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Spinner from './Spinner';
import './Auth.css';
import { useAppContext } from '../../context/AppContext';

export function authHeader() {
    return  {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('user')}`
        }
    };
}

export const deleteToken = () => {
    localStorage.removeItem('user');
};

export interface Props {
    shouldRedirect?: boolean;
}

const Auth: React.FC<Props> = ({ children, shouldRedirect = true }) => {
    const [loading, setLoading] = useState(true);
    const  { authenticated, setAuthenticated } = useAppContext();

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token === null) {
            setLoading(false);
            setAuthenticated(false);
        } else if (!authenticated) {
            const validateToken = async () => {
                try {
                    const res = await axios.post('/api/verify_token', {
                        token
                    });

                    setAuthenticated(res.data === 'VALID');
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            }

            validateToken();
        } else {
            setLoading(false);
        }
    }, [authenticated, setAuthenticated]);

    return loading ? (
        <div className="auth-spinner-container">
            <Spinner />
        </div>
    ) : authenticated ? (
        <>{children}</>
    ) : shouldRedirect ? (
        <Redirect to="/login" />
    ) : null;
};

export default Auth;
