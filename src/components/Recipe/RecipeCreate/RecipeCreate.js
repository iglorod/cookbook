import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import axios from '../../../utility/axios-instance';
import RecipeName from '../RecipeComponents/RecipeName/RecipeName';
import RecipeDescription from '../RecipeComponents/RecipeDescription/RecipeDescription';
import RecipeTimes from '../RecipeComponents/RecipeTimes/RecipeTimes';
import RecipeItemsList from '../RecipeComponents/RecipeItemsList/RecipeItemsList';
import RecipeFile from '../RecipeComponents/RecipeFile/RecipeFile';
import AlertMessage from '../../UI/AlertMessage/AlertMessage';
import RecipeButton from '../RecipeComponents/RecipeButton/RecipeButton';
import ColHOC from '../../UI/ColHOC/ColHOC';
import '../RecipeComponents/RecipeComponents.css';

const RecipeCreate = (props) => {
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        prepTime: '',
        cookTime: '',
        totalTime: '',
        ingredients: [],
        instructions: [],
        image: null,
    })

    const [errorMessage, setErrorMessage] = useState(null);
    const [savingRecipe, setSavingRecipe] = useState(false);

    if (!props.userId) {
        props.history.push('/sign-in');
        return null;
    }

    const onTextChangeHandler = (item, event) => {
        const newValue = event.target.value;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            [item]: newValue,
        }))
    }

    const onImageChangeHandler = (image) => {
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            image,
        }))
    }

    const onAddItemHandler = (item) => {
        setRecipe(prevRecipe => {
            const newItems = [...prevRecipe[item]];
            newItems.push('');

            return {
                ...prevRecipe,
                [item]: [...newItems]
            }
        })
    }

    const onRemoveItemHandler = (item) => {
        setRecipe(prevRecipe => {
            const newItems = [...prevRecipe[item]];
            newItems.pop();

            return {
                ...prevRecipe,
                [item]: [...newItems]
            }
        })
    }

    const onChangeItemHandler = (index, item, event) => {
        const newItemValue = event.target.value;
        setRecipe(prevRecipe => {
            const newItems = [...prevRecipe[item]];
            newItems[index] = newItemValue;

            return {
                ...prevRecipe,
                [item]: [...newItems],
            }
        })
    }

    const createRecipeHandler = () => {
        setSavingRecipe(true);

        let recipeData = new FormData();

        const date = Math.floor((new Date().getTime() / 1000));

        recipeData.append('date', date);
        recipeData.append('name', recipe.name);
        recipeData.append('creatorId', props.userId);
        recipeData.append('description', recipe.description);
        recipeData.append('prepTime', recipe.prepTime);
        recipeData.append('cookTime', recipe.cookTime);
        recipeData.append('totalTime', recipe.totalTime);
        recipeData.append('ingredients', recipe.ingredients);
        recipeData.append('instructions', recipe.instructions);
        recipeData.append('image', recipe.image, recipe.image.name);

        axios.post('/recipe', recipeData)
            .then((recipe) => {
                props.history.push({
                    pathname: '/view',
                    state: {
                        recipeId: recipe.data._id,
                    }
                })
            })
            .catch(error => {
                setSavingRecipe(false);
                setErrorMessage('Something went wrong...')
            })
    }

    return (
        <Container className={'recipeContainer'} fluid>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <Row className={'recipeArea'}>
                        <ColHOC>
                            <h2 className={'recipeCRU'}>Create Recipe</h2>
                        </ColHOC>

                        <ColHOC>
                            <RecipeFile
                                file={recipe.image}
                                onChange={onImageChangeHandler} />
                        </ColHOC>

                        <ColHOC>
                            <RecipeName
                                name={recipe.name}
                                onChange={onTextChangeHandler} />
                        </ColHOC>

                        <ColHOC>
                            <RecipeDescription
                                description={recipe.description}
                                onChange={onTextChangeHandler} />
                        </ColHOC>

                        <ColHOC>
                            <RecipeTimes
                                prepTime={recipe.prepTime}
                                cookTime={recipe.cookTime}
                                totalTime={recipe.totalTime}
                                onChange={onTextChangeHandler} />
                        </ColHOC>

                        <ColHOC>
                            <RecipeItemsList
                                type={'ingredients'}
                                items={recipe.ingredients}
                                onAdd={onAddItemHandler}
                                onRemove={onRemoveItemHandler}
                                onChange={onChangeItemHandler} />
                        </ColHOC>

                        <ColHOC>
                            <RecipeItemsList
                                type={'instructions'}
                                items={recipe.instructions}
                                points
                                onAdd={onAddItemHandler}
                                onRemove={onRemoveItemHandler}
                                onChange={onChangeItemHandler} />
                        </ColHOC>

                        <ColHOC>
                            <AlertMessage errorMessage={errorMessage} />
                        </ColHOC>

                        <ColHOC>
                            <RecipeButton
                                text={'Create Recipe'}
                                loading={savingRecipe}
                                onClick={createRecipeHandler} />
                        </ColHOC>
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

export default connect(mapStateToProps)(RecipeCreate);
