import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchRecipeVersionsAction } from '../../../store/actions/recipes';
import RecipesList from '../RecipesList/RecipesList';
import ModalSpinner from '../../UI/ModalSpinner/ModalSpinner';

const RecipeVersions = (props) => {
    const recipeId = props.location.state.recipeId;
    const [firstFetch, setFirstFetch] = useState(true);

    useEffect(() => {
        props.loadRecipeVersions(recipeId);
        setFirstFetch(false);
    }, [])

    if (props.fetching || firstFetch) return <ModalSpinner />

    return (
        <Container>
            <RecipesList
                original={recipeId}
                recipes={props.recipes}
                recipesCount={props.recipesCount}
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
        loadRecipeVersions: (recipeId) => { dispatch(fetchRecipeVersionsAction(recipeId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeVersions);
