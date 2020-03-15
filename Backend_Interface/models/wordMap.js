//Dependencies: 
const mongoose = require('mongoose'); 

//Schema for Tweet Model: 

const Schema = mongoose.Schema;

const wordMapSchema = new Schema({
    wordMap: {}, 
    killSwitch: {
        type: String, 
        default: 'kill',
    },
    representation: {
        type: String,
    }
});

const wordMap = mongoose.model('Maps', wordMapSchema); 

module.exports = wordMap; 