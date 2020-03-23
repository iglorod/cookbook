import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

const RecipeTime = (props) => {
    return (
        <>
            <InputGroup.Prepend>
                <InputGroup.Text>{props.text}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                value={props.time}
                onChange={props.onChange}
                readOnly={props.readOnly} />
        </>
    )
}

export default RecipeTime;
