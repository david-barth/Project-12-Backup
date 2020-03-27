import React from 'react';
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';
 


const StatDisplay = (props) => {
    return (
        <div className="collection">
            <a href="#!" className="collection-item active">Relevant Tweet Statistics...</a>
            <a href="#!" className="collection-item">Individual Tweet Count:     {props.stats.tweetCount} </a>
            <a href="#!" className="collection-item">Tweet Search Count:     {props.stats.tweetSearch} </a>
            <a href="#!" className="collection-item">Data Augmentation:     {props.stats.rec} </a>
        </div>
    )
}

export default StatDisplay; 