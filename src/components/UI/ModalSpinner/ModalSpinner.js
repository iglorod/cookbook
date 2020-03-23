import React from 'react';
import { Spinner } from 'react-bootstrap';

import classes from './ModalSpinner.module.css';

const ModalSpinner = () => {
    return (
        <div className={classes.spinnerModal}>
            <div className={classes.spinner}>
                <Spinner
                    animation="border"
                    variant={'info'} />
            </div>
        </div>
    )
}

export default ModalSpinner;
