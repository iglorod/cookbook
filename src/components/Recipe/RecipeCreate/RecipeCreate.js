import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import axios from '../../../utility/axios-instance';
import RecipeName from './RecipeName/RecipeName';
import RecipeDescription from './RecipeDescription/RecipeDescription';
import RecipeTimes from './RecipeTimes/RecipeTimes';
import RecipeItemsList from './RecipeItemsList/RecipeItemsList';
import RecipeFile from './RecipeFile/RecipeFile';
import AlertMessage from '../../UI/AlertMessage/AlertMessage';
import ColHOC from '../../UI/ColHOC/ColHOC';
import './RecipeCreate.css';

const RecipeCreate = (props) => {
    if (!props.userId) props.history.push('/sign-in');

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

        let recipeData = new FormData();

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
            .then(props.history.push(''))
            .catch(error => setErrorMessage('Something went wrong...'))
    }

    return (
        <Container className={'recipeCreateContainer'} fluid>
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
                            <div
                                className={'recipeButton'}
                                onClick={createRecipeHandler}
                            >Create Recipe</div>
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

const mapDispathToProps = () => {
    return {

    }
}

export default connect(mapStateToProps, mapDispathToProps)(RecipeCreate);
