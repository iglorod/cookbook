import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import RecipeView from '../Recipe/RecipeView/RecipeView';
import RecipeEdit from '../Recipe/RecipeEdit/RecipeEdit';
import RecipeCreate from '../Recipe/RecipeCreate/RecipeCreate';
import RecipesList from '../RecipesList/RecipesList';
import SignIn from '../Authorization/SignIn/SignIn';
import SignUp from '../Authorization/SignUp/SignUp';
import Navbar from '../UI/Navigation/Navigation';
import ModalSpinner from '../UI/ModalSpinner/ModalSpinner';
import { autoLogin } from '../../utility/auto-login';
import { signInLocalAction, refreshTokenAction } from '../../store/actions/authorization';
import { finishLoadingActionCreator } from '../../store/actions/authorization';

const Layout = (props) => {
    useEffect(() => {
        autoLogin(props.refreshTokenAndSignIn, props.signInByLocalData, props.finishLoading);
    }, [])

    if (props.loading) return  <ModalSpinner />;

    return (
        <>
            <Navbar />
            <Switch>
                <Route path={'/create'} component={RecipeCreate} exact />
                <Route path={'/view'} component={RecipeView} exact />
                <Route path={'/edit'} component={RecipeEdit} exact />
                <Route path={'/sign-in'} component={SignIn} exact />
                <Route path={'/sign-up'} component={SignUp} exact />
                <Route path={'/'} component={RecipesList} />
            </Switch>
        </>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signInByLocalData: () => { dispatch(signInLocalAction()) },
        refreshTokenAndSignIn: (token) => { dispatch(refreshTokenAction(token)) },
        finishLoading: () => { dispatch(finishLoadingActionCreator()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
