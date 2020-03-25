import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getRecipesCountAction, fetchRecipesAction } from '../../../store/actions/recipes';
import RecipesList from '../RecipesList/RecipesList';
import ModalSpinner from '../../UI/ModalSpinner/ModalSpinner';

const AllRecipes = (props) => {
    const [activePage, setActivePage] = useState(1);
    const [firstFetch, setFirstFetch] = useState(true);

    useEffect(() => {
        props.getRecipesCount();
        props.loadRecipes((activePage - 1) * 6, 6);
        
        setFirstFetch(false);
    }, [activePage])

    const paginationHandler = (number) => {
        setActivePage(number);
    }

    if (props.fetching || firstFetch) return <ModalSpinner />

    return (
        <Container>
            <RecipesList
                recipes={props.recipes}
                recipesCount={props.recipesCount}
                pagination
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
        getRecipesCount: () => { dispatch(getRecipesCountAction()) },
        loadRecipes: (skip, limit) => { dispatch(fetchRecipesAction(skip, limit)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes);
