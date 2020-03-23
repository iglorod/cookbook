import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Container, Row, Col } from 'react-bootstrap';

import axios from '../../../utility/axios-instance';
import InputElement from '../AuthElements/InputElement/InputElement';
import TitleElement from '../AuthElements/TitleElement/TitleElement';
import RememberMe from '../AuthElements/RememberMe/RememberMe';
import SubmitButton from '../AuthElements/SubmitButton/SubmitButton';
import AlertMessage from '../../UI/AlertMessage/AlertMessage';
import { signUpAction } from '../../../store/actions/authorization';
import { validation } from '../../../utility/validation';
import classes from './SignUp.module.css';

const SignUp = (props) => {
    if (props.email) props.history.push('/');

    const [rememberMe, setRememberMe] = useState(false);

    const [emailIsCorrect, setEmailIsCorrect] = useState(false);
    const [emailTimeoutId, setEmailTimeoutId] = useState(null);

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
        emailConfirm: {
            config: {
                label: 'Confirm email address',
                type: 'email',
                placeholder: 'Enter email',
            },
            validationRules: {
                isRequred: true,
                shoudBeEqual: true,
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

    useEffect(() => {
        clearTimeout(emailTimeoutId);

        if (!emailIsCorrect) return;

        const timeoutId = setTimeout(() => {
            const data = {
                email: stateInputs.email.value
            }

            axios.post('/user/email-exists', data)
                .then(response => {
                    if (response.data) {
                        setStateInputs(prevState => ({
                            ...prevState,
                            email: {
                                ...prevState.email,
                                isValid: false,
                                validationMessage: 'Email already exist',
                            }
                        }))
                    }
                })
                .catch(err => console.log(err))

        }, 800);
        setEmailTimeoutId(timeoutId);
    }, [stateInputs.email.value]);

    const rememberCheckboxHandler = () => {
        setRememberMe(prevState => {
            return !prevState
        })
    }

    const signUpHandler = (event) => {
        event.preventDefault();

        const newUser = {
            email: stateInputs.email.value,
            password: stateInputs.password.value
        };

        props.onSignUp(newUser, rememberMe);
    }

    const onInputHandler = (inputName, event) => {
        const newValue = event.target.value;
        const [currentValid, newValidationMessage] = validation(
            newValue,
            stateInputs[inputName].validationRules,
            stateInputs.email.value
        );

        checkEmailIsCorrect(inputName, currentValid);

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

    const checkEmailIsCorrect = (inputName, isValid) => {
        if (inputName === 'email') setEmailIsCorrect(isValid);
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
                    <TitleElement>Sign Up</TitleElement>

                    <Form>
                        {inputs}

                        <AlertMessage errorMessage={props.errorMessage} />

                        <RememberMe onChange={rememberCheckboxHandler} />
                        <SubmitButton
                            text={'Sign Up'}
                            disabled={!fieldsIsValid}
                            startAuth={props.authStart}
                            onClick={signUpHandler} />

                        <Link to="/sign-in" className={classes.redirectLink}>Already have an account? Sign in</Link>
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
        onSignUp: (newUser, rememberMe) => dispatch(signUpAction(newUser, rememberMe)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
