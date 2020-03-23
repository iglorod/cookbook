import React from 'react';

const RecipeName = (props) => {
    if (props.readOnly) {
        return (
            <div style={{
                padding: '10px 0',
                textAlign: 'center',
            }}>
                <h3>{props.name}</h3>
            </div>
        )
    }

    return (
        <div className={'recipeChunk'}>
            <h4>Recipe Name</h4>
            <input
                className="form-control"
                value={props.name}
                onChange={props.readOnly ? null : props.onChange.bind(this, 'name')}
                placeholder="Type your recipe name"
                readOnly={props.readOnly}
            ></input>
        </div>
    )
}

export default RecipeName;
