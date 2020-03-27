import React from 'react';
import {NavLink} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';


const Nav = (props) => {
    return (
        <nav>
            <div className="nav-wrapper" onClick={props.componentChange}>
                <NavLink to="/intro" id="Home" className="brand-logo">Tweet News Recommender</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink id="Intro" to="/intro">About this app...</NavLink></li>
                    <li><NavLink id="SearchForm" to="/search">Detail your tweet selection!</NavLink></li>
                    <li><NavLink id="Stat" to="/stats">Tweet Statistics</NavLink></li>
                    <li><NavLink id="NewsDisplay" to="/display">Read your news</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}


export default Nav; 