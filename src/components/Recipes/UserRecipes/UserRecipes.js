import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getRecipesCountAction, fetchRecipesAction } from '../../../store/actions/recipes';
import RecipesList from '../RecipesList/RecipesList';
import ModalSpinner from '../../UI/ModalSpinner/ModalSpinner';

const UserRecipes = (props) => {
    if (!props.userId) props.history.push('/sign-in');

    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        props.getRecipesCount(props.userId);
        props.loadRecipes((activePage - 1) * 6, 6, props.userId);
    }, [activePage])

    const paginationHandler = (number) => {
        setActivePage(number);
    }

    if (props.fetching) return <ModalSpinner />

    return (
        <Container>
            <RecipesList
                recipes={props.recipes}
                recipesCount={props.recipesCount}
                step={6}
                activePage={activePage}
                paginationHandler={paginationHandler}
            />
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.auth.id,
        recipes: state.rcp.recipes,
        recipesCount: state.rcp.totalRecipesCount,
        fetching: state.rcp.fetching,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipesCount: (userId) => { dispatch(getRecipesCountAction(userId)) },
        loadRecipes: (skip, limit, userId) => { dispatch(fetchRecipesAction(skip, limit, userId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
