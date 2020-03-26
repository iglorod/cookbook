import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import axios from '../../../utility/axios-instance';
import RecipeName from '../RecipeComponents/RecipeName/RecipeName';
import RecipeDescription from '../RecipeComponents/RecipeDescription/RecipeDescription';
import RecipeTimes from '../RecipeComponents/RecipeTimes/RecipeTimes';
import RecipeItemsList from '../RecipeComponents/RecipeItemsList/RecipeItemsList';
import RecipeFile from '../RecipeComponents/RecipeFile/RecipeFile';
import AlertMessage from '../../UI/AlertMessage/AlertMessage';
import RecipeButton from '../RecipeComponents/RecipeButton/RecipeButton';
import RecipeAuthor from '../RecipeComponents/RecipeAuthor/RecipeAuthor';
import { isUrl } from '../../../utility/is-url';
import ModalSpinner from '../../UI/ModalSpinner/ModalSpinner';
import ColHOC from '../../UI/ColHOC/ColHOC';
import '../RecipeComponents/RecipeComponents.css';

const RecipeEdit = (props) => {
    const [recipe, setRecipe] = useState({
        _id: null,
        name: '',
        creatorId: null,
        description: '',
        prepTime: '',
        cookTime: '',
        totalTime: '',
        next: null,
        prev: null,
        ingredients: [],
        instructions: [],
        image: '',
        date: null,
    })

    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [savingRecipe, setSavingRecipe] = useState(false);

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
                    next: recipe.data.next,
                    prev: recipe.data.prev,
                    ingredients: [...recipe.data.ingredients],
                    instructions: [...recipe.data.instructions],
                    image: recipe.data.image,
                    date: recipe.data.date,
                })

                setLoading(false);
            })
    }, [])

    if (!props.userId) return <Redirect to={'/sign-in'} />


    if (loading || props.userId !== recipe.creatorId._id) return <ModalSpinner />;

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

    const validateRecipe = () => {
        let isValid = true;

        for (let key in recipe) {
            if (key === 'image' || key === 'prev' || key === 'next' || key === 'creatorId') continue;
            else if (key === 'ingredients' || key === 'instructions') {
                const arr = clearArray(recipe[key]);
                isValid = arr.length > 0 && isValid;
            } else {
                isValid = recipe[key].length > 0 && isValid;
            }
        }

        return isValid;
    }

    const clearArray = (arr) => {
        return arr.filter(item => item.trim().length > 0);
    }

    const divideArray = (arr, divider) => {
        const newArr = clearArray(arr);
        return newArr.map((item, index) => (index + 1) !== newArr.length ? item + divider : item);
    }

    const formRecipe = () => {
        let recipeData = new FormData();

        const date = Math.floor((new Date().getTime() / 1000));
        const divider = '$$divider$$';

        recipeData.append('prevRecipeId', recipe._id);
        recipeData.append('date', date);
        recipeData.append('name', recipe.name);
        recipeData.append('creatorId', props.userId);
        recipeData.append('description', recipe.description);
        recipeData.append('prepTime', recipe.prepTime);
        recipeData.append('cookTime', recipe.cookTime);
        recipeData.append('totalTime', recipe.totalTime);
        recipeData.append('ingredients', divideArray(recipe.ingredients, divider));
        recipeData.append('instructions', divideArray(recipe.instructions, divider));
        recipeData.append('divider', divider);

        isUrl(recipe.image)
            ? recipeData.append('image', recipe.image)
            : recipeData.append('image', recipe.image, recipe.image.name);

        return recipeData;
    }

    const updateRecipeHandler = () => {
        if (!validateRecipe()) {
            setErrorMessage('Please fill all fields');
            return;
        }

        setSavingRecipe(true);
        setErrorMessage(null);

        const recipeData = formRecipe();

        axios.patch('/recipe', recipeData)
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
                            <h2 className={'recipeCRU'}>Edit Recipe</h2>
                        </ColHOC>

                        <ColHOC>
                            <RecipeFile
                                file={recipe.image}
                                onChange={onImageChangeHandler} />
                        </ColHOC>

                        <ColHOC>
                            <RecipeAuthor
                                author={recipe.creatorId.email}
                                date={recipe.date}
                                recipeId={recipe._id}
                                versions={recipe.next || recipe.prev} />
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
                                text={'Update Recipe'}
                                loading={savingRecipe}
                                onClick={updateRecipeHandler} />
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

export default connect(mapStateToProps)(RecipeEdit);
