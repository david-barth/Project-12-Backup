const cleaner = require('./cleaner').Cleaner; 
const tweet = require('../models/tweet');
const wordMap = require('../models/wordMap');
const vector = require('../models/vector'); 


//Preprocessor Setup: 

class Preprocessor {
    constructor() {
        this.cleaner = new cleaner(null); 
    }


    async cleanAndVectorize(tweets) {
        let container = []

        //Load and Clean Tweets: 
        this.cleaner.switchList(tweets)
        const cleanedTweets = await this.cleaner.clean();

        //Aggregate tweets and convert to input vector: 
        const tweetDoc = cleanedTweets.reduce((current, combined) => combined.concat(current));
        container.push(tweetDoc);  
        const vector = await this.vectorize(container); 

        //Store Vectors in DB Collection: 
        this.storeVector(vector); 
    }
    

    /*async accessDatasets() { 
        //Initialize arrays:
        let tweetBatches = [];  
        let features = []; 
        let labels = []; 
    
        //Read information from tweets database: 
        const tweetQuery = await tweet.find({label: 'Prediction'}); 
        tweetBatches.push(tweetQuery); 

    
        //Data Decomposition to document blobs: 
        tweetBatches.forEach((batch, i) => {
            let textBlobFeature = [];  
            for (let object of batch) { 
                labels.push(object.label);
                textBlobFeature.push(object.text); 
            }
            features.push(textBlobFeature);
        })
    
        return {features: features} 
    }*/

    
    async vectorize (docArray) {
        //Array container initializations: 
        let docWordCollection = docArray; 
        let docVectors = [];  
    
        //Iterate over document collection to create docVectors array: 
        for (let document of docWordCollection) {
            //Reinitialize word map with a new call to the cut corpus: 
            let dbCall = await wordMap.find({representation: "cut corpus"});
            let docMap = dbCall[0].wordMap; 
    
            //Create dictionary and iterate through each document blob: 
            let dictionary = Object.keys(docMap);
            document.forEach(word =>{
                //Increment the word frequency if a match is found: 
                if (dictionary.includes(word)) {
                    docMap[word] ++; 
                } 
            });
            //Push the document word map to the appropriate vector array: 
            docVectors.push(Object.values(docMap));  
        }
        
        return docVectors; 
    }

    async storeVector(input) {
        //Iterate over inputs
        for (let i in input) {
              //Instantiate Model:  
              const newVector = new vector({
                vector: input[i], 
                label: 'Prediction'
            }); 
    
            //Save Vector:
            await this.saveToDB(newVector, 'Vector'); 
        }
    }


    saveToDB(model, saveType) {
        model.save((err, result) => {
            if (err) {
                console.log(err); 
            }
            else {
                console.log(`${saveType} Saved to Database`); 
            }
        });
    }
}



module.exports.Preprocessor = Preprocessor; 