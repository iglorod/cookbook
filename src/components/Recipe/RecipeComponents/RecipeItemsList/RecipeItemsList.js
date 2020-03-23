import React from 'react';
import { ListGroup } from 'react-bootstrap';

import ItemsActions from './ItemsActions/ItemsActions';
import RecipeItem from './RecipeItem/RecipeItem';

const RecipeItemsList = (props) => {
    const title = props.type.split('').shift().toUpperCase() + props.type.slice(1);

    let itemActions = null;
    if (!props.readOnly) {
        itemActions = (
            <ItemsActions
                onAdd={props.onAdd.bind(this, props.type)}
                onRemove={props.onRemove.bind(this, props.type)} />
        )
    }

    return (
        <div className={'recipeChunk'}>
            <h4>{title}</h4>
            <ListGroup>
                {itemActions}
                {
                    props.items.map((item, index) => {
                        return (
                            <RecipeItem
                                key={index}
                                name={item}
                                number={props.points ? (index + 1) : null}
                                type={props.type}
                                readOnly={props.readOnly}
                                onChange={props.readOnly ? null : props.onChange.bind(this, index, props.type)} />
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default RecipeItemsList;
