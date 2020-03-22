import React from 'react';

const RecipeDescription = (props) => {
    return (
        <div className={'recipeChunk'}>
            <h4>Description</h4>
            <textarea
                className="form-control"
                value={props.description}
                onChange={props.onChange.bind(this, 'description')}
                placeholder="Write some about your recipe"
            ></textarea>
        </div>
    )
}

export default RecipeDescription;
