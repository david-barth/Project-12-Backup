import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

const ErrorPart = (props) => {

  
    return (
        <p>Error Code {props.statusCode}: {props.message}</p>
    )
}

export default ErrorPart; 