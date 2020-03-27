import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';


const LoadingBar = () => {
    return (
        <div id="Loading" className="progress">
            <div className="indeterminate"></div>
            <header>Loading...</header>
        </div>
    )
}

export default LoadingBar; 