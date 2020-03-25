import React from 'react'
import { Button, Spinner } from 'react-bootstrap';

import classes from './SubmitButton.module.css';

const SubmitButton = (props) => {
    let spinner = null;
    if (props.startAuth) {
        spinner = (
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
        )
    }

    return (
        <Button
            variant="info"
            type="submit"
            className={classes.submitBtn}
            onClick={props.onClick}
            disabled={props.startAuth || props.disabled}>
            {props.text} {spinner}
        </Button>
    )
}

export default SubmitButton;
