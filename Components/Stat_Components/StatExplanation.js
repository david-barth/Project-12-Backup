import React from 'react';
import '../../App.css';
import 'materialize-css/dist/css/materialize.min.css';

const StatExplanation = () => {
    return (
        <div className="col s12 m6">
              <div className="card blue darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Tweet Statistics:</span>
                  <p>
                   In this app, the neural network prediction works more accurately with at least 50 tweets.
                   If the Tweet Count is lower, the accuracy of the news prediction will suffer and it is recommended to increase the tweet data input by performing another search. 
                   This page tells you if another search is recommended by showing you the search criteria you submitted, the number of tweets currently stored, and the number of searches made previously.
                   A recommendation for data augmentation will be made if there are less than 50 tweets stored.  
                   If you wish to make this augmentation then click "Augment!" in order to perform another search.  
                   In this case, it is recommended to keep the Location and Search Radius the same, but to search for similar subjects (e.g. "President" instead of "Trump") and hashtags. 
                   If you wish to continue without performing another search, click "Recommend!"
                  </p>
                </div>
            </div>
        </div>
    )
}; 

export default StatExplanation; 