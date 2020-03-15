//Dependencies: 
const express = require('express');
const router = express.Router();
const DataPrepEngine = require('../Tools/DataPrepEngine').DataPrepEngine; 
const tweet = require('../models/tweet');
const vector = require('../models/vector'); 



 
//Helper functions: 

const formatBody = (reqBody) => {
  let inputData = {
    mode: null,
    location: null,  
    radius: null, 
    subject: null, 
    hashtagOption1: null, 
    hashtagOption2: null, 
    hashtag1: null, 
    hashtag2: null 
    }; 
  let prepProp = 0; 

  for (let value in inputData) {
    let reqProp = prepProp.toString(); 
    if (reqBody[reqProp] !== '') {
      inputData[value] = reqBody[reqProp]; 
    }
    prepProp ++; 
  } 

  return inputData; 
}


const dbDelete = (model) => {
  model.deleteMany({location: 'Independent'}, (err) => {
    if (err) {
        console.log(err); 
    }
  })
}; 


//Testing: 


//Tweet Post Route: 
router.post('/tweetPost', async function(req, res, next) {
  //1. 
  const inputData = formatBody(req.body)
  const prepEngine = new DataPrepEngine(inputData);
  prepEngine.process(); 
}); 

/**
 * 1. Format request, with easily recognizable keys and use tweetGetter class to obtain tweets from the Twitter API. 
 */


module.exports = router;



//Notes on Async Functions and Await: 

  //Await keyword declarations will only stop the flow of programming (blocking esque behavior) on the level of abstraction/file that the keyword is in. 

  //If the level of abstraction is higher, than the await keyword will not stop the program flow on the higher level of abstraction. 

  //Thus, this requires the use of await on the higher level of abstraction in order to deal with the flow of programming on that level. 

  //This relation of keyword effect to level of abstraction can most likely be applied to other keywords. 