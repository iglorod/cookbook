import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import classes from './RecipeCard.module.css';

const RecipeCard = (props) => {
    return (
        <Card>
            <Link to={{
                pathname: '/view',
                state: { recipeId: props.recipe._id }
            }}>
                <div style={{ maxHeight: '150px', overflow: 'hidden' }}>
                    <Card.Img variant="top" src={props.recipe.image} />
                </div>
            </Link>
            <Card.Body>
                <Link
                    to={{
                        pathname: '/view',
                        state: { recipeId: props.recipe._id }
                    }}
                    className={classes.recipeUrl}
                >
                    <Card.Title className={classes.recipeName}>
                        {props.recipe.name}
                    </Card.Title>
                </Link>
                <Card.Text className={classes.recipeDescription}>
                    {props.recipe.description}
                </Card.Text>
                <Card.Text className={classes.recipeAdditionalData}>
                    <div><FontAwesomeIcon icon={faClock} /> {props.recipe.totalTime}</div>
                    {new Date(props.recipe.date * 1000).toLocaleString()}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;
