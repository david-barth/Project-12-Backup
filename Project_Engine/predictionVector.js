//Dependencies: 
const mongoose = require('mongoose'); 

//Schema for Tweet Model: 

const Schema = mongoose.Schema;

const inputVectorSchema = new Schema ({
    vector: [Number], 
    label: String, 
    killSwitch: {
        type: String, 
        default: 'kill', 
    },
    classification: String,
})

const predictionVector = mongoose.model('predictionVector', inputVectorSchema); 

module.exports = predictionVector; 