import axios from '../../utility/axios-instance';

import * as actionTypes from './actionTypes';

export const fetchRecipesActionCreator = (recipes) => {
    return {
        type: actionTypes.FETCH_RECIPES,
        recipes: recipes,
    }
}

export const getRecipesCountActionCreator = (count) => {
    return {
        type: actionTypes.GET_RECIPES_COUNT,
        count: count,
    }
}

export const startLoadingActionCreator = () => {
    return {
        type: actionTypes.FETCHING_START,
    }
}

export const getRecipesCountAction = (userId = null) => {
    return dispatch => {
        axios.post('/recipe/recipes-count', { userId })
            .then(count => {
                dispatch(getRecipesCountActionCreator(count.data));
            })
    }
}

export const fetchRecipesAction = (skip, limit, userId = null) => {
    return dispatch => {
        dispatch(startLoadingActionCreator());
        axios.post(`/recipe/list?skip=${skip}&limit=${limit}`, { userId })
            .then(recipes => {
                console.log(recipes);
                dispatch(fetchRecipesActionCreator(recipes.data));
            })
    }
}

