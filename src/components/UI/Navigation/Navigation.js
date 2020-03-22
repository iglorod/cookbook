import React from 'react';
import { Navbar } from 'react-bootstrap';

import NavigationBrand from './NavigationBrand/NavigationBrand';
import NavigationLinks from './NavigationLinks/NavigationLinks';
import './Navigation.css';

const Navigation = () => {
    return (
        <Navbar collapseOnSelect className="shadow" expand="lg" bg="info" variant="light">
            <NavigationBrand />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <NavigationLinks />
        </Navbar>
    )
}

export default Navigation;
