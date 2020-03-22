import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

//import { logoutActionCreator } from '../../../../store/actions/authentication';

const LogoutButton = (props) => {
    const logoutHandler = () => {
       // props.logout();
    }

    /*if (props.userEmail) {
        return (
            <Button variant="outline-light" onClick={logoutHandler}>
                {props.userEmail.split('@')[0]} (Logout)
            </Button>
        )
    }*/

    return null;
}

const mapStateToProps = state => {
    return {
        userEmail: state.auth.email,
    }
}

const mapDispatchToProps = dispatch => {
    return {
     //   logout: () => { dispatch(logoutActionCreator()) }
    }
}

export default /*connect(mapStateToProps, mapDispatchToProps)(*/LogoutButton;
