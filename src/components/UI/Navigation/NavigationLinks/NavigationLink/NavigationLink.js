import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationLink.module.css';

const NavigationLink = (props) => {
    return (
        <NavLink
            to={props.to}
            className={classes.navLink}
            activeClassName={classes.navLinkActive}
        >
            {props.children}
        </NavLink>
    )
}

export default NavigationLink;
