import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const RecipeItem = (props) => {
    return (
        <ListGroup.Item className={'list-item'}>
            <Badge pill variant="info">{props.number}</Badge>
            <input
                className="form-control"
                value={props.name}
                onChange={props.onChange}
                placeholder={`Type ${props.type.slice(0, -1)} here`}
                readOnly={props.readOnly}
            ></input>
        </ListGroup.Item>
    )
}

export default RecipeItem;
