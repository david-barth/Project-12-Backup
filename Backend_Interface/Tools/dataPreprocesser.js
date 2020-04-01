const cleaner = require('./cleaner').Cleaner; 
const wordMap = require('../models/wordMap');
const vector = require('../models/vector'); 


//Preprocessor Setup: 

class Preprocessor {
    constructor() {
        this.cleaner = new cleaner(null); 
    }


    async cleanAndVectorize(tweets, signal) {

        try {
            let container = []

            //Load and Clean Tweets: 
            this.cleaner.switchList(tweets)
            const cleanedTweets = await this.cleaner.clean();

            //Aggregate tweets and convert to input vector: 
            const tweetDoc = cleanedTweets.reduce((current, combined) => combined.concat(current));
            container.push(tweetDoc);  
            let vector = await this.vectorize(container); 

            //Update input vector if necessary: 
            if (signal === 'augment') {
                const combined = await this.augment(vector);
                vector = [combined]; 
            }

            //Store Vectors in DB Collection: 
            this.storeVector(vector); 
            return 'done';     

        } catch (error) {
            error.status = 500;
            error.message = 'Something went wrong.  Please do another search using a different search term';   
            return error;   
        }        
    }
    
    
    async augment(vec) {
        let combinedVec = []; 

        //Find initial vector in db and isolate: 
        const initialEntry = await vector.find({label: "Prediction"}); 
        const initialVec = initialEntry[0].vector; 
        

        //Loop through vectors and add elements to each other: 
        for (let i in vec[0]) {
            let combinedEl = vec[0][i] + initialVec[i];
            combinedVec.push(combinedEl); 
        }

        //Delete initial input vector from the db collection and return combined input array: 
        await this.dbDelete(); 
        return combinedVec;
    }

    //continuation: Investigate the mechanism of adding the two arrays together and then complete the augment backend functionality


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

    dbDelete = () => {
        vector.deleteMany({label: 'Prediction'}, (err) => {
          if (err) {
              console.log(err); 
          } else {
              console.log('Deleted'); 
          }
        })
      }; 
}



module.exports.Preprocessor = Preprocessor; 