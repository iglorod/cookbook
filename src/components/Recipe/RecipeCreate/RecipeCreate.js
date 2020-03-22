import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import RecipeName from './RecipeName/RecipeName';
import RecipeDescription from './RecipeDescription/RecipeDescription';
import RecipeTimes from './RecipeTimes/RecipeTimes';
import RecipeItemsList from './RecipeItemsList/RecipeItemsList';
import RecipeFile from './RecipeFile/RecipeFile';
import ColHOC from '../../utility/ColHOC/ColHOC';
import './RecipeCreate.css';

const RecipeCreate = () => {
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        prepTime: '',
        cookTime: '',
        totalTime: '',
        category: null,
        cuisine: null,
        ingredients: [],
        instructions: [],
        file: null,
    })

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
            file: image,
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
                                file={recipe.file}
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
                            <div className={'recipeButton'}>Create Recipe</div>
                        </ColHOC>
                    </Row>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </Container >
    )
}

export default RecipeCreate;
