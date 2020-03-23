import React from 'react';

const RecipeAuthor = (props) => {
    const humanDate = new Date(props.date * 1000).toLocaleString();
    const authorName = props.author.split('@')[0];

    return (
        <div className={'authorContainer'}>
            Author: <p className={'author'}>{authorName}</p> | <span className={'creationDate'}>{humanDate}</span>
        </div>
    )
}

export default RecipeAuthor;
