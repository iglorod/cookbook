import * as actionTypes from '../actions/actionTypes';
import reducer from './authorization';

describe('auth reducer', () => {
    const initialState = {
        id: null,
        email: null,
        token: null,
        expirationTime: null,
        errorMessage: null,
        authStart: false,
        refreshTimerId: null,
        loading: true,
    }

    it('shoud return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('shoud return initial state with { loading: false }', () => {
        const state = {
            id: 'some-id',
            email: 'some-email',
            token: 'some-token',
            expirationTime: 'some-exp-time',
            errorMessage: 'some-error',
            authStart: false,
            refreshTimerId: 'some-timer',
            loading: true,
        }

        const resultState = { ...initialState, loading: false }

        expect(reducer(state, { type: actionTypes.LOGOUT })).toEqual(resultState);
    })
})