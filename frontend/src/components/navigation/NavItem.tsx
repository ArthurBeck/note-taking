import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationUrl } from '../layout/Page';
import './NavItem.css';

const NavItem: React.FC<NavigationUrl> = ({ url, text, onClick  }) => (
    <li className="nav-item" onClick={onClick}>
        <Link className="nav-item-link" to={url}>{text}</Link>
    </li>
);

export default NavItem;
