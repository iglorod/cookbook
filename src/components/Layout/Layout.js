import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RecipeView from '../Recipe/RecipeView/RecipeView';
import RecipeEdit from '../Recipe/RecipeEdit/RecipeEdit';
import RecipeCreate from '../Recipe/RecipeCreate/RecipeCreate';
import RecipesList from '../RecipesList/RecipesList';
import Navbar from '../UI/Navigation/Navigation';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path={'/create'} component={RecipeCreate} exact />
                <Route path={'/view'} component={RecipeView} exact />
                <Route path={'/edit'} component={RecipeEdit} exact />
                <Route path={'/'} component={RecipesList} />
            </Switch>
        </>
    )
}

export default Layout;