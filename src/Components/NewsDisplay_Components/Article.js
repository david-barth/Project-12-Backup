import React from 'react';
import {NavLink} from "react-router-dom";
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';
 


const Article = (props) => {
    return (
        <div className="row" id={props.id}>
            <div className="col s6 offset-s3">
                <div className="card medium">
                    <div className="card-image">
                    <img src="https://materializecss.com/images/sample-1.jpg" />
                    <span className="card-title">Recommendation 1: Environmental News</span>
                    </div>
                    <div className="card-content">
                    <p>
                        This is your most recommended news category based on the tweet search criteria you used. 
                        The news article is selected at random, within the category, from The Guardian.  
                        The link to the news article is given below for your viewing pleasure! 
                    </p>
                    </div>
                    <div className="card-action">
                    <NavLink exact to="https://www.theguardian.com/environment/2020/feb/15/extinction-rebellion-protest-at-gatwick-and-london-fashion-week">News Article</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}; 


export default Article; 