import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/utils/Auth';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Edit from './pages/Edit';

const App: React.FC = () => (
    <Switch>
        <Route path="/signup">
            <AuthPage
                name="Sign up"
                navigationUrls={[{ url: '/login', text: 'Log in' }]}
                apiURL="/api/register"
                nextPage="/login"
                askForImage
            />
        </Route>
        <Route path="/login">
            <AuthPage
                name="Log in"
                navigationUrls={[{ url: '/signup', text: 'Sign up' }]}
                apiURL="/api/login"
                nextPage="/dashboard"
                onSuccess={(jwt: string) => {
                    localStorage.setItem('user', jwt);
                }}
            />
        </Route>
        <Route path="/dashboard">
            <Auth>
                <Dashboard />
            </Auth>
        </Route>
        <Route path="/edit">
            <Auth>
                <Edit />
            </Auth>
        </Route>
        <Route path="/">
            <Redirect to="/login" />
        </Route>
    </Switch>
);

export default App;
