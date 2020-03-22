import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import NavigationLink from './NavigationLink/NavigationLink';
import LogoutButton from './LogoutButton/LogoutButton'; 

const NavigationLinks = () => {
    return (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <NavigationLink to="/my-recipes">My recipes</NavigationLink>
                <NavigationLink to="/create"><FontAwesomeIcon icon={faPlusSquare} /> Create recipe</NavigationLink>
            </Nav>
            <LogoutButton />
        </Navbar.Collapse>
    )
}

export default NavigationLinks;
