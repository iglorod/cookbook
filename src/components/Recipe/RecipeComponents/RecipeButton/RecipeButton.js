import React from 'react';
import { Spinner } from 'react-bootstrap';

const RecipeButton = (props) => {
    let spinner = null;
    if (props.loading) {
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
        <div
            className={'recipeButton'}
            onClick={props.loading ? null : props.onClick}
        >
            {props.text} {spinner}
        </div>
    )
}

export default RecipeButton;
