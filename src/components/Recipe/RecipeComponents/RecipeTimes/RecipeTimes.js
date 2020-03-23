import React from 'react';
import { InputGroup } from 'react-bootstrap';

import RecipeTime from './RecipeTime/RecipeTime';

const RecipeTimes = (props) => {
    return (
        <div className={'recipeChunk'}>
            <h4>Cooking time (min.)</h4>
            <InputGroup className="mb-3">
                <RecipeTime
                    time={props.prepTime}
                    text={'Prep:'}
                    readOnly={props.readOnly}
                    onChange={props.readOnly ? null : props.onChange.bind(this, 'prepTime')} />
                <RecipeTime
                    time={props.cookTime}
                    text={'Cook:'}
                    readOnly={props.readOnly}
                    onChange={props.readOnly ? null : props.onChange.bind(this, 'cookTime')} />
                <RecipeTime
                    time={props.totalTime}
                    text={'Total:'}
                    readOnly={props.readOnly}
                    onChange={props.readOnly ? null : props.onChange.bind(this, 'totalTime')} />
            </InputGroup>
        </div>
    )
}

export default RecipeTimes;
