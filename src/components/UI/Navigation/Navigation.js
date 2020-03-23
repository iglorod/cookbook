import React from 'react';
import { Navbar } from 'react-bootstrap';

import NavigationBrand from './NavigationBrand/NavigationBrand';
import NavigationLinks from './NavigationLinks/NavigationLinks';
import './Navigation.css';

const Navigation = () => {
    return (
        <>
            <Navbar collapseOnSelect className="shadow" expand="lg" bg="info" variant="light" fixed="top">
                <NavigationBrand />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <NavigationLinks />
            </Navbar>
            <div className={'empty'}></div>
        </>
    )
}

export default Navigation;
