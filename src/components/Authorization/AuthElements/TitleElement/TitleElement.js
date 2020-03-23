import React from 'react';
import Logo from '../../../../assets/images/logo.png';

import classes from './TitleElement.module.css';

const TitleElement = (props) => {
    return (
        <div className={classes.titleBlock}>
            <div>
                <img src={Logo} alt={'Logo'} height='70' />
            </div>
            <div className={classes.titleText}>{props.children}</div>
        </div>
    )
}

export default TitleElement;
