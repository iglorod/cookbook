import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import axios from '../../../utility/axios-instance';
import RecipeName from '../RecipeComponents/RecipeName/RecipeName';
import RecipeDescription from '../RecipeComponents/RecipeDescription/RecipeDescription';
import RecipeTimes from '../RecipeComponents/RecipeTimes/RecipeTimes';
import RecipeItemsList from '../RecipeComponents/RecipeItemsList/RecipeItemsList';
import RecipeFile from '../RecipeComponents/RecipeFile/RecipeFile';
import RecipeAuthor from '../RecipeComponents/RecipeAuthor/RecipeAuthor';
import RecipeButton from '../RecipeComponents/RecipeButton/RecipeButton';
import ModalSpinner from '../../UI/ModalSpinner/ModalSpinner';
import ColHOC from '../../UI/ColHOC/ColHOC';
import '../RecipeComponents/RecipeComponents.css';

const RecipeView = (props) => {
    const [recipe, setRecipe] = useState({
        _id: null,
        name: '',
        creatorId: null,
        description: '',
        prepTime: '',
        cookTime: '',
        totalTime: '',
        ingredients: [],
        instructions: [],
        image: null,
        date: null,
    })

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recipeId = props.location.state.recipeId;

        axios.get('/recipe/' + recipeId)
            .then(recipe => {
                setRecipe({
                    _id: recipe.data._id,
                    name: recipe.data.name,
                    creatorId: recipe.data.creatorId,
                    description: recipe.data.description,
                    prepTime: recipe.data.prepTime,
                    cookTime: recipe.data.cookTime,
                    totalTime: recipe.data.totalTime,
                    ingredients: [...recipe.data.ingredients],
                    instructions: [...recipe.data.instructions],
                    image: recipe.data.image,
                    date: recipe.data.date,
                })

                setLoading(false);
            })
    }, [])

    const forwardToEditing = () => {
        props.history.push({
            pathname: '/edit',
            state: {
                recipeId: recipe._id,
            }
        })
    }

    if (loading) return <ModalSpinner />;

    let forward = null;
    if (recipe.creatorId._id === props.userId) {
        forward = (
            <ColHOC>
                <RecipeButton
                    text={'Share New Recipe Version'}
                    onClick={forwardToEditing} />
            </ColHOC>
        )
    }

    return (
        <Container className={'recipeContainer'} fluid>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <Row className={'recipeArea'}>
                        <ColHOC>
                            <RecipeFile file={recipe.image} readOnly />
                        </ColHOC>

                        <ColHOC>
                            <RecipeName name={recipe.name} readOnly />
                            <RecipeAuthor
                                author={recipe.creatorId.email}
                                date={recipe.date} />
                        </ColHOC>

                        <ColHOC>
                            <RecipeDescription description={recipe.description} readOnly />
                        </ColHOC>

                        <ColHOC>
                            <RecipeTimes
                                prepTime={recipe.prepTime}
                                cookTime={recipe.cookTime}
                                totalTime={recipe.totalTime}
                                readOnly />
                        </ColHOC>

                        <ColHOC>
                            <RecipeItemsList
                                type={'ingredients'}
                                items={recipe.ingredients}
                                readOnly />
                        </ColHOC>

                        <ColHOC>
                            <RecipeItemsList
                                type={'instructions'}
                                items={recipe.instructions}
                                points
                                readOnly />
                        </ColHOC>

                        {forward}
                    </Row>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </Container >
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
    }
}

export default connect(mapStateToProps)(RecipeView);
