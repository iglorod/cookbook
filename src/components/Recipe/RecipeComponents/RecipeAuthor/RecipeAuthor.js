import React from 'react';
import { Link } from 'react-router-dom';

const RecipeAuthor = (props) => {
    const humanDate = new Date(props.date * 1000).toLocaleString();
    const authorName = props.author.split('@')[0];

    let versionsLink = null;
    if (props.versions) {
        versionsLink = (
            <Link to={{
                pathname: '/recipe-versions',
                state: { recipeId: props.recipeId }
            }
            }>Recipe versions</Link>
        )
    }

    return (
        <div className={'authorContainer'}>
            Author: <p className={'author'}>{authorName}</p> | <span className={'creationDate'}>{humanDate}</span>{versionsLink}
        </div>
    )
}

export default RecipeAuthor;
