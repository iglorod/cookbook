import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { logoutActionCreator } from '../../../../../store/actions/authorization';
import NavigationLink from '../NavigationLink/NavigationLink';
import LogoutButton from './LogoutButton/LogoutButton';

const AuthLinks = (props) => {
    if (props.userEmail) {
        return (
            <LogoutButton onClick={props.logout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </LogoutButton>
        )
    }

    return (
        <>
            <NavigationLink to="/sign-up"><FontAwesomeIcon icon={faUserPlus} /> Sign Up</NavigationLink>
            <NavigationLink to="/sign-in"><FontAwesomeIcon icon={faSignInAlt} /> Sign In</NavigationLink>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userEmail: state.auth.email,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => { dispatch(logoutActionCreator()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLinks);
