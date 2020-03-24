import React from 'react';

import Pagination from '../../UI/Pagination/Pagination';
import RecipeCard from './RecipeCard/RecipeCard';
import { CardDeck, Row, Col } from 'react-bootstrap';
import './RecipeList.css';

const RecipesList = (props) => {
    return (
        <>
            <Row>
                <CardDeck style={{ width: '100%' }}>
                    {
                        props.recipes.map(recipe => {
                            return (
                                <Col xs={12} md={4} key={recipe._id} className={'pb-3'}>
                                    <RecipeCard
                                        recipe={recipe} />
                                </Col>
                            )
                        })
                    }
                </CardDeck>
            </Row>
            <Pagination
                recipesCount={props.recipesCount}
                activePage={props.activePage}
                step={props.step}
                onClick={props.paginationHandler} />
        </>
    )
}

export default RecipesList;
