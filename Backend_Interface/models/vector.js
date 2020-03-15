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
    //classification: 'unclassified',
})

const Vector = mongoose.model('vector', inputVectorSchema); 

module.exports = Vector; 