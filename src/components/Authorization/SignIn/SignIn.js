import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Container, Row, Col } from 'react-bootstrap';


import InputElement from '../AuthElements/InputElement/InputElement';
import TitleElement from '../AuthElements/TitleElement/TitleElement';
import RememberMe from '../AuthElements/RememberMe/RememberMe';
import SubmitButton from '../AuthElements/SubmitButton/SubmitButton';
import AlertMessage from '../../UI/AlertMessage/AlertMessage';
import { signInAction } from '../../../store/actions/authorization';
import { validation } from '../../../utility/validation';
import classes from './SignIn.module.css';

const SignIn = (props) => {
    const [rememberMe, setRememberMe] = useState(false);

    const [stateInputs, setStateInputs] = useState({
        email: {
            config: {
                label: 'Email address',
                type: 'email',
                placeholder: 'Enter email',
            },
            validationRules: {
                isRequred: true,
                isEmail: true,
            },
            isValid: false,
            validationMessage: '',
            value: '',
        },
        password: {
            config: {
                label: 'Password',
                type: 'password',
                placeholder: 'Type password',
            },
            validationRules: {
                isRequred: true,
                minLength: true,
            },
            isValid: false,
            validationMessage: '',
            value: '',
        },
    });


    if (props.email) return <Redirect to='/' />

    
    const rememberCheckboxHandler = () => {
        setRememberMe(prevState => {
            return !prevState
        })
    }

    const signInHandler = (event) => {
        event.preventDefault();

        const userData = {
            email: stateInputs.email.value,
            password: stateInputs.password.value
        };

        props.onSignIn(userData, rememberMe);
    }

    const onInputHandler = (inputName, event) => {
        const newValue = event.target.value;
        const [currentValid, newValidationMessage] = validation(
            newValue,
            stateInputs[inputName].validationRules,
            stateInputs.email.value
        );

        setStateInputs(prevState => ({
            ...prevState,
            [inputName]: {
                ...prevState[inputName],
                value: newValue,
                isValid: currentValid,
                validationMessage: newValidationMessage
            }
        }));
    }

    let inputs = [];
    let fieldsIsValid = true;

    for (let key in stateInputs) {
        inputs.push(
            <InputElement
                key={key}
                label={stateInputs[key].config.label}
                type={stateInputs[key].config.type}
                placeholder={stateInputs[key].config.placeholder}
                value={stateInputs[key].value}
                onInput={onInputHandler.bind(this, key)}
                error={!stateInputs[key].isValid && stateInputs[key].value.length > 0}
                helperText={stateInputs[key].validationMessage}
            />
        );

        fieldsIsValid = stateInputs[key].isValid && fieldsIsValid;
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={1} md={4}></Col>
                <Col sm={10} md={4}>
                    <TitleElement>Sign In</TitleElement>

                    <Form>
                        {inputs}

                        <AlertMessage errorMessage={props.errorMessage} />

                        <RememberMe onChange={rememberCheckboxHandler} />
                        <SubmitButton
                            text={'Sign In'}
                            disabled={!fieldsIsValid}
                            startAuth={props.authStart}
                            onClick={signInHandler} />

                        <Link to="/sign-up" className={classes.redirectLink}>Don't have an account? Sign Up</Link>
                    </Form>
                </Col>
                <Col sm={1} md={4}></Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        email: state.auth.email,
        authStart: state.auth.authStart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (userData, rememberMe) => dispatch(signInAction(userData, rememberMe)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
