import React from 'react';

const AlertMessage = (props) => {
    return (
        props.errorMessage !== null
            ? <div className="alert alert-danger" role="alert">{props.errorMessage}</div>
            : null
    )
}

export default AlertMessage;
