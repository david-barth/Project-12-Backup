//Tool Dependencies: 
const Twit = require('../../node_modules/twit-promise');
const mongoose = require('mongoose');
const DataProcessor = require('./dataPreprocesser').Preprocessor; 


//Instantiations: 
const T = new Twit({
    consumer_key:         '3xy04LnYOaKpODIYsF2fpLABq',
    consumer_secret:      '7eu2FqgGuE1EtlgwjTro205Jg3xEpQJ8iMiVO6mxxIoSFUpWs8',
    access_token:         '1212427908901294080-aSPrQh72AQUSLV6ZfpKc4XKdWY2sBz',
    access_token_secret:  'HDOJ825sllT2g3f5lTCNWWfu4iahmCQLGd2CVe249oyS2',
}); 


//Setting up Mongoose Connection:


mongoose.connect('mongodb://localhost/appDB'); 

const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection successful');
});


//Data Engine Class Set Up: 


class DataPrepEngine {
  constructor(urlInputs) {
    this.searchParams = this.constructURL(urlInputs);
    this.Preprocessor = new DataProcessor(); 
  }

  async constructURL(inputInfo) {
    let searchObject = {}; 

    //Run check for null values and remove them: 
    for (let prop in inputInfo) {
      if (inputInfo[prop] === null) {
        delete inputInfo[prop]; 
      }
    }

    //Verify the selected search/filtering modes and conditionally add search parameters to searchObject:   
    const propValues = Object.values(inputInfo);

    if (inputInfo.hashtagOption1 === true) { 
      if (inputInfo.hashtag1 && inputInfo.hashtag2) {
        //Account for possibility of varying combinations of filled hashtags inputs: 
        searchObject.q = `${inputInfo.subject} #${inputInfo.hashtag1} #${inputInfo.hashtag2}`; 
      } else {
        searchObject.q = `${inputInfo.subject} #${inputInfo.hashtag1 || inputInfo.hashtag2}`
      }      
    } 
    else if (inputInfo.hashtagOption2 === true) {
      searchObject.q = inputInfo.subject; 
    }

    //Add the required search parameters to searchObject: 
    searchObject.lang = 'en'; 
    searchObject.count = 100;

    if (propValues.includes('geographical')) {
      //Perform geolocation search and obtain coordinates (Append to searchObject): 
      const geoCode = await this.getCoordinates(inputInfo.location, {}); 
      searchObject.geocode = geoCode.lat.toString() + ',' + geoCode.long.toString() + ',' + inputInfo.radius + 'km'; 
    }
    return searchObject;  
  }

  repeatCheck (text, array) {
    let repeat = false;
  
    //Iterate through array of tweets: 
    for (let tweet of array) {
      let tArray1, tArray2; 
      [tArray1, tArray2] = [tweet.text.split(' '), text.split(' ')]; 
  
      //Run iterative comparison of text elements in tweet text and input text if lengths of both match: 
      if (tArray1.length === tArray2.length) {
        let matchCount, x;
        [matchCount, x] = [0, 0];
        while (x < tArray1.length) {
          if (tArray1[x] === tArray2[x]) {
            //Add 1 for each matching array element in both text arrays: 
            matchCount ++  
          }
          x++ 
        }
        if (tArray1.length === matchCount) {
          //Break loop and return positive match if all array elements match: 
          return repeat = true
        }
      }
    }
    return repeat; 
  }


  getCoordinates(location, coordinates) {
    return new Promise((resolve, reject) => {
          T.get('geo/search', {query: location, max_results: 1}, (err, data) => {
           if (err) {
               reject(err);
           } else {
              coordinates.lat = data.result.places[0].centroid[1]; 
              coordinates.long = data.result.places[0].centroid[0]; 
              resolve(coordinates);
           }
        });
     });
  }


  async process() {
    const parameters = await this.searchParams;  

    T.get('search/tweets', parameters, (err, data) => {   
        //Iterate through the twitter response: 
        const dataResponse = data.statuses;
        let tweets = []; 

        for (let i = 0; i < dataResponse.length; i++) {
            //Extract twitter response information to appropriate variables: 
            let currentTweets, repeatSignal; 
            const tweetText = data.statuses[i].text;

             //Check for repeat Tweets: 
            if (i > 0) {
                currentTweets = dataResponse.slice(0, i); 
                repeatSignal = this.repeatCheck(tweetText, currentTweets);  
            }
           

            if (repeatSignal) {
                //Prevent Tweet Placement into DB: 
                console.log('repeat');    
            } else {
                //Push tweets to proper constructor property: 
                tweets.push(tweetText)
            }
        }
      this.Preprocessor.cleanAndVectorize(tweets);
    })
  }
    
}


module.exports.DataPrepEngine = DataPrepEngine; 


//Misc Notes about MongoDB: 

    //In order for a database to show up in the db list in mongoDB, a document must first be inserted into it. 

    //The method for copying databases: 

        //1. mongodump -d some_database -c some_collection (-d flag specifies the db to be targeted, -c specifies the collection in the db)

        //2. mongorestore -d some_other_db -c some_or_other_collection dump/some_collection.bson (Same termininology here, except the file pathh to the collection bson file must be targetted)

        //Important note: These are commandline operations in the OS environment, not the mongoshell environment. 



//Misc Notes on Twit: 

    //Since there is a separate version of twit that only occurs with promise usage, it is assumed that the anomalous behavior observed at present is due to Twit not working well with async/await formatted functions. 

    //Resolution: Simply use a return with a promise instance, within a function, rather than using the await/async format for this particular case. 


//Planning for Tweet gathering function and blocking behavior: 

  //Tentative Solution: Bring the dataProcessor class into this class and then have the cleaning and vectorizing be done within the promise. 

    //Referencing this.tweets as a constructor property appears to break the scope of the then() chain and refers to the complete collection of tweets, after the iteration is done. 

//Misc Notes: 

  //(Something) is evaluated to true if it is defined.  This is applied in the case of logical comparison and true/false conditional operations within if statements. 


