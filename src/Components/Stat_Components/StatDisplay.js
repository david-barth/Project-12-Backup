import React from 'react';
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';
 


const StatDisplay = () => {
    return (
        <div className="collection">
            <a href="#!" className="collection-item">Mode: </a>
            <a href="#!" className="collection-item">Location: </a>
            <a href="#!" className="collection-item">Search Radius: </a>
            <a href="#!" className="collection-item">Search Subject: </a>
            <a href="#!" className="collection-item">Hashtag 1: </a>
            <a href="#!" className="collection-item">Hashtag 2: </a>
            <a href="#!" className="collection-item active">Individual Tweet Count: </a>
            <a href="#!" className="collection-item active">Tweet Search Count: </a>
            <a href="#!" className="collection-item active">Data Augmentation: </a>
        </div>
    )
}

export default StatDisplay; 