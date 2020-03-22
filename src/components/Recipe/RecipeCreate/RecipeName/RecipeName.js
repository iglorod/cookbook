import React from 'react';

const RecipeName = (props) => {
    return (
        <div className={'recipeChunk'}>
            <h4>Recipe Name</h4>
            <input
                className="form-control"
                value={props.name}
                onChange={props.onChange.bind(this, 'name')}
                placeholder="Type your recipe name"
            ></input>
        </div>
    )
}

export default RecipeName;
