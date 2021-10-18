import React from 'react';
import Auth from '../utils/Auth';
import './Navbar.css';
import UserLogo from './UserLogo';

const Navbar: React.FC = ({ children }) => (
    <nav className="nav">
        <Auth shouldRedirect={false}>
            <UserLogo />
        </Auth>
        <ul className="nav-link-container">
            {children}
        </ul>
    </nav>
);

export default Navbar;
