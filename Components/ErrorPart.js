import React from 'react';
import {NavLink} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';

const ErrorPart = (props) => {

    let searchCount = props.tweetSearch

    if (props.tweetCount === 0) {
        searchCount = 1; 
    }

    if (searchCount === 1) {
        return (
            <div className="container">
                 <p>Error Code {props.statusCode}: &ensp; {props.message}</p>
                 <div className="row">
                    <div className="col s6 offset-s3">
                        <NavLink to="/search" id="SearchFormError" onClick={props.componentChange} className="waves-effect waves-light btn">Redo initial search</NavLink>
                    </div>
                </div>
            </div>
        )
    } 

    else if (searchCount > 1) {
        return (
            <div className="container">
                 <p>Error Code {props.statusCode}: &ensp; {props.message}</p>
                 <div className="row">
                    <div className="col s6 offset-s3">
                        <NavLink to="/search" id="AugmentError" onClick={props.componentChange} className="waves-effect waves-light btn">Perform another augment search</NavLink>
                    </div>
                </div>
            </div>
        )
    }

    else {
        return (
        <div className="container">
            <p>Error Code 500: News retrieval failed.  Please click 'Start a new search!' to begin a new search</p>
        </div>
        )
    }
}

export default ErrorPart;


//Continuation: Attempt to integrate the getNews error handling implementation in this component. 