import React from 'react';
import {NavLink} from "react-router-dom";
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';
 


const StatButtons = (props) => {
    return (
        <div className="row" onClick={props.componentChange}>
          <div className="col s1 offset-s4">
            <NavLink id="Augment" className="waves-effect waves-light btn-large" to="/search">Augment</NavLink>
          </div>
          <div className="col s1 offset-s1">
            <NavLink id="ReadNews" className="waves-effect waves-light btn-large" to="/display">Read your news</NavLink>
          </div>
        </div>
    )
}; 


export default StatButtons; 

