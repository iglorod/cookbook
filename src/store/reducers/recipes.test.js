import * as actionTypes from '../actions/actionTypes';
import reducer from './recipes';

describe('auth reducer', () => {
    const initialState = {
        recipes: [],
        fetching: false,
        totalRecipesCount: null,
    }

    it('shoud return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('shoud return new state with recipes array', () => {
        const recipes = [1, 2, 3];

        const resultState = { ...initialState, recipes: [...recipes] }
        expect(reducer(initialState, { type: actionTypes.FETCH_RECIPES, recipes })).toEqual(resultState);
    })

    it('shoud return new state with recipes count', () => {
        const count = 3;

        const resultState = { ...initialState, totalRecipesCount: count }
        expect(reducer(initialState, { type: actionTypes.GET_RECIPES_COUNT, count })).toEqual(resultState);
    })
})

