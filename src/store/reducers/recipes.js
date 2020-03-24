import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recipes: [],
    fetching: false,
    totalRecipesCount: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCHING_START: {
            return {
                ...state,
                fetching: true,
            }
        }

        case actionTypes.FETCH_RECIPES: {
            return {
                ...state,
                recipes: [...action.recipes],
                fetching: false,
            }
        }

        case actionTypes.GET_RECIPES_COUNT: {
            return {
                ...state,
                totalRecipesCount: action.count,
            }
        }

        default: return state;
    }
}

export default reducer;
