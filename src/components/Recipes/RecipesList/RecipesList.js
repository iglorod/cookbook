import React from 'react';

import Pagination from '../../UI/Pagination/Pagination';
import RecipeCard from './RecipeCard/RecipeCard';
import { CardDeck, Row, Col } from 'react-bootstrap';
import './RecipeList.css';

const RecipesList = (props) => {
    let pagination = null;
    if (props.pagination) {
        pagination = (
            <Pagination
                recipesCount={props.recipesCount}
                activePage={props.activePage}
                step={props.step}
                onClick={props.paginationHandler} />
        )
    }

    return (
        <>
            <Row>
                <CardDeck style={{ width: '100%' }}>
                    {
                        props.recipes.map(recipe => {
                            return (
                                <Col xs={12} md={4} key={recipe._id} className={'pb-3'}>
                                    <RecipeCard
                                        recipe={recipe}
                                        original={props.original === recipe._id} />
                                </Col>
                            )
                        })
                    }
                </CardDeck>
            </Row>
            {pagination}
        </>
    )
}

export default RecipesList;
