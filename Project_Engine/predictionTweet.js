//Dependencies: 
const mongoose = require('mongoose'); 

//Schema for Tweet Model: 

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    text: {
        type: String,   
    }, 

    label: {
        type: String, 
    }, 

    location: {
        type: String,
        default: 'Unclassified',
    }, 
})


const tweet = mongoose.model('predictionTweet', tweetSchema); 

module.exports = predictionTweet; 