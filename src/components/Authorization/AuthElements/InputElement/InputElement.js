import React from 'react';
import { Form } from 'react-bootstrap';

import classes from './InputElement.module.css';

const InputElement = (props) => {
    return (
        <Form.Group className={classes.input}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onInput}
                value={props.value}
                isInvalid={props.error} />
            <Form.Control.Feedback type="invalid">
                {props.helperText}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default InputElement;
