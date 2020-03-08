//Dependencies: 
const Vectorizer = require('./vectorizer').Vectorizer; 


//Main Class Declaration: 

class Refiner {
    constructor(corpus, cutOff) {
        this.corpus = corpus; 
        this.cutOff = cutOff;  
    }

    wordBundle(value, word) {
        this.bundle = {
            word: word, 
            value: value, 
        }
        this.getInfo = function () {
            return this.bundle.value; 
        }
    }    
    
    orderCorpus(corpus) {  
        // Get an array of the keys:
        let keys = Object.keys(corpus);
    
        // Then sort by using the keys to lookup the values in the original object:
        
        const sortedValues = keys.sort(function(a, b) { return corpus[b] - corpus[a] });
    
        //Completing the sorting via iteration: 
        let sorted = new Object(); 
        
        for (let word of sortedValues) {
            //Obtain value of corpus word and assign to sorted object: 
            const value = corpus[word]; 
            sorted[word] = value;  
        }
        
        return sorted; 
    }


    cutCorpus(ordered, cutOff, saveFunction) {
        //Segment into an array of singular key : value objects:
        let segmented = []
    
        for (let word in ordered) {
            let singular = {}; 
            singular[word] = ordered[word]; 
            segmented.push(singular); 
        }
    
    
        //Slice array off at a cutoff value: 
        let sliced = segmented.slice(0, cutOff); 
        
        //Reassemble to full object form, set property values to 0 and return:
        const fullSliced = {}; 
        sliced.forEach(object => {
            for (let word in object) {
                fullSliced[word] = 0; 
            };
        })
        
        return fullSliced; 
    }

    smallCharRemove(removalCount, object) {
        for (let word in object) {
            if (word.length <= removalCount) {
                delete object[word]; 
            }
        }
        return object; 
    } 
    

    refine() {
        //Implement sort on the corpus: 
        const ordered = this.orderCorpus(this.corpus);

        //Remove properties of less than 3 characters from corpus: 
        const removed = this.smallCharRemove(3, ordered); 
        
        //Truncate the corpus save to database: 
        return this.cutCorpus(removed, this.cutOff); 
    }; 
}

/*Main Points of this class: 
 1. Use to sort the order of the corpus word map found in the database. 
 2. Then use to truncate the word map to a desired length.  
 3. Finally save the segmented word map back to the database. 
 */

module.exports.Refiner = Refiner; 