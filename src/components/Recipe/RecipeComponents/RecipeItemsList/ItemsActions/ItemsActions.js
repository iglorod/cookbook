import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import ItemsAction from './ItemsAction/ItemsAction';

const ItemsActions = (props) => {
    return (
        <ListGroup.Item>
            <div className={'manageItems'}>
                <ItemsAction
                    actionClass={'addItem'}
                    icon={faPlusCircle}
                    text={' Add one'}
                    onClick={props.onAdd} />

                <ItemsAction
                    actionClass={'removeItem'}
                    icon={faMinusCircle}
                    text={' Remove one'}
                    onClick={props.onRemove} />
            </div>
        </ListGroup.Item>
    )
}

export default ItemsActions;
