import React from 'react';
import Navbar from '../navigation/Navbar';
import NavItem from '../navigation/NavItem';
import './Page.css';

export type NavigationUrl = {
    url: string;
    text: string;
    onClick?: () => void;
}

export type NavigationUrls = Array<NavigationUrl>;

export interface Props {
    navigationUrls: NavigationUrls;
};

const Page: React.FC<Props> = ({ children, navigationUrls }) => (
    <>
        <Navbar>
            {navigationUrls.map(navigationUrl => <NavItem key={navigationUrl.url} url={navigationUrl.url} text={navigationUrl.text} onClick={navigationUrl.onClick} />)}
        </Navbar>
        <main className="page-container">
            {children}
        </main>
    </>
);

export default Page;
