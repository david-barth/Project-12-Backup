//Tool Dependencies: 
const Twit = require('twit');
const mongoose = require('mongoose');
const Vectorizer = require('./vectorizer').Vectorizer; 
const Refiner = require('./truncation').Refiner; 


//Instantiations: 
const cleaner = new Vectorizer(null); 
const T = new Twit({
    consumer_key:         '3xy04LnYOaKpODIYsF2fpLABq',
    consumer_secret:      '7eu2FqgGuE1EtlgwjTro205Jg3xEpQJ8iMiVO6mxxIoSFUpWs8',
    access_token:         '1212427908901294080-aSPrQh72AQUSLV6ZfpKc4XKdWY2sBz',
    access_token_secret:  'HDOJ825sllT2g3f5lTCNWWfu4iahmCQLGd2CVe249oyS2',
}); 


//Setting up Mongoose Connection:

/*
mongoose.connect('mongodb://localhost/appDB'); 

const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection successful');
});*/


//Data Engine Class Set Up: 


class dataEngine {
  constructor(urlInputs) {
    this.searchParams = this.constructURL(urlInputs);
  }

  constructURL(inputInfo) {
    let searchObject = {}; 

    //Run check for null values and remove them: 
    for (let prop in inputInfo) {
      if (inputInfo[prop] === null) {
        delete inputInfo[prop]; 
      }
    }

    //Verify the selected search/filtering modes and conditionally add search parameters to searchObject:   
    const propValues = Object.values(inputInfo);

    if (propValues.includes("Yes, let's do it!")) {
      searchObject.q = `${inputInfo.subject}, #${inputInfo.hashtag1}, #${inputInfo.hashtag2}`; 
    } else {
      searchObject.q = inputInfo.subject; 
    }

    if (propValues.includes('geographical')) {
      //Perform geolocation search and obtain coordinates (Append to searchObject): 
      console.log('geoSearch'); 
    }

    //Add the required search parameters to searchObject: 
    searchObject.lang = 'en'; 
    searchObject.count = 100;

    return searchObject;  
  }

}


module.exports.dataEngine = dataEngine; 



//Misc Notes about MongoDB: 

    //In order for a database to show up in the db list in mongoDB, a document must first be inserted into it. 

    //The method for copying databases: 

        //1. mongodump -d some_database -c some_collection (-d flag specifies the db to be targeted, -c specifies the collection in the db)

        //2. mongorestore -d some_other_db -c some_or_other_collection dump/some_collection.bson (Same termininology here, except the file pathh to the collection bson file must be targetted)

        //Important note: These are commandline operations in the OS environment, not the mongoshell environment. 