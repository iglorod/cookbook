import React from 'react'
import { Pagination } from 'react-bootstrap';

import classes from './Pagination.module.css';

const PaginationComp = (props) => {
    let items = [];
    for (let number = 1; number <= Math.ceil(props.recipesCount / props.step); number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === props.activePage}
                onClick={props.onClick.bind(this, number)}>
                {number}
            </Pagination.Item>,
        );
    }

    if (items.length < 2) return null;

    return (
        <Pagination size="sm" className={classes.paginationContainer}>
            {items}
        </Pagination>
    )
}

export default PaginationComp;
