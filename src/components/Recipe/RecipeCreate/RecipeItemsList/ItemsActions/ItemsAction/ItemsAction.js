import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ItemsAction = (props) => {
    return (
        <div
            className={props.actionClass}
            onClick={props.onClick}
        >
            <FontAwesomeIcon icon={props.icon} />
            {props.text}
        </div>
    )
}

export default ItemsAction;
