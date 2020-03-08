//Dependencies: 
const express = require('express');
const router = express.Router();
const DataEngine = require('../Tools/data_engine').dataEngine; 


//Relevant Variables: 
const dummy = {
    mode: 'geographical', 
    location: 'New York', 
    radius: 4000, 
    subject: 'Donald Trump', 
    hashtagOption1: "Yes, let's do it!",
    hashtagOption2: null,  
    hashtag1: 'ivanka', 
    hashtag2: 'president'
} //Noted that actual form submission object will have 8 properties, with at least 1 null and 7 properly filled.  The null will have to be removed.  


//Class Declarations: 
const engine = new DataEngine(dummy); 


console.log(engine.searchParams); 



//Tweet Post Route: 
router.post('/tweetPost', function(req, res, next) {
  console.log(req.body); 
});




module.exports = router;