import React from 'react';

const RecipeDescription = (props) => {
    let descriptionData = (
        <div style={{textAlign: 'justify'}}>{props.description}</div>
    )
    if (!props.readOnly) {
        descriptionData = (
            <textarea
                className="form-control"
                value={props.description}
                onChange={props.onChange.bind(this, 'description')}
                placeholder="Write some about your recipe"
                readOnly={props.readOnly}
            ></textarea>
        )
    }

    return (
        <div className={'recipeChunk'}>
            <h4>Description</h4>
            {descriptionData}
        </div>
    )
}

export default RecipeDescription;
