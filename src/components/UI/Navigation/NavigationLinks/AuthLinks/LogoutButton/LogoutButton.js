import React from 'react';

import classes from './LogoutButton.module.css';

const LogoutButton = (props) => {
    return (
        <div
            className={classes.logoutBtn}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}

export default LogoutButton;
