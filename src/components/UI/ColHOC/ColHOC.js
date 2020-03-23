import React from 'react';
import { Col } from 'react-bootstrap';

const ColHOC = (props) => {
    return (
        <>
            <Col sm={1} md={2}></Col>
            <Col sm={10} md={8}>
                {props.children}
            </Col>
            <Col sm={1} md={2}></Col>
        </>
    )
}

export default ColHOC;
